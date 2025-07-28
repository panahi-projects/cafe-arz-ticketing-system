"use client";
import TicketDetail from "@/features/ticketing/ui/pages/TicketDetail";
import { use } from "react";

const TicketDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id: ticketId } = use(params);

  if (ticketId) {
    return <TicketDetail id={ticketId} />;
  }
  return <div></div>;
};

export default TicketDetailPage;
