import { TicketListResponse } from "../../types";

export interface TicketRepository {
  getTickets(
    params?: any,
    config?: { signal?: AbortSignal }
  ): Promise<TicketListResponse>;
}
