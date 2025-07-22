"use client";

import { menuItems } from "@/configs";
import { MenuItem } from "@/configs/menu-items";
import { Box, Collapse, List, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ChildMenuItem from "./sidebar/ChildMenuItem";
import ParentMenuItem from "./sidebar/ParentMenuItem";
import { sidebarStyles } from "./SidebarStyles";

const Sidebar = ({
  variant = "desktop",
}: {
  variant?: "desktop" | "mobile";
}) => {
  const pathname = usePathname();
  const [open, setOpen] = useState<Record<string, boolean>>({});

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

  return (
    <Box sx={sidebarStyles.root}>
      <Box>
        <Typography>Logo</Typography>
      </Box>
      <List sx={sidebarStyles.list}>
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
              />

              {hasChildren && (
                <Collapse in={open[item.key]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.children &&
                      item.children.map((sub: MenuItem) => (
                        <ChildMenuItem
                          key={sub.key}
                          item={sub}
                          active={sub.path === pathname}
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
  );
};

export default Sidebar;
