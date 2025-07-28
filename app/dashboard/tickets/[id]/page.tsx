"use client";
import { useLayoutContext } from "@/context/DashboardLayoutContext";
import TicketDetail from "@/features/ticketing/ui/pages/TicketDetail";
import { use, useEffect } from "react";

const TicketDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id: ticketId } = use(params);
  const { setLayoutConfig } = useLayoutContext();

  useEffect(() => {
    setLayoutConfig({
      showPageTitle: false,
      showBreadcrumbs: false,
    });

    return () => setLayoutConfig({});
  }, [setLayoutConfig]);

  if (ticketId) {
    return <TicketDetail id={ticketId} />;
  }
  return <div></div>;
};

export default TicketDetailPage;
