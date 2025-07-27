"use client";
import { Box, Typography } from "@mui/material";
import DataTableFilter from "./DataTableFilter";
import { DataTableToolbarProps } from "@/types";

const DataTableToolbar = ({ children }: DataTableToolbarProps) => {
  return (
    <Box display={"flex"} justifyContent={"space-between"}>
      <Box display={"flex"} gap={1} sx={{ color: "text.primary" }}>
        <Typography fontSize={12} fontWeight={700}>
          لیست تیکت ها
        </Typography>
        <Typography fontSize={12} fontWeight={700}>
          {children}
        </Typography>
      </Box>
      <DataTableFilter />
    </Box>
  );
};

export default DataTableToolbar;
