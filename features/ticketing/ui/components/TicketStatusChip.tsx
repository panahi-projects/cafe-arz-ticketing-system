import { Chip } from "@mui/material";
import React, { useMemo } from "react";
import { TicketStatus } from "../../types";

type ColorVariant =
  | "error"
  | "warning"
  | "info"
  | "success"
  | "primary"
  | "secondary"
  | "default";

const statusColors = {
  ANSWERED: { bg: "success.100", text: "success.dark" },
  NOANSWER: { bg: "error.100", text: "error.dark" },
  PENDING: { bg: "warning.100", text: "warning.dark" },
  RESOLVED: { bg: "primary.100", text: "primary.dark" },
} as const;

const TicketStatusChip = ({ item }: { item: TicketStatus }) => {
  const colorStyle = useMemo(() => statusColors[item.key], [item.key]);
  return (
    <Chip
      label={item.label}
      sx={{
        px: 2,
        py: 0.85,
        fontSize: 12,
        borderRadius: 2,
        bgcolor: colorStyle.bg,
        color: colorStyle.text,
        height: "auto",
        "& .MuiChip-label": {
          padding: 0,
          lineHeight: 1.2,
        },
      }}
    />
  );
};

export default React.memo(TicketStatusChip);
