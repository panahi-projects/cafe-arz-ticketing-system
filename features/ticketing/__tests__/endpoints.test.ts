import { mockTicket } from "../__mocks__/ticketData";
import { ticketingApi } from "../api/api-factory";
import { TicketApi } from "../api/endpoints";
import { TicketListResponse } from "../types";

jest.mock("../api/api-factory", () => ({
  ticketingApi: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));

const mockTicketResponse: TicketListResponse = {
  tickets: {
    data: [mockTicket],
    current_page: 1,
    total: 1,
    per_page: 10,
    last_page: 1,
  },
  filters: [],
};

describe("TicketAPI", () => {
  it("should fetch tickets with optional params", async () => {
    (ticketingApi.get as jest.Mock).mockResolvedValue(mockTicketResponse);
    const params = { status: "open" };

    const result = await TicketApi.getTickets(params);

    expect(ticketingApi.get).toHaveBeenCalledWith("/tickets", { params });
    expect(result).toEqual(mockTicketResponse);
  });

  it("should fetch tickets without params", async () => {
    (ticketingApi.get as jest.Mock).mockResolvedValue(mockTicketResponse);

    const result = await TicketApi.getTickets();

    expect(ticketingApi.get).toHaveBeenCalledWith("/tickets", {
      params: undefined,
    });
    expect(result).toEqual(mockTicketResponse);
  });

  it("should support abort signal", async () => {
    (ticketingApi.get as jest.Mock).mockResolvedValue(mockTicketResponse);
    const abortController = new AbortController();

    await TicketApi.getTickets({}, { signal: abortController.signal });

    expect(ticketingApi.get).toHaveBeenCalledWith("/tickets", {
      params: {},
      signal: abortController.signal,
    });
  });
});
