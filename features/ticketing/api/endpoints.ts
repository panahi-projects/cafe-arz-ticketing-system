import { TicketListResponse, TicketResponse } from "../types";
import { ticketingApi } from "./api-factory";

export const TicketApi = {
  getTickets: (params?: any, config?: { signal?: AbortSignal }) =>
    ticketingApi.get<TicketListResponse>("/tickets", {
      params,
      signal: config?.signal,
    }),
  getTicketById: (id: string, config?: { signal?: AbortSignal }) =>
    ticketingApi.get<TicketResponse>(`/tickets/${id}`, {
      signal: config?.signal,
    }),
};
