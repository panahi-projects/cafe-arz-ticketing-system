"use client";
import { Trash } from "@/lib/icons";
import { Box, Chip, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { AppliedFilter, FiletItem } from "./DataTable";

type Props = {
  filters: AppliedFilter[];
  onRemove?: (filter: string) => void;
  onRemoveAll?: () => void;
};

interface FilterChipProps {
  id: string;
  items: FiletItem[];
  onRemove?: (filter: string) => void;
}
const FilterChip = ({ id, items, onRemove }: FilterChipProps) => {
  const isMobile = useMediaQuery("(max-width:768px)");
  const [filterItems, setFilterItems] = useState<string>("");
  useEffect(() => {
    const itemsLabel = items.map((x) => x.label);
    setFilterItems(itemsLabel.join(", "));
  }, [items]);

  return (
    <Chip
      label={filterItems}
      sx={{
        borderRadius: "8px",
        gap: 1,
        bgcolor: "gray.300",
        px: !isMobile ? 0.75 : 0.25,
        py: !isMobile ? 0.5 : 0.25,
        display: "flex",
        alignItems: "center",
        fontSize: !isMobile ? "12px" : "10px",
        "& .MuiChip-deleteIcon": {
          fontSize: "24px", // Icon size
          transform: "translateX(10px)",
          color: "gray.600",
        },
        "&:hover": {
          backgroundColor: "action.hover", // Chip background on hover
        },
      }}
      onDelete={onRemove ? () => onRemove(id) : undefined}
    />
  );
};

const DataTableFilterChips = ({ filters, onRemove, onRemoveAll }: Props) => {
  const isMobile = useMediaQuery("(max-width:768px)");
  return (
    <Box display="flex" gap={4} alignItems={"center"} flexWrap="wrap">
      <Box
        display="flex"
        gap={2}
        flexWrap="wrap"
        sx={{
          border: "2px dashed",
          borderColor: "gray.300",
          borderRadius: "14px",
          p: "6px",
        }}
      >
        {filters.map((filter, idx) => {
          const filterItems = filter.items;
          return (
            <Box
              display={"flex"}
              key={`${filter.key}-${idx}`}
              gap={1}
              alignItems={"center"}
            >
              <Typography fontSize={12} fontWeight={700}>
                {filter.label}:
              </Typography>
              <FilterChip
                id={filter.key}
                items={filterItems}
                onRemove={onRemove}
              />
            </Box>
          );
        })}
      </Box>
      <Box
        display={"flex"}
        sx={{
          color: "error.600",
          cursor: "pointer",
        }}
        gap={1}
        alignItems={"center"}
        onClick={onRemoveAll}
      >
        <Trash />
        <Typography
          sx={{
            fontSize: !isMobile ? "14px" : "10px",
          }}
        >
          پاک کردن همه
        </Typography>
      </Box>
    </Box>
  );
};

export default DataTableFilterChips;
