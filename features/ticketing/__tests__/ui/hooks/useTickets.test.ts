import { renderHook, waitFor } from "@testing-library/react";
import { mockTicket } from "@/features/ticketing/__mocks__/ticketData";
import { TicketService } from "@/features/ticketing/domain/services/ticketService";
import { TicketRepositoryImpl } from "@/features/ticketing/infrastructure/repositories/ticketRepositoryImpl";
import { useTickets } from "@/features/ticketing/ui/hooks/useTickets";

jest.mock("../../../domain/services/ticketService");
jest.mock("../../../infrastructure/repositories/ticketRepositoryImpl");

describe("useTickets", () => {
  const mockRepository = {
    getTickets: jest.fn(),
  };
  const mockService = {
    getTickets: jest.fn(),
  };

  beforeEach(() => {
    (TicketRepositoryImpl as jest.Mock).mockImplementation(
      () => mockRepository
    );
    (TicketService as jest.Mock).mockImplementation(() => mockService);
    jest.clearAllMocks();
  });

  it("should fetch tickets successfully", async () => {
    mockService.getTickets.mockResolvedValue([mockTicket]);

    const { result } = renderHook(() => useTickets(1, 10));

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toEqual({
        tickets: {
          data: [mockTicket],
          current_page: 1,
          total: 100,
          per_page: 10,
          last_page: 10,
        },
        filters: [],
      });
    });
  });

  it("should handle errors", async () => {
    mockService.getTickets.mockRejectedValue(
      new Error("Failed to fetch tickets")
    );

    const { result } = renderHook(() => useTickets(1, 10));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.error?.message).toBe("Failed to fetch tickets");
    });
  });

  it("should abort fetch on unmount", async () => {
    const abortSpy = jest.spyOn(AbortController.prototype, "abort");
    mockService.getTickets.mockResolvedValue([mockTicket]);

    const { unmount } = renderHook(() => useTickets(1, 10));
    unmount();

    expect(abortSpy).toHaveBeenCalled();
  });

  it("should memoize filters", async () => {
    const filters = { status: "open" };
    mockService.getTickets.mockResolvedValue([mockTicket]);

    const { rerender } = renderHook(
      ({ filters }) => useTickets(1, 10, filters),
      {
        initialProps: { filters },
      }
    );

    rerender({ filters: { ...filters } }); // Same filters, different object

    await waitFor(() => {
      expect(mockService.getTickets).toHaveBeenCalledTimes(1);
    });
  });
});
