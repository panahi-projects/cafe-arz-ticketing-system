"use client";
import { TicketStatus } from "@/features/ticketing/types";
import { Box, Typography } from "@mui/material";
import { SummaryItem } from "./DataTable";
import DataTableSummaryChip from "./DataTableSummaryChip";

const DataTableSummary = ({ items }: { items: SummaryItem[] }) => {
  return (
    <Box display={"flex"} gap={3} alignItems={"center"}>
      <Typography
        fontSize={12}
        fontWeight={700}
        sx={{ color: "text.secondary" }}
      >
        همه تیکت ها
      </Typography>
      <Box display="flex" gap={3} flexWrap="wrap">
        {items.map((item, idx) => {
          const itemStatus: TicketStatus = {
            key: item.key || "PENDING",
            label: `${item.count}`,
          };
          return (
            <DataTableSummaryChip
              key={`${item.key}-${idx}`}
              rawText={item.label}
              status={itemStatus}
            />
          );
        })}
      </Box>
    </Box>
  );
};
// <Chip
//   key={idx}
//   label={`${item.label} ${item.count}`}
//   color={item.color ?? "default"}
//   variant="outlined"
//   size="small"
//   sx={{ fontWeight: 500 }}
// />

export default DataTableSummary;
