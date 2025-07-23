import { ticketingApi } from "../api/api-factory";
import { TicketApi } from "../api/endpoints";
import {
  Department,
  Ticket,
  TicketPriority,
  TicketReply,
  TicketResponse,
} from "../types";

jest.mock("../api/api-factory", () => ({
  ticketingApi: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));

const mockTicket: Ticket = {
  id: "1001",
  date: {
    created_at: {
      time: "15:45",
      jalali: "1404/02/28 15:45:06",
      milady: "2025/05/18 15:45:06",
    },
    updated_at: {
      time: "15:55",
      jalali: "1404/03/06 15:55:54",
      milady: "2025/05/27 15:55:54",
    },
  },
  priority: { key: "UP", value: "بالا" },
  fk_department: { key: 2, value: "پشتیبانی" },
  fk_sender_id: 13,
  title: "خدمات سایت",
  status: { key: "ANSWERED", label: "پاسخ داده شده" },
  lock: true,
  seen: 0,
  ticket_id: "1001",
  fk_department_id: 2,
  user: null,
  user_info: {
    is_admin: false,
    name: "test",
    avatar: "https://storage.cafearz.com/wp-content/uploads/avatars/2.png",
  },
  content: "sample text",
  replies: [],
};

const mockTicketResponse: TicketResponse = {
  ticket: mockTicket,
};

const mockReply: TicketReply = {
  user_info: { is_admin: true, name: "Support", avatar: "avatar.jpg" },
  content: "Test reply",
  date: {
    created_at: {
      time: "16:00",
      jalali: "1404/03/06 16:00:00",
      milady: "2025/05/27 16:00:00",
    },
  },
};

const mockDepartment: Department = { key: 1, value: "Sales" };
const mockPriority: TicketPriority = { key: "HIGH", value: "High" };

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
