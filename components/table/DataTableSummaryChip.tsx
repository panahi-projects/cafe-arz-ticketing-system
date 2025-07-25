import { TicketStatus } from "@/features/ticketing/types";
import TicketStatusChip from "@/features/ticketing/ui/components/TicketStatusChip";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";

export interface DataTableSummaryChipProps {
  rawText: string;
  status: TicketStatus;
}

const DataTableSummaryChip = ({
  rawText,
  status,
}: DataTableSummaryChipProps) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      display="flex"
      gap={1}
      alignItems="center"
      sx={{
        flexDirection: isSmallScreen ? "column" : "row",
        textAlign: isSmallScreen ? "center" : "left",
      }}
    >
      <Typography
        fontSize={12}
        fontWeight={700}
        sx={{
          color: "text.secondary",
          whiteSpace: "nowrap",
        }}
      >
        {rawText}
      </Typography>
      <TicketStatusChip
        item={status}
        size={isSmallScreen ? "xs" : "sm"}
        sx={{
          opacity: 0.7,
          minWidth: isSmallScreen ? "24px" : "30px",
          minHeight: isSmallScreen ? "24px" : "30px",
          fontWeight: 700,
        }}
      />
    </Box>
  );
};

export default DataTableSummaryChip;
