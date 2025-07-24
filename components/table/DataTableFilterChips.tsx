"use client";
import { Box, Chip } from "@mui/material";

type Props = {
  filters: string[];
  onRemove?: (filter: string) => void;
};

const DataTableFilterChips = ({ filters, onRemove }: Props) => {
  return (
    <Box display="flex" gap={1} flexWrap="wrap">
      {filters.map((filter, idx) => (
        <Chip
          key={idx}
          label={filter}
          onDelete={onRemove ? () => onRemove(filter) : undefined}
          color="primary"
          variant="filled"
          size="small"
        />
      ))}
    </Box>
  );
};

export default DataTableFilterChips;
