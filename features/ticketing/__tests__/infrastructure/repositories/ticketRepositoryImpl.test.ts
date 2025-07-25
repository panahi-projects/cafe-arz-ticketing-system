import { mockTicket } from "@/features/ticketing/__mocks__/ticketData";
import { TicketRepositoryImpl } from "@/features/ticketing/infrastructure/repositories/ticketRepositoryImpl";
import { TicketApi } from "../../../api/endpoints";

jest.mock("../../../api/endpoints");

describe("TicketRepositoryImpl", () => {
  let repository: TicketRepositoryImpl;

  beforeEach(() => {
    repository = new TicketRepositoryImpl();
    jest.clearAllMocks();
  });

  describe("getTickets", () => {
    it("should return tickets on successful API call", async () => {
      const mockResponse = {
        tickets: {
          data: [mockTicket],
          current_page: 1,
          total: 1,
          per_page: 10,
          last_page: 1,
        },
      };
      (TicketApi.getTickets as jest.Mock).mockResolvedValue(mockResponse);

      const result = await repository.getTickets({ page: 1 });
      expect(result).toEqual([mockTicket]);
      expect(TicketApi.getTickets).toHaveBeenCalledWith({ page: 1 });
    });

    it("should throw error on API failure", async () => {
      (TicketApi.getTickets as jest.Mock).mockRejectedValue(
        new Error("API Error")
      );

      await expect(repository.getTickets({})).rejects.toThrow(
        "Failed to fetch tickets"
      );
    });
  });
});
