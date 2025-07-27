import {
  DateInfo,
  Department,
  Ticket,
  TicketPriority,
  TicketReply,
  TicketStatus,
  TicketTitle,
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
  { key: "RESOLVED", label: "حل شده" },
  { key: "CLOSED", label: "بسته شده" },
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
      mobile: Math.random() > 0.5,
      email: Math.random() > 0.5,
      national: Math.random() > 0.5,
      phone: Math.random() > 0.5,
      ...(Math.random() > 0.8 ? { credit: true } : {}),
      ...(Math.random() > 0.8 ? { image: true } : {}),
    },
    level: (() => {
      const rand = Math.random();
      if (rand > 0.8) return "DIAMOND";
      if (rand > 0.6) return "GOLD";
      if (rand > 0.4) return "SILVER";
      return "BRONZE";
    })(),
  };
};
const ticketSpecificReplies: Record<TicketTitle, string[]> = {
  "خدمات سایت": [
    "مشکل دسترسی به خدمات سایت همچنان وجود دارد.",
    "سرعت لود صفحات سایت بسیار پایین است.",
    "چرا برخی از امکانات سایت در دسترس نیست؟",
  ],
  "مشکل فنی": [
    "خطای فنی هنگام استفاده از سیستم مشاهده می‌شود.",
    "سیستم به صورت ناگهانی ریست می‌شود.",
    "نمایشگر اطلاعات را به درستی نشان نمی‌دهد.",
  ],
  "سوال مالی": [
    "چرا تراکنش من تکمیل نشده است؟",
    "آیا امکان استرداد وجه وجود دارد؟",
    "کارمزد تراکنش‌ها افزایش یافته، دلیل چیست؟",
  ],
  "درخواست فروش": [
    "لطفاً موجودی محصول را بررسی کنید.",
    "چرا محصولی که سفارش دادم ارسال نشده؟",
    "آیا تخفیف خاصی برای خریدهای عمده دارید؟",
  ],
};

const generateReply = (
  isAdmin: boolean,
  replyIndex: number,
  ticketTitle: TicketTitle
): TicketReply => {
  const adminReplies = [
    "پاسخ پشتیبانی: لطفاً اطلاعات بیشتری درباره مشکل خود ارائه دهید تا بتوانیم بهتر کمک کنیم.",
    "پاسخ تیم فنی: مشکل گزارش شده را بررسی کردیم و در حال پیگیری هستیم.",
    "پاسخ مدیریت: درخواست شما دریافت شد و در حال بررسی است.",
    "پشتیبانی: لطفاً تصویر یا اسکرین شات از مشکل ارسال نمایید.",
    "تیم مالی: تراکنش شما بررسی شد و مشکل از طرف بانک بوده است.",
    "پشتیبانی فنی: مشکل گزارش شده برطرف شد. لطفاً مجدداً بررسی کنید.",
    "مدیریت: درخواست شما تأیید شد و در حال پردازش است.",
    "پشتیبانی: برای حل این مشکل لطفاً مراحل راهنمای کاربری را دنبال کنید.",
  ];

  const userReplies = [
    "ممنون از پاسخ شما. مشکل همچنان ادامه دارد.",
    "لطفاً سریعتر مشکل من را بررسی کنید، واقعاً ضروری است!",
    "من تمام اطلاعات خواسته شده را ارسال کردم.",
    "آیا راه حل دیگری برای این مشکل وجود دارد؟",
    "ممنون از کمکتون، مشکل من حل شد.",
    "من هنوز پاسخ قانع کننده‌ای دریافت نکرده‌ام.",
    "آیا می‌توانید جزئیات بیشتری در مورد راه حل ارائه دهید؟",
    "این پاسخ به سوال من مرتبط نیست، لطفاً دقیق‌تر بررسی کنید.",
  ];

  // 30% chance to get a ticket-specific reply
  const useSpecificReply = Math.random() < 0.3;
  let content = "";

  if (isAdmin) {
    if (useSpecificReply) {
      const specificReplies = ticketSpecificReplies[ticketTitle];
      content =
        specificReplies[Math.floor(Math.random() * specificReplies.length)];
    } else {
      content = adminReplies[Math.floor(Math.random() * adminReplies.length)];
    }
  } else {
    if (useSpecificReply) {
      const specificReplies = ticketSpecificReplies[ticketTitle];
      content =
        specificReplies[Math.floor(Math.random() * specificReplies.length)];
    } else {
      content = userReplies[Math.floor(Math.random() * userReplies.length)];
    }
  }

  return {
    user_info: {
      is_admin: isAdmin,
      name: isAdmin ? `پشتیبان ${Math.floor(Math.random() * 5) + 1}` : "کاربر",
      avatar: `https://storage.cafearz.com/wp-content/uploads/avatars/${
        isAdmin
          ? Math.floor(Math.random() * 5) + 6
          : Math.floor(Math.random() * 5) + 1
      }.png`,
    },
    content,
    date: {
      created_at: getRandomDate(new Date(2024, 0, 1), new Date()),
    },
  };
};

export const generateTickets = (count: number): Ticket[] => {
  const tickets: Ticket[] = [];
  const ticketTitles: TicketTitle[] = [
    "خدمات سایت",
    "مشکل فنی",
    "سوال مالی",
    "درخواست فروش",
  ];

  for (let i = 1; i <= count; i++) {
    const createdDate = getRandomDate(new Date(2024, 0, 1), new Date());
    const updatedDate = getRandomDate(new Date(createdDate.milady), new Date());
    const department =
      departments[Math.floor(Math.random() * departments.length)];
    const priority = priorities[Math.floor(Math.random() * priorities.length)];
    const ticketTitle =
      ticketTitles[Math.floor(Math.random() * ticketTitles.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const user = generateUserInfo(Math.floor(Math.random() * 100) + 1);

    // Generate between 0 to 3 replies
    const replyCount = Math.floor(Math.random() * 4); // 0, 1, 2, or 3
    const replies: TicketReply[] = [];

    // First reply is always from user (the ticket creator)
    if (replyCount > 0) {
      replies.push(generateReply(false, 0, ticketTitle));
    }

    // Subsequent replies alternate between admin and user
    for (let j = 1; j < replyCount; j++) {
      replies.push(generateReply(j % 2 === 1, j, ticketTitle));
    }

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
      title: `تیکت ${i} در مورد ${ticketTitle}`,
      status,
      user: user,
      user_info: {
        is_admin: false,
        name: user.name,
        avatar: user.avatar,
      },
      content: `<p>متن تیکت شماره ${i} در مورد ${ticketTitle}</p>`,
      replies,
    });
  }

  return tickets;
};

let _ticketsData: Ticket[] = generateTickets(100);

export const getTicketsData = async (): Promise<Ticket[]> => {
  return _ticketsData;
};
export const setTicketsData = async (newData: Ticket[]): Promise<void> => {
  _ticketsData = newData;
};
