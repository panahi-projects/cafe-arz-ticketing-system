import { Ticket, TicketListResponse, TicketResponse } from "../types";
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
  createTicket: (payload: unknown, config?: { signal?: AbortSignal }) =>
    ticketingApi.post<Partial<Ticket>>(`/tickets`, payload, {
      signal: config?.signal,
    }),
};
