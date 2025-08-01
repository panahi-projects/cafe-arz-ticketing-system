import { Chip } from "@mui/material";
import React, { useMemo } from "react";
import { TicketStatusChipProps } from "../../types";

const STATUS_CONFIG = {
  ANSWERED: {
    label: "پاسخ داده شده",
    bg: "success.100",
    text: "success.dark",
  },
  PENDING: {
    label: "در حال بررسی",
    bg: "warning.100",
    text: "warning.dark",
  },
  NOANSWER: {
    label: "بدون پاسخ",
    bg: "error.100",
    text: "error.dark",
  },
  RESOLVED: {
    label: "حل شده",
    bg: "primary.100",
    text: "primary.dark",
  },
  CLOSED: {
    label: "بسته شده",
    bg: "grey.100",
    text: "grey.800",
  },
} as const;

const TicketStatusChip = ({
  item = { key: "PENDING", label: "در حال بررسی" },
  size = "md",
  sx,
}: TicketStatusChipProps) => {
  const colorStyle = useMemo(
    () => STATUS_CONFIG[item?.key || "PENDING"],
    [item?.key]
  );
  return (
    <Chip
      label={item.label}
      sx={{
        px: size === "sm" ? 0.8 : size === "md" ? 2 : 3,
        py: size === "sm" ? 0.6 : size === "md" ? 0.85 : 1.2,
        fontSize: 12,
        borderRadius: 2,
        bgcolor: colorStyle.bg,
        color: colorStyle.text,
        height: "auto",
        "& .MuiChip-label": {
          padding: 0,
          lineHeight: 1.2,
        },
        ...sx,
      }}
    />
  );
};

export default React.memo(TicketStatusChip);
