import { Ticket } from "../../types";
import { TicketRepository } from "../repositories/ticketRepository";

export class TicketService {
  constructor(private repository: TicketRepository) {}

  async getTickets(
    params?: any,
    config?: { signal?: AbortSignal }
  ): Promise<Ticket[]> {
    return this.repository.getTickets(params, config);
  }
}
