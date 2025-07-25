import { TicketRepository } from "../../domain/repositories/ticketRepository";
import { TicketApi } from "../../api/endpoints";
import { Ticket } from "../../types";

export class TicketRepositoryImpl implements TicketRepository {
  async getTickets(params?: any): Promise<Ticket[]> {
    try {
      const response = await TicketApi.getTickets(params);
      return response.tickets.data;
    } catch (error) {
      throw new Error("Failed to fetch tickets");
    }
  }
}
