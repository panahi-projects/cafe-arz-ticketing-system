import { TicketListResponse, TicketResponse } from "../types";
import { ticketingApi } from "./api-factory";

export const TicketApi = {
  getTickets: (params?: any, p0?: { signal: AbortSignal }) =>
    ticketingApi.get<TicketListResponse>("/test-api", { params }),
};
