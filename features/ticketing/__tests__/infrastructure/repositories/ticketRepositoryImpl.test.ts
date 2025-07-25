import { mockTicket } from "@/features/ticketing/__mocks__/ticketData";
import { TicketRepositoryImpl } from "@/features/ticketing/infrastructure/repositories/ticketRepositoryImpl";
import { TicketApi } from "../../../api/endpoints";
import { TicketListResponse } from "../../../types";

jest.mock("../../../api/endpoints");

describe("TicketRepositoryImpl", () => {
  let repository: TicketRepositoryImpl;

  beforeEach(() => {
    repository = new TicketRepositoryImpl();
    jest.clearAllMocks();
  });

  describe("getTickets", () => {
    it("should return tickets data on successful API call", async () => {
      const mockResponse: TicketListResponse = {
        tickets: {
          data: [mockTicket],
          current_page: 1,
          total: 1,
          per_page: 10,
          last_page: 1,
        },
        filters: [],
      };

      // Mock the API response
      (TicketApi.getTickets as jest.Mock).mockResolvedValue(mockResponse);

      const result = await repository.getTickets({ page: 1 });

      expect(result.tickets.data).toEqual(mockResponse.tickets.data);

      expect(TicketApi.getTickets).toHaveBeenCalledWith({ page: 1 }, undefined);
    });

    it("should pass abort signal when provided", async () => {
      const mockResponse: TicketListResponse = {
        tickets: {
          data: [mockTicket],
          current_page: 1,
          total: 1,
          per_page: 10,
          last_page: 1,
        },
        filters: [],
      };

      const abortController = new AbortController();
      (TicketApi.getTickets as jest.Mock).mockResolvedValue(mockResponse);

      await repository.getTickets({}, { signal: abortController.signal });

      expect(TicketApi.getTickets).toHaveBeenCalledWith(
        {},
        { signal: abortController.signal }
      );
    });

    it("should throw formatted error on API failure", async () => {
      const apiError = new Error("API Error");
      (TicketApi.getTickets as jest.Mock).mockRejectedValue(apiError);

      await expect(repository.getTickets({})).rejects.toThrow(
        "Failed to fetch tickets"
      );
    });

    it("should preserve original error if already an Error instance", async () => {
      const originalError = new Error("Original error message");
      (TicketApi.getTickets as jest.Mock).mockRejectedValue(originalError);

      try {
        await repository.getTickets({});
        fail("Expected error to be thrown");
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect((error as Error).message).toBe("Failed to fetch tickets");
      }
    });
  });
});
