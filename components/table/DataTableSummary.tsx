"use client";
import { Box, Chip } from "@mui/material";
import { SummaryItem } from "./DataTable";

const DataTableSummary = ({ items }: { items: SummaryItem[] }) => {
  return (
    <Box display="flex" gap={1} flexWrap="wrap" mb={2}>
      {items.map((item, idx) => (
        <Chip
          key={idx}
          label={`${item.label} ${item.count}`}
          color={item.color ?? "default"}
          variant="outlined"
          sx={{ fontWeight: 500 }}
        />
      ))}
    </Box>
  );
};

export default DataTableSummary;
