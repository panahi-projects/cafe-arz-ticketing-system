import { useTicketService } from "@/features/ticketing/context/TicketServiceContext";
import { useTicketOperations } from "@/features/ticketing/ui/hooks/useTicketOperations";
import { renderHook } from "@testing-library/react";

// Mock the context
jest.mock("../../../context/TicketServiceContext");

const mockTicketService = {
  getTickets: jest.fn(),
};

beforeEach(() => {
  (useTicketService as jest.Mock).mockReturnValue(mockTicketService);
  mockTicketService.getTickets.mockReset();
});

describe("useTicketOperations", () => {
  it("should initialize with loading state", () => {
    const { result } = renderHook(() => useTicketOperations());

    const { useTickets } = result.current;

    const { result: ticketsResult } = renderHook(() => useTickets(1, 20));

    expect(ticketsResult.current.loading).toBe(true);
    expect(ticketsResult.current.data).toBeNull();
    expect(ticketsResult.current.error).toBeNull();
  });
});
