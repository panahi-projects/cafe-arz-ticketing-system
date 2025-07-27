import { NextResponse } from "next/server";
import { getTicketsData, setTicketsData } from "./data";
import { Ticket, TicketListResponse } from "@/features/ticketing/types";
import { FormField } from "@/types";

export async function GET(request: Request) {
  const ticketsData = getTicketsData();
  const { searchParams } = new URL(request.url);

  // Pagination
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "10");

  // Filtering - get all possible filter params
  const status = searchParams.get("status");
  const priority = searchParams.get("priority");
  const fk_department_id = searchParams.get("fk_department_id");
  const search = searchParams.get("search");
  const lock = searchParams.get("lock");
  const seen = searchParams.get("seen");
  const ticket_id = searchParams.get("ticket_id");
  const fk_user_id = searchParams.get("fk_user_id");
  const name = searchParams.get("name");
  const mobile = searchParams.get("mobile");
  const email = searchParams.get("email");
  const national_code = searchParams.get("national_code");
  const content = searchParams.get("content");
  const ip_address = searchParams.get("ip_address");

  let filteredTickets = [...ticketsData];

  // Apply filters
  if (status) {
    filteredTickets = filteredTickets.filter(
      (ticket) => ticket.status.key === status
    );
  }

  if (priority) {
    filteredTickets = filteredTickets.filter(
      (ticket) => ticket.priority.key === priority
    );
  }

  if (fk_department_id) {
    filteredTickets = filteredTickets.filter(
      (ticket) => ticket.fk_department.key.toString() === fk_department_id
    );
  }

  // Text filters with regex matching
  if (ticket_id) {
    const regex = new RegExp(ticket_id, "i");
    filteredTickets = filteredTickets.filter((ticket) =>
      regex.test(ticket.ticket_id)
    );
  }

  if (fk_user_id) {
    const regex = new RegExp(fk_user_id, "i");
    filteredTickets = filteredTickets.filter((ticket) =>
      regex.test(ticket.fk_sender_id.toString())
    );
  }

  if (name) {
    const regex = new RegExp(name, "i");
    filteredTickets = filteredTickets.filter(
      (ticket) =>
        regex.test(ticket.user?.name || "") ||
        regex.test(ticket.user?.first_name || "") ||
        regex.test(ticket.user?.last_name || "")
    );
  }

  if (mobile) {
    const regex = new RegExp(mobile, "i");
    filteredTickets = filteredTickets.filter(
      (ticket) => ticket.user && regex.test(ticket.user.mobile)
    );
  }

  if (email) {
    const regex = new RegExp(email, "i");
    filteredTickets = filteredTickets.filter(
      (ticket) =>
        ticket.user && ticket.user.email && regex.test(ticket.user.email)
    );
  }

  if (national_code) {
    const regex = new RegExp(national_code, "i");
    filteredTickets = filteredTickets.filter(
      (ticket) => ticket.user && regex.test(ticket.user.national_code)
    );
  }

  if (content) {
    const regex = new RegExp(content, "i");
    filteredTickets = filteredTickets.filter((ticket) =>
      regex.test(ticket.content)
    );
  }

  if (ip_address) {
    const regex = new RegExp(ip_address, "i");
    filteredTickets = filteredTickets.filter(
      (ticket) => ticket.user && regex.test(ticket.user.ip)
    );
  }

  // General search across multiple fields
  if (search) {
    const regex = new RegExp(search, "i");
    filteredTickets = filteredTickets.filter(
      (ticket) =>
        regex.test(ticket.title) ||
        regex.test(ticket.content) ||
        regex.test(ticket.ticket_id) ||
        (ticket.user?.name && regex.test(ticket.user.name)) ||
        (ticket.user?.mobile && regex.test(ticket.user.mobile)) ||
        (ticket.user?.email && regex.test(ticket.user.email)) ||
        (ticket.user?.national_code && regex.test(ticket.user.national_code))
    );
  }

  if (lock) {
    filteredTickets = filteredTickets.filter(
      (ticket) => ticket.lock === (lock === "true")
    );
  }

  if (seen) {
    filteredTickets = filteredTickets.filter(
      (ticket) => ticket.seen === parseInt(seen)
    );
  }

  // Pagination
  const total = filteredTickets.length;
  const last_page = Math.ceil(total / pageSize);
  const data = filteredTickets.slice((page - 1) * pageSize, page * pageSize);

  // Filter options - updated to match your requirements
  const filters: FormField[] = [
    {
      type: "text",
      name: "ticket_id",
      label: "شماره تیکت",
      value: ticket_id || "",
      options: [],
      attr: [],
    },
    {
      type: "text",
      name: "fk_user_id",
      label: "شناسه کاربر",
      value: fk_user_id || "",
      options: [],
      attr: [],
    },
    {
      type: "text",
      name: "name",
      label: "نام و نام خانوادگی",
      value: name || "",
      options: [],
      attr: [],
    },
    {
      type: "text",
      name: "mobile",
      label: "موبایل",
      value: mobile || "",
      options: [],
      attr: [],
    },
    {
      type: "text",
      name: "email",
      label: "ایمیل",
      value: email || "",
      options: [],
      attr: [],
    },
    {
      type: "text",
      name: "national_code",
      label: "کد ملی",
      value: national_code || "",
      options: [],
      attr: [],
    },
    {
      type: "text",
      name: "content",
      label: "متن",
      value: content || "",
      options: [],
      attr: [],
    },
    {
      type: "text",
      name: "ip_address",
      label: "ip",
      value: ip_address || "",
      options: [],
      attr: [],
    },
    {
      type: "select",
      name: "fk_department_id",
      label: "دپارتمان",
      value: fk_department_id || "",
      options: [
        {
          _id: "",
          value: "انتخاب کنید",
        },
        {
          _id: 1,
          value: "مدیریت",
        },
        {
          _id: 2,
          value: "پشتیبانی",
        },
        {
          _id: 3,
          value: "فروش",
        },
        {
          _id: 4,
          value: "مالی",
        },
      ],
      attr: {
        select_type: "single",
      },
    },
    {
      type: "select",
      name: "status",
      label: "وضعیت",
      value: status || "",
      options: [
        {
          _id: "",
          value: "همه",
        },
        {
          _id: "NOANSWER",
          value: "بدون پاسخ",
        },
        {
          _id: "PENDING",
          value: "در حال بررسی",
        },
        {
          _id: "ANSWERED",
          value: "پاسخ داده شده",
        },
        {
          _id: "RESOLVED",
          value: "حل شده",
        },
        {
          _id: "CLOSED",
          value: "بسته شده",
        },
        {
          _id: "WAITING_ANSWER",
          value: "در انتظار پاسخ",
        },
        {
          _id: "ASSIGNED_TO_USER",
          value: "ارجاع به من",
        },
      ],
      attr: {
        select_type: "single",
      },
    },
  ];

  const response: TicketListResponse = {
    tickets: {
      data,
      current_page: page,
      total,
      per_page: pageSize,
      last_page,
    },
    filters,
  };

  return NextResponse.json(response);
}

export async function POST(request: Request) {
  const ticketsData = getTicketsData();
  const body = await request.json();

  const newTicket: Ticket = {
    ...body,
    id: (ticketsData.length + 1).toString(),
    ticket_id: `TKT-${1000 + ticketsData.length + 1}`,
    date: {
      created_at: {
        time: new Date().toLocaleTimeString("fa-IR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        jalali: new Date().toLocaleDateString("fa-IR"),
        milady: new Date().toISOString(),
      },
      updated_at: {
        time: new Date().toLocaleTimeString("fa-IR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        jalali: new Date().toLocaleDateString("fa-IR"),
        milady: new Date().toISOString(),
      },
    },
    lock: false,
    seen: 0,
    replies: [],
  };

  setTicketsData([newTicket, ...ticketsData]);

  return NextResponse.json(newTicket, { status: 201 });
}

export async function PUT(request: Request) {
  const ticketsData = getTicketsData();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const body = await request.json();

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  const index = ticketsData.findIndex((ticket) => ticket.id === id);

  if (index === -1) {
    return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
  }

  const updatedTicket = {
    ...ticketsData[index],
    ...body,
    date: {
      ...ticketsData[index].date,
      updated_at: {
        time: new Date().toLocaleTimeString("fa-IR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        jalali: new Date().toLocaleDateString("fa-IR"),
        milady: new Date().toISOString(),
      },
    },
  };

  setTicketsData([
    ...ticketsData.slice(0, index),
    updatedTicket,
    ...ticketsData.slice(index + 1),
  ]);

  return NextResponse.json(updatedTicket);
}

export async function DELETE(request: Request) {
  const ticketsData = getTicketsData();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  const index = ticketsData.findIndex((ticket) => ticket.id === id);

  if (index === -1) {
    return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
  }

  const newData = ticketsData.filter((ticket) => ticket.id !== id);
  setTicketsData(newData);

  return NextResponse.json({ success: true });
}
