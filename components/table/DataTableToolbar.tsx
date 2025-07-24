"use client";
import { Box, IconButton, Typography } from "@mui/material";
import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

const DataTableToolbar = ({ children }: Props) => {
  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", sm: "row" }}
      justifyContent="space-between"
      alignItems={{ xs: "flex-start", sm: "center" }}
      gap={{ xs: 1, sm: 0 }}
    >
      <Box display="flex" alignItems="center" gap={1}>
        <IconButton color="primary" size="small">
          (Y) FilterListIcon
        </IconButton>
        <Typography fontWeight={600} fontSize={{ xs: 14, sm: 16 }}>
          فیلترها
        </Typography>
      </Box>
      <Box display="flex" gap={1} flexWrap="wrap">
        {children}
      </Box>
    </Box>
  );
};

export default DataTableToolbar;
