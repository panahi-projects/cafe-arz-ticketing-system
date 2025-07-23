"use client";
import { Box, Chip } from "@mui/material";

type Props = {
  filters: string[];
  onRemove?: (filter: string) => void;
};

const DataTableFilterChips = ({ filters, onRemove }: Props) => {
  return (
    <Box display="flex" gap={1} flexWrap="wrap" mb={2}>
      {filters.map((filter, idx) => (
        <Chip
          key={idx}
          label={filter}
          onDelete={onRemove ? () => onRemove(filter) : undefined}
          color="primary"
          variant="filled"
        />
      ))}
    </Box>
  );
};

export default DataTableFilterChips;
