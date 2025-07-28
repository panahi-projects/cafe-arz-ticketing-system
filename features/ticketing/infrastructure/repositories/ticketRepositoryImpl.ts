import { TicketApi } from "../../api/endpoints";
import { TicketRepository } from "../../domain/repositories/ticketRepository";
import { Ticket, TicketListResponse, TicketResponse } from "../../types";

export class TicketRepositoryImpl implements TicketRepository {
  async getTickets(
    params?: any,
    config?: { signal?: AbortSignal }
  ): Promise<TicketListResponse> {
    try {
      const response = await TicketApi.getTickets(params, config);
      return response;
    } catch (error) {
      throw new Error("Failed to fetch tickets");
    }
  }
  async getTicketById(
    id: string,
    config?: { signal?: AbortSignal }
  ): Promise<TicketResponse> {
    try {
      const response = await TicketApi.getTicketById(id, config);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch ticket: ${id}`);
    }
  }

  async createTicket(
    payload: unknown,
    config?: { signal?: AbortSignal }
  ): Promise<Partial<Ticket>> {
    try {
      const response = await TicketApi.createTicket(payload, config);
      return response;
    } catch (error) {
      throw new Error(`Failed to create ticket`);
    }
  }
}
