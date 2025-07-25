import { mockTicket } from "@/features/ticketing/__mocks__/ticketData";
import { TicketService } from "../../../domain/services/ticketService";

describe("TicketService", () => {
  let service: TicketService;
  const mockRepository = {
    getTickets: jest.fn(),
  };

  beforeEach(() => {
    service = new TicketService(mockRepository);
    jest.clearAllMocks();
  });

  describe("getTickets", () => {
    it("should return tickets from repository", async () => {
      mockRepository.getTickets.mockResolvedValue([mockTicket]);

      const result = await service.getTickets({ page: 1 });
      expect(result).toEqual([mockTicket]);
      expect(mockRepository.getTickets).toHaveBeenCalledWith({ page: 1 });
    });

    it("should propagate repository errors", async () => {
      mockRepository.getTickets.mockRejectedValue(
        new Error("Repository Error")
      );

      await expect(service.getTickets({})).rejects.toThrow("Repository Error");
    });
  });
});
