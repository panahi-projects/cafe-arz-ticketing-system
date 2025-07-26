"use client";
import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";
import DataTableFilter from "./DataTableFilter";

type Props = {
  children?: ReactNode;
};

const DataTableToolbar = ({ children }: Props) => {
  return (
    <Box display={"flex"} justifyContent={"space-between"}>
      <Box display={"flex"} gap={1} sx={{ color: "text.primary" }}>
        <Typography fontSize={12} fontWeight={700}>
          لیست تیکت ها
        </Typography>
        <Typography fontSize={12} fontWeight={700}>
          (215)
        </Typography>
      </Box>
      <DataTableFilter />
    </Box>
  );
};

export default DataTableToolbar;
