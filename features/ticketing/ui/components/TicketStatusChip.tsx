import { Chip } from "@mui/material";
import React from "react";
import { TicketStatus } from "../../types";

type ColorVariant =
  | "error"
  | "warning"
  | "info"
  | "success"
  | "primary"
  | "secondary"
  | "default";
interface TicketStatusBadgeProps {
  item: TicketStatus;
  variant?: ColorVariant;
}

const TicketStatusChip = ({
  item,
  variant = "default",
}: TicketStatusBadgeProps) => {
  const statusColors = {
    ANSWERED: { bg: "success.100", text: "success.dark" },
    NOANSWER: { bg: "error.100", text: "error.dark" },
    PENDING: { bg: "warning.100", text: "warning.dark" },
    RESOLVED: { bg: "primary.100", text: "primary.dark" },
  };
  return (
    <Chip
      label={item.label}
      sx={{
        px: 2,
        py: 0.85,
        fontSize: 12,
        borderRadius: 2,
        bgcolor: statusColors[item.key].bg,
        color: statusColors[item.key].text,
        height: "auto",
        "& .MuiChip-label": {
          padding: 0,
          lineHeight: 1.2,
        },
      }}
    />
  );
};

export default TicketStatusChip;
