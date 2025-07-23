import { TicketResponse } from "../types";
import { ticketingApi } from "./api-factory";

export const TicketApi = {
  getTickets: (params?: any) =>
    ticketingApi.get<TicketResponse[]>("/test-api", { params }),
};
