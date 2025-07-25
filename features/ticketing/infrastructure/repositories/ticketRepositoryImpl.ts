import { TicketApi } from "../../api/endpoints";
import { TicketRepository } from "../../domain/repositories/ticketRepository";
import { TicketListResponse } from "../../types";

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
}
