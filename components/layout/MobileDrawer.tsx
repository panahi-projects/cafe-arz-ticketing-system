"use client";

import { menuItems } from "@/configs";
import { Close } from "@/lib/icons";
import { MenuItem, MobileDrawerProps } from "@/types";
import {
  Box,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  List,
} from "@mui/material";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "./Logo";
import ChildMenuItem from "./sidebar/ChildMenuItem";
import ParentMenuItem from "./sidebar/ParentMenuItem";
import { sidebarStyles } from "./sidebar/SidebarStyles";
import HeaderMenu from "./HeaderMenu";

const MobileDrawer = ({ open, onClose }: MobileDrawerProps) => {
  const pathname = usePathname();
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});

  const handleToggle = (key: string) => {
    setOpenSubmenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const isActive = (item: MenuItem) => {
    if (item.path === pathname) return true;
    if (item.children) {
      return item.children.some((child) => child.path === pathname);
    }
    return false;
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: 280,
          boxSizing: "border-box",
          bgcolor: "background.sidebar",
          color: "text.secondary",
        },
      }}
      ModalProps={{
        keepMounted: true,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
        }}
      >
        <Logo isExpanded={true} />
        <IconButton
          onClick={onClose}
          sx={{
            color: "white",
          }}
        >
          <Close />
        </IconButton>
      </Box>
      <HeaderMenu
        sx={{
          gap: 0,
        }}
        itemsSx={{
          border: 0,
          color: "text.secondary",
        }}
      />
      <Divider />
      <Box
        sx={{
          overflowY: "auto",
          height: "100%",
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
        <List sx={sidebarStyles.list(true)}>
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
                  isOpen={openSubmenus[item.key]}
                  isExpanded={true}
                />

                {hasChildren && (
                  <Collapse
                    in={openSubmenus[item.key]}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      {item.children?.map((sub: MenuItem) => (
                        <ChildMenuItem
                          key={sub.key}
                          item={sub}
                          active={sub.path === pathname}
                          isExpanded={true}
                          onClick={onClose}
                        />
                      ))}
                    </List>
                  </Collapse>
                )}
              </Box>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
};

export default MobileDrawer;
