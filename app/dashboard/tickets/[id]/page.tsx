import TicketDetail from "@/features/ticketing/ui/pages/TicketDetail";

const TicketDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id: ticketId } = await params;

  if (ticketId) {
    return <TicketDetail id={ticketId} />;
  }
  return <div></div>;
};

export default TicketDetailPage;
