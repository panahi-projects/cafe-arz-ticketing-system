"use client";

import { menuItems } from "@/configs";
import { MenuItem } from "@/configs/menu-items";
import { Box, Collapse, IconButton, List, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ChildMenuItem from "./sidebar/ChildMenuItem";
import ParentMenuItem from "./sidebar/ParentMenuItem";
import { sidebarStyles } from "./sidebar/SidebarStyles";
import { ChevronLeft, ChevronRight } from "@/lib/icons";

const Sidebar = ({
  variant = "desktop",
}: {
  variant?: "desktop" | "mobile";
}) => {
  const pathname = usePathname();
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const handleToggle = (key: string) => {
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const isActive = (item: MenuItem) => {
    if (item.path === pathname) return true;
    if (item.children) {
      return item.children.some((child) => child.path === pathname);
    }
    return false;
  };

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

  return (
    <Box sx={sidebarStyles.root(isExpanded)}>
      <Box sx={{ position: "absolute", top: 8, left: -16, zIndex: 10 }}>
        <IconButton
          onClick={() => setIsExpanded((prev) => !prev)}
          sx={{
            color: "text.dark",
            bgcolor: "white",
            "&:hover": {
              bgcolor: "gray",
            },
          }}
        >
          {isExpanded ? <ChevronRight /> : <ChevronLeft />}
        </IconButton>
      </Box>
      <Box>
        <Typography>Logo</Typography>
      </Box>
      <List sx={sidebarStyles.list(isExpanded)}>
        {menuItems.map((item: MenuItem) => {
          const active = isActive(item);
          const hasChildren = !!item.children;

          return (
            <Box key={item.key}>
              <ParentMenuItem
                item={item}
                active={active}
                onClick={() => handleToggle(item.key)}
                hasChildren={hasChildren}
                isOpen={open[item.key]}
                isExpanded={isExpanded}
              />

              {hasChildren && (
                <Collapse in={open[item.key]} timeout="auto" unmountOnExit>
                  <Box
                    sx={{
                      position: "relative",
                      ml: 0,
                      mr: 1,
                      pr: 0,
                      "&::before": isExpanded
                        ? {
                            content: '""',
                            position: "absolute",
                            top: -10,
                            bottom: "calc(0% + 25px)",
                            right: "20px",
                            width: "2px",
                            bgcolor: "text.secondary",
                          }
                        : {},
                    }}
                  >
                    <List component="div" disablePadding>
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
  );
};

export default Sidebar;
