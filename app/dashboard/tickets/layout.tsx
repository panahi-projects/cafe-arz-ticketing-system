import { TicketServiceProvider } from "@/features/ticketing/context/TicketServiceContext";

export default function TicketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TicketServiceProvider>{children}</TicketServiceProvider>;
}
