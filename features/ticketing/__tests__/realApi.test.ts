import axios from "axios";
import { TicketApi } from "../api/endpoints";
import { TicketListResponse } from "../types";

// This is an integration test suite - only run when needed
describe("Real API Integration Tests", () => {
  jest.setTimeout(15000); // 15 seconds timeout

  it("should successfully GET data from test endpoint", async () => {
    try {
      const response = await TicketApi.getTickets();

      const ticketResponse = response as unknown as TicketListResponse;

      expect(ticketResponse).toHaveProperty("tickets");
      expect(ticketResponse).toHaveProperty("filters");

      expect(Array.isArray(ticketResponse.tickets.data)).toBe(true);

      if (ticketResponse.tickets.data.length > 0) {
        const firstTicket = ticketResponse.tickets.data[0];
        expect(firstTicket).toHaveProperty("ticket_id");
        expect(firstTicket).toHaveProperty("content");
        expect(firstTicket).toHaveProperty("status");
      }

      // Validate filters structure if needed
      expect(Array.isArray(ticketResponse.filters)).toBe(true);
    } catch (error) {
      // Enhanced error handling with TypeScript type guards
      if (axios.isAxiosError(error)) {
        console.error("API Error Details:", {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          config: {
            url: error.config?.url,
            method: error.config?.method,
          },
        });
      } else if (error instanceof Error) {
        console.error("Unexpected error:", error.message);
      }
      throw error;
    }
  });

  // Add more real API tests as needed
});
