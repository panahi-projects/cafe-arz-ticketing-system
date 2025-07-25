import { mockTicket } from "../__mocks__/ticketData";
import { ticketingApi } from "../api/api-factory";
import { TicketApi } from "../api/endpoints";
import { TicketResponse } from "../types";

jest.mock("../api/api-factory", () => ({
  ticketingApi: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));

const mockTicketResponse: TicketResponse = {
  ticket: mockTicket,
};

describe("TicketAPI", () => {
  it("should fetch tickets with optional params", async () => {
    const mockResponse = [mockTicketResponse];
    (ticketingApi.get as jest.Mock).mockResolvedValue(mockResponse);
    const params = { status: "open" };

    const result = await TicketApi.getTickets(params);

    expect(ticketingApi.get).toHaveBeenCalledWith("/test-api", { params });
    expect(result).toEqual(mockResponse);
  });

  it("should fetch tickets without params", async () => {
    const mockResponse = [mockTicketResponse];
    (ticketingApi.get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await TicketApi.getTickets();

    expect(ticketingApi.get).toHaveBeenCalledWith("/test-api", {
      params: undefined,
    });
    expect(result).toEqual(mockResponse);
  });
});
