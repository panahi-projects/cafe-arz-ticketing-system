import {
  DateInfo,
  Department,
  Ticket,
  TicketPriority,
  TicketReply,
  TicketStatus,
  UserInfo,
} from "@/features/ticketing/types";

const departments: Department[] = [
  { key: 1, value: "فنی" },
  { key: 2, value: "پشتیبانی" },
  { key: 3, value: "مالی" },
  { key: 4, value: "فروش" },
];

const priorities: TicketPriority[] = [
  { key: "UP", value: "بالا" },
  { key: "MED", value: "متوسط" },
  { key: "LOW", value: "پایین" },
];

const statuses: TicketStatus[] = [
  { key: "ANSWERED", label: "پاسخ داده شده" },
  { key: "PENDING", label: "در حال بررسی" },
  { key: "NOANSWER", label: "بدون پاسخ" },
  { key: "RESOLVED", label: "حل شذه" },
  { key: "CLOSED", label: "بسته شذه" },
];

const getRandomDate = (start: Date, end: Date): DateInfo => {
  const date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  const jalaliDate = `${1403 + Math.floor(Math.random() * 2)}/${
    Math.floor(Math.random() * 12) + 1
  }/${Math.floor(Math.random() * 28) + 1}`;
  const hours = Math.floor(Math.random() * 24);
  const minutes = Math.floor(Math.random() * 60);
  const seconds = Math.floor(Math.random() * 60);

  return {
    time: `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`,
    jalali: `${jalaliDate} ${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`,
    milady:
      date.toISOString().split("T")[0].replace(/-/g, "/") +
      ` ${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`,
  };
};

const generateUserInfo = (id: number): UserInfo => {
  const mobile = `0917${Math.floor(1000000 + Math.random() * 9000000)}`;
  return {
    id,
    mobile,
    name: `کاربر ${id}`,
    ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(
      Math.random() * 255
    )}`,
    create: `1403/07/${Math.floor(Math.random() * 30) + 1} ${Math.floor(
      Math.random() * 24
    )}:${Math.floor(Math.random() * 60)}:${Math.floor(Math.random() * 60)}`,
    first_name: `نام ${id}`,
    last_name: `نام خانوادگی ${id}`,
    national_code: `${Math.floor(1000000000 + Math.random() * 9000000000)}`,
    phone:
      Math.random() > 0.5
        ? `021${Math.floor(1000000 + Math.random() * 9000000)}`
        : null,
    email: Math.random() > 0.5 ? `user${id}@example.com` : null,
    avatar: `https://storage.cafearz.com/wp-content/uploads/avatars/${
      Math.floor(Math.random() * 10) + 1
    }.png`,
    we_trust: Math.floor(Math.random() * 5),
    no_trust: Math.floor(Math.random() * 5),
    verifications: [
      {
        title: "موبایل",
        key: "MOBILE",
        is_confirmed: true,
        status: {
          title: "تایید",
          key: "CONFIRMED",
        },
      },
      {
        title: "ایمیل",
        key: "EMAIL",
        is_confirmed: Math.random() > 0.5,
        status: {
          title: Math.random() > 0.5 ? "تایید" : "ثبت نشده",
          key: Math.random() > 0.5 ? "CONFIRMED" : "EM",
        },
      },
    ],
    status: 1,
    legal: Math.random() > 0.8,
    tfa_type: "MOBILE",
    shahkar: {
      color: Math.random() > 0.5 ? "default" : "green",
      label: Math.random() > 0.5 ? "استعلام نشده" : "تایید شده",
      key: Math.random() > 0.5 ? "no_check" : "verified",
    },
    balance: Math.floor(Math.random() * 1000000),
    verify: {
      mobile: true,
      email: Math.random() > 0.5,
      credit: Math.random() > 0.5,
      national: Math.random() > 0.5,
      phone: Math.random() > 0.5,
    },
    level: Math.random() > 0.5 ? "E" : "P",
  };
};

const generateReply = (isAdmin: boolean): TicketReply => {
  return {
    user_info: {
      is_admin: isAdmin,
      name: isAdmin ? "ادمین" : "کاربر",
      avatar: `https://storage.cafearz.com/wp-content/uploads/avatars/${
        isAdmin ? 10 : Math.floor(Math.random() * 5) + 1
      }.png`,
    },
    content: isAdmin
      ? "پاسخ پشتیبانی به تیکت شما: لطفا اطلاعات بیشتری ارائه دهید."
      : "سوال کاربر در مورد خدمات سایت",
    date: {
      created_at: getRandomDate(new Date(2024, 0, 1), new Date()),
    },
  };
};

export const generateTickets = (count: number): Ticket[] => {
  const tickets: Ticket[] = [];

  for (let i = 1; i <= count; i++) {
    const createdDate = getRandomDate(new Date(2024, 0, 1), new Date());
    const updatedDate = getRandomDate(new Date(createdDate.milady), new Date());
    const hasReply = Math.random() > 0.3;
    const department =
      departments[Math.floor(Math.random() * departments.length)];
    const priority = priorities[Math.floor(Math.random() * priorities.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const user = generateUserInfo(Math.floor(Math.random() * 100) + 1);

    tickets.push({
      id: i.toString(),
      date: {
        created_at: createdDate,
        updated_at: updatedDate,
      },
      priority,
      fk_department: department,
      fk_order_id:
        Math.random() > 0.7 ? `ORD-${Math.floor(Math.random() * 10000)}` : null,
      fk_sender_id: user.id,
      fk_agent_id:
        Math.random() > 0.5 ? Math.floor(Math.random() * 10) + 1 : null,
      lock: Math.random() > 0.8,
      seen: Math.floor(Math.random() * 5),
      ticket_id: `TKT-${1000 + i}`,
      fk_department_id: department.key,
      title: `تیکت ${i} در مورد ${
        ["خدمات سایت", "مشکل فنی", "سوال مالی", "درخواست فروش"][
          Math.floor(Math.random() * 4)
        ]
      }`,
      status,
      user: user,
      user_info: {
        is_admin: false,
        name: user.name,
        avatar: user.avatar,
      },
      content: `<p>متن تیکت شماره ${i} در مورد ${department.value}</p>`,
      replies: hasReply ? [generateReply(Math.random() > 0.5)] : [],
    });
  }

  return tickets;
};

let _ticketsData: Ticket[] = generateTickets(100);

export const getTicketsData = () => _ticketsData;
export const setTicketsData = (newData: Ticket[]) => {
  _ticketsData = newData;
};
