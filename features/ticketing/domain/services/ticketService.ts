import { Ticket, TicketListResponse, TicketResponse } from "../../types";
import { TicketRepository } from "../repositories/ticketRepository";

export class TicketService {
  constructor(private repository: TicketRepository) {}

  async getTickets(
    params?: any,
    config?: { signal?: AbortSignal }
  ): Promise<TicketListResponse> {
    return this.repository.getTickets(params, config);
  }

  async getTicketById(
    id: string,
    config?: { signal?: AbortSignal }
  ): Promise<TicketResponse> {
    return this.repository.getTicketById(id, config);
  }

  async createTicket(
    payload: unknown,
    config?: { signal?: AbortSignal }
  ): Promise<Partial<Ticket>> {
    return this.repository.createTicket(payload, config);
  }
}
