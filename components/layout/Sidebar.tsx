"use client";

import { menuItems } from "@/configs";
import { MenuItem } from "@/configs/menu-items";
import { IconKey, icons } from "@/lib/icons";
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useState } from "react";

const Sidebar = ({
  variant = "desktop",
}: {
  variant?: "desktop" | "mobile";
}) => {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const handleToggle = (key: string) => {
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  return (
    <Box>
      <Box>
        <Typography>Logo</Typography>
      </Box>
      <List>
        {menuItems.map((item: MenuItem) => {
          const Icon = item.icon && (icons[item.icon as IconKey] as any);
          return (
            <Box key={item.key}>
              <ListItemButton
                sx={{
                  textAlign: "start",
                }}
                onClick={() => handleToggle(item.key)}
              >
                {item.icon && (
                  <ListItemIcon>
                    <Icon />
                  </ListItemIcon>
                )}
                <ListItemText>{item.label}</ListItemText>
              </ListItemButton>
              {item.children && (
                <Collapse in={open[item.key]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.children.map((sub: any) => (
                      <ListItemButton key={sub.key} sx={{ pr: 4 }}>
                        <ListItemText primary={sub.label} />
                      </ListItemButton>
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
