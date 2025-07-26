"use client";
import { Box, Button, useMediaQuery } from "@mui/material";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Breadcrumbs } from "../Breadcrumbs";
import { PageTitle } from "../PageTitle";
import { useLayoutContext } from "@/context/DashboardLayoutContext";
import { Plus } from "@/lib/icons";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useMediaQuery("(max-width:768px)");
  const { headerAction } = useLayoutContext();

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        flexDirection: "row",
        overflow: "hidden",
      }}
    >
      {!isMobile && <Sidebar />}
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
            p: { xs: 2, md: 4 },
            pt: { xs: 2, md: 2 },
          }}
        >
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Box>
              <PageTitle />
            </Box>
            <Box>
              {headerAction && (
                <Button
                  variant="contained"
                  onClick={headerAction.onClick}
                  startIcon={headerAction.icon || <Plus opacity={1} />}
                  sx={{
                    minWidth: "fit-content",
                    gap: 1,
                    borderRadius: "8px",
                    pr: !isMobile ? 1 : 0.5,
                    py: 1,
                    ...headerAction.sx,
                  }}
                  color={headerAction.color ?? "success"}
                >
                  {!isMobile ? headerAction.label : ""}
                </Button>
              )}
            </Box>
          </Box>
          <Breadcrumbs separator="." />
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
