import { Ticket } from "../../types";

export interface TicketRepository {
  getTickets(params?: any): Promise<Ticket[]>;
}
