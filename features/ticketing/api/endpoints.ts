import { TicketListResponse, TicketResponse } from "../types";
import { ticketingApi } from "./api-factory";

export const TicketApi = {
  getTickets: (params?: any) =>
    ticketingApi.get<TicketListResponse>("/test-api", { params }),
};
