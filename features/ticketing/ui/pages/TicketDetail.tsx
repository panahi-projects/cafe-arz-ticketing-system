"use client";

import { Box, Grid, useMediaQuery } from "@mui/material";
import { useTicketOperations } from "../hooks/useTicketOperations";
import { TicketActionBox } from "../components/TicketActionBox";
import TicketDetailSummary from "../components/TicketDetailSummary";
import TicketReplyBox from "../components/TicketReplyBox";

interface TicketDetailProps {
  id: string;
}

const TicketDetail = ({ id }: TicketDetailProps) => {
  const { data: ticketData, loading: ticketLoading } =
    useTicketOperations().useTicketById(id);
  const isMobile = useMediaQuery("(max-width:768px)");

  if (ticketLoading) {
    return <div>Loading...</div>;
  }
  // return <div>Ticket Detail Page: {ticketData?.ticket?.title}</div>;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100dvh", // Fill the whole screen
        overflow: "hidden", // prevent outer scrolling
      }}
    >
      <Grid container spacing={2} flexShrink={0}>
        <Grid size={isMobile ? 12 : 6}>
          <TicketActionBox
            status={ticketData?.ticket?.status.key}
            fk_department_id={ticketData?.ticket?.fk_department.key}
            referTo={ticketData?.ticket?.fk_agent_id || ""}
          />
        </Grid>
        <Grid size={isMobile ? 12 : 6}>
          <TicketDetailSummary {...ticketData?.ticket?.user} />
        </Grid>
      </Grid>
      <Box
        sx={{
          flexGrow: 1,
          overflow: "auto",
          mt: 2,
        }}
      >
        <TicketReplyBox />
      </Box>
    </Box>
  );
};

export default TicketDetail;
