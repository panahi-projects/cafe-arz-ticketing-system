"use client";

import { menuItems } from "@/configs";
import { ChevronLeft, ChevronRight } from "@/lib/icons";
import {
  Box,
  Collapse,
  Grow,
  IconButton,
  List,
  Paper,
  Popper,
  Typography,
} from "@mui/material";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ChildMenuItem from "./sidebar/ChildMenuItem";
import ParentMenuItem from "./sidebar/ParentMenuItem";
import { sidebarStyles } from "./sidebar/SidebarStyles";
import { MenuItem } from "@/types";
import Logo from "./Logo";

const Sidebar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentSubmenu, setCurrentSubmenu] = useState<string | null>(null);
  const parentRefs = useRef<Record<string, HTMLElement | null>>({});
  const popperRef = useRef<HTMLDivElement>(null);

  const handleToggle = (key: string, event: React.MouseEvent<HTMLElement>) => {
    if (!isExpanded) {
      // Toggle behavior - close if clicking the same menu
      if (currentSubmenu === key) {
        setAnchorEl(null);
        setCurrentSubmenu(null);
      } else {
        setAnchorEl(event.currentTarget);
        setCurrentSubmenu(key);
      }
    }
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCloseSubmenu = () => {
    setAnchorEl(null);
    setCurrentSubmenu(null);
  };

  const isActive = (item: MenuItem) => {
    if (item.path === pathname) return true;
    if (item.children) {
      return item.children.some((child) => child.path === pathname);
    }
    return false;
  };

  // Close submenu when path changes
  useEffect(() => {
    handleCloseSubmenu();
  }, [pathname]);

  // Close submenu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popperRef.current &&
        !popperRef.current.contains(event.target as Node) &&
        anchorEl &&
        !anchorEl.contains(event.target as Node)
      ) {
        handleCloseSubmenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [anchorEl]);

  // Automatically expand parent if a child is active
  useEffect(() => {
    const initiallyOpen: Record<string, boolean> = {};

    menuItems.forEach((item) => {
      if (item.children?.some((child) => child.path === pathname)) {
        initiallyOpen[item.key] = true;
      }
    });

    setOpen(initiallyOpen);
  }, [pathname]);

  useEffect(() => {
    const isSidebarExpanded = localStorage.getItem("sidebar-expanded");
    setIsExpanded(isSidebarExpanded == "true" ? true : false);
  }, []);

  return (
    <Box sx={{ position: "relative" }}>
      {/* Toggle button */}
      <Box sx={{ position: "absolute", top: 8, left: -16, zIndex: 10 }}>
        <IconButton
          onClick={() => {
            setIsExpanded((prev) => !prev);
            localStorage.setItem(
              "sidebar-expanded",
              JSON.stringify(!isExpanded)
            );
            handleCloseSubmenu();
          }}
          sx={{
            color: "text.dark",
            bgcolor: "white",
            "&:hover": {
              bgcolor: "gray",
            },
            boxShadow: 2,
          }}
        >
          {isExpanded ? <ChevronRight /> : <ChevronLeft />}
        </IconButton>
      </Box>
      <Box
        sx={{
          ...sidebarStyles.root(isExpanded),
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Logo */}
        <Box sx={{ p: 2, position: "relative", flexShrink: 0, pr: 3 }}>
          <Logo isExpanded={isExpanded} />
        </Box>

        {/* Scrollable menu container */}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            overflowX: "hidden",
            "&::-webkit-scrollbar": {
              width: "6px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(255,255,255,0.3)",
              borderRadius: "3px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "transparent",
            },
          }}
        >
          <List sx={sidebarStyles.list(isExpanded)}>
            {menuItems.map((item: MenuItem) => {
              const active = isActive(item);
              const hasChildren = !!item.children;

              return (
                <Box
                  key={item.key}
                  ref={(el: HTMLDivElement | null) => {
                    parentRefs.current[item.key] = el;
                  }}
                  sx={{
                    position: "relative",
                  }}
                >
                  <ParentMenuItem
                    item={item}
                    active={active}
                    onClick={(e: React.MouseEvent<HTMLElement>) =>
                      handleToggle(item.key, e)
                    }
                    hasChildren={hasChildren}
                    isOpen={open[item.key]}
                    isExpanded={isExpanded}
                  />

                  {/* Expanded mode submenu */}
                  {hasChildren && isExpanded && (
                    <Collapse
                      in={open[item.key]}
                      timeout={300}
                      unmountOnExit
                      onExited={() => handleCloseSubmenu()}
                    >
                      <Box
                        sx={{
                          position: "relative",
                          ml: 0,
                          mr: 1,
                          pr: 0,
                          "&::before": {
                            content: '""',
                            position: "absolute",
                            top: -10,
                            bottom: "calc(0% + 25px)",
                            right: "20px",
                            width: "2px",
                            bgcolor: "text.secondary",
                          },
                        }}
                      >
                        <List
                          component="div"
                          disablePadding
                          sx={{
                            position: "relative",
                            width: "100%",
                          }}
                        >
                          {item.children &&
                            item.children.map((sub: MenuItem) => (
                              <ChildMenuItem
                                key={sub.key}
                                item={sub}
                                active={sub.path === pathname}
                                isExpanded={isExpanded}
                              />
                            ))}
                        </List>
                      </Box>
                    </Collapse>
                  )}
                </Box>
              );
            })}
          </List>
        </Box>

        {/* Floating submenu (collapsed mode) */}
        <Popper
          open={!isExpanded && Boolean(anchorEl) && Boolean(currentSubmenu)}
          anchorEl={anchorEl}
          placement="right-start"
          sx={{ zIndex: 9999 }}
          modifiers={[
            {
              name: "offset",
              options: {
                offset: [0, 0],
              },
            },
          ]}
          transition
        >
          {({ TransitionProps }) => (
            <Grow {...TransitionProps} timeout={250}>
              <Paper
                ref={popperRef}
                elevation={3}
                sx={{
                  ml: 1,
                  borderRadius: "8px",
                  overflow: "hidden",
                  transformOrigin: "left top",
                  bgcolor: "background.sidebar",
                  color: "text.secondary",
                }}
              >
                {currentSubmenu && (
                  <List sx={{ width: "200px", p: 0 }}>
                    {menuItems
                      .find((item) => item.key === currentSubmenu)
                      ?.children?.map((sub: MenuItem) => (
                        <ChildMenuItem
                          key={sub.key}
                          item={sub}
                          active={sub.path === pathname}
                          isExpanded={false}
                        />
                      ))}
                  </List>
                )}
              </Paper>
            </Grow>
          )}
        </Popper>
      </Box>
    </Box>
  );
};

export default Sidebar;
