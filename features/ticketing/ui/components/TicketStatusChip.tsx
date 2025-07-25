import { Chip, SxProps } from "@mui/material";
import React, { useMemo } from "react";
import { TicketStatus } from "../../types";
import { Theme } from "@emotion/react";

const statusColors = {
  ANSWERED: { bg: "success.100", text: "success.dark" },
  NOANSWER: { bg: "error.100", text: "error.dark" },
  PENDING: { bg: "warning.100", text: "warning.dark" },
  RESOLVED: { bg: "primary.100", text: "primary.dark" },
} as const;

interface TicketStatusChipProps {
  item: TicketStatus;
  size?: "sm" | "md" | "lg";
  sx?: SxProps<Theme> | undefined;
}

const TicketStatusChip = ({ item, size = "md", sx }: TicketStatusChipProps) => {
  const colorStyle = useMemo(() => statusColors[item.key], [item.key]);
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
