"use client";
import { TicketStatus } from "@/features/ticketing/types";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import DataTableSummaryChip from "./DataTableSummaryChip";
import { SummaryItem } from "@/types";

const DataTableSummary = ({ items }: { items: SummaryItem[] }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      display="flex"
      gap={3}
      alignItems="center"
      sx={{
        flexDirection: isMobile ? "column" : "row",
        alignItems: isMobile ? "flex-start" : "center",
      }}
    >
      <Typography
        fontSize={12}
        fontWeight={700}
        sx={{ color: "text.secondary", mb: isMobile ? 1 : 0 }}
      >
        همه تیکت ها
      </Typography>

      <Box
        display="flex"
        gap={3}
        sx={{
          overflowX: isMobile ? "auto" : "visible",
          overflowY: "hidden",
          width: isMobile ? "100%" : "auto",
          pb: isMobile ? 1 : 0,
          "&::-webkit-scrollbar": {
            height: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: theme.palette.divider,
            borderRadius: "4px",
          },
          scrollbarWidth: "thin",
        }}
      >
        {items.map((item, idx) => {
          const itemStatus: TicketStatus = {
            key: item.key || "PENDING",
            label: `${item.count}`,
          };
          return (
            <Box key={`${item.key}-${idx}`} sx={{ flexShrink: 0 }}>
              <DataTableSummaryChip rawText={item.label} status={itemStatus} />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default DataTableSummary;
