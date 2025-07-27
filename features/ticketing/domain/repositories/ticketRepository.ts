import { TicketListResponse, TicketResponse } from "../../types";

export interface TicketRepository {
  getTickets(
    params?: any,
    config?: { signal?: AbortSignal }
  ): Promise<TicketListResponse>;
  getTicketById(
    id: string,
    config?: { signal?: AbortSignal }
  ): Promise<TicketResponse>;
}
