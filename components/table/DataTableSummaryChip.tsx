import { TicketStatus } from "@/features/ticketing/types";
import TicketStatusChip from "@/features/ticketing/ui/components/TicketStatusChip";
import { Box, Typography } from "@mui/material";
import React from "react";

export interface DataTableSummaryChipProps {
  rawText: string;
  status: TicketStatus;
}
const DataTableSummaryChip = ({
  rawText,
  status,
}: DataTableSummaryChipProps) => {
  return (
    <Box display={"flex"} gap={1} alignItems={"center"}>
      <Typography
        fontSize={12}
        fontWeight={700}
        sx={{ color: "text.secondary" }}
      >
        {rawText}
      </Typography>
      <TicketStatusChip
        item={status}
        size="sm"
        sx={{
          opacity: 0.7,
          minWidth: "30px",
          minHeight: "30px",
          fontWeight: 700,
        }}
      />
    </Box>
  );
};

export default DataTableSummaryChip;
