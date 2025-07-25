import { Ticket } from "../../types";

export interface TicketRepository {
  getTickets(
    params?: any,
    config?: { signal?: AbortSignal }
  ): Promise<Ticket[]>;
}
