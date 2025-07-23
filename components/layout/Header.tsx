"use client";

import {
  AppBar,
  Avatar,
  Box,
  BoxProps,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import MobileDrawer from "./MobileDrawer";
import { Archive, Bag, Bell, Card, Cart } from "@/lib/icons";

function Item(props: BoxProps) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={[
        () => ({
          p: 0.5,
          pb: 0,
          m: 1,
          borderRadius: 2,
          fontSize: "0.875rem",
          fontWeight: "700",
          cursor: "pointer",
          border: "1px solid",
          borderColor: "background.default",
          "&:hover": {
            borderColor: "grey.300",
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    />
  );
}

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:768px)");

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <AppBar
        position="static"
        color="inherit"
        elevation={0}
        sx={{
          bgcolor: "background.default",
          width: "100%",
          boxShadow: 0,
          mb: 2,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Right icons */}
          <Box display="flex" alignItems="center" gap={2}>
            {isMobile && (
              <IconButton onClick={handleDrawerOpen} aria-label="open drawer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4.5 6.5h15M4.5 12h15m-15 5.5h15"
                  />
                </svg>
              </IconButton>
            )}

            <Box
              sx={{
                color: "text.secondary",
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
              }}
            >
              <Item>
                <Archive />
              </Item>
              <Item sx={{ color: "text.dark" }}>
                <Bag />
              </Item>
              <Item>
                <Bell />
              </Item>
              <Item>
                <Card />
              </Item>
              <Item>
                <Cart />
              </Item>
            </Box>
          </Box>

          {/* Left avatar */}
          <Box>
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
              <Avatar
                alt="User"
                src="/assets/images/avatar.png"
                sx={{ width: 32, height: 32 }}
              />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem>پروفایل</MenuItem>
              <MenuItem>خروج</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <MobileDrawer open={drawerOpen} onClose={handleDrawerClose} />
    </>
  );
};

export default Header;
