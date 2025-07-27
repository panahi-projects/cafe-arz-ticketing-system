"use client";

import { useTicketOperations } from "../hooks/useTicketOperations";

interface TicketDetailProps {
  id: string;
}

const TicketDetail = ({ id }: TicketDetailProps) => {
  const { data: ticketData, loading: ticketLoading } =
    useTicketOperations().useTicketById(id);

  if (ticketLoading) {
    return <div>Loading...</div>;
  }
  return <div>Ticket Detail Page: {ticketData?.ticket?.title}</div>;
};

export default TicketDetail;
