import { TicketListResponse } from "../types";
import { ticketingApi } from "./api-factory";

export const TicketApi = {
  getTickets: (params?: any, config?: { signal?: AbortSignal }) =>
    ticketingApi.get<TicketListResponse>("/tickets", {
      params,
      signal: config?.signal,
    }),
};
