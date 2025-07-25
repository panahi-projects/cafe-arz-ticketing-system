import { MenuItem } from "@/types";

export const menuItems: MenuItem[] = [
  {
    key: "dashboard",
    label: "داشبورد",
    icon: "calendar",
    children: null,
    path: "/dashboard",
  },
  {
    key: "reports",
    label: "گزارشات",
    icon: "chart",
    children: null,
    path: "/dashboard/reports",
  },
  {
    key: "orders",
    label: "سفارشات",
    icon: "rocket",
    children: null,
    path: "/dashboard/orders",
  },
  {
    key: "cash",
    label: "نقد درآمد ارزی",
    icon: "paypal",
    children: null,
    path: "/dashboard/cash",
  },
  {
    key: "confirmDocs",
    label: "تایید مدارک",
    icon: "lockAlt",
    children: null,
    path: "/dashboard/confirm-documents",
  },
  {
    key: "tickets",
    label: "تیکت ها",
    icon: "telegramAlt",
    path: "/dashboard/tickets",
    showInBreadcrumbs: false,
    children: [
      {
        key: "ticket-list",
        label: "لیست تیکت ها",
        path: "/dashboard/tickets/list",
      },
      {
        key: "new-ticket",
        label: "ثبت تیکت جدید",
        path: "/dashboard/tickets/new",
      },
    ],
  },
];
