"use client";
import { Box, useMediaQuery } from "@mui/material";
import Sidebar from "./Sidebar";
import Header from "./Header";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useMediaQuery("(max-width:768px)");
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        flexDirection: "row",
        overflow: "hidden",
      }}
    >
      {!isMobile && <Sidebar variant="desktop" />}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          width: { xs: "100%" },
        }}
      >
        <Header />
        <Box
          component={"main"}
          sx={{
            flex: 1,
            overflowY: "auto",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
