"use client";
import { Box, IconButton, Typography } from "@mui/material";
import { ReactNode } from "react";

type Props = {
  children?: ReactNode; // filters passed from parent
};

const DataTableToolbar = ({ children }: Props) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={2}
    >
      <Box display="flex" alignItems="center" gap={1}>
        <IconButton color="primary">(Y) FilterListIcon</IconButton>
        <Typography fontWeight={600}>فیلترها</Typography>
      </Box>
      <Box display="flex" gap={2} flexWrap="wrap">
        {children}
      </Box>
    </Box>
  );
};

export default DataTableToolbar;
