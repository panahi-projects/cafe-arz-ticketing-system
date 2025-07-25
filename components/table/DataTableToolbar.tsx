"use client";
import { Filter } from "@/lib/icons";
import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

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
      <Box sx={{ color: "text.primary" }}>
        <Filter opacity={1} />
      </Box>
    </Box>
  );
};

export default DataTableToolbar;
