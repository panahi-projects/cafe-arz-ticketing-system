import { renderHook, waitFor } from "@testing-library/react";
import { mockTicket } from "@/features/ticketing/__mocks__/ticketData";
import { TicketService } from "@/features/ticketing/domain/services/ticketService";
import { useTickets } from "@/features/ticketing/ui/hooks/useTickets";

jest.mock("../../../domain/services/ticketService");

describe("useTickets", () => {
  const mockService = {
    getTickets: jest.fn(),
  };

  beforeEach(() => {
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
    mockService.getTickets.mockRejectedValue(new Error("Fetch Error"));

    const { result } = renderHook(() => useTickets(1, 10));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toEqual(new Error("Fetch Error"));
    });
  });

  it("should abort fetch on unmount", async () => {
    const abortSignal = { aborted: false };
    mockService.getTickets.mockImplementation(async ({ signal }) => {
      signal.addEventListener("abort", () => {
        abortSignal.aborted = true;
      });
      return [mockTicket];
    });

    const { result, unmount } = renderHook(() => useTickets(1, 10));
    unmount();

    await waitFor(() => {
      expect(abortSignal.aborted).toBe(true);
    });
  });
});
