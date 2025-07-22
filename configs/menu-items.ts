// lib/menuItems.ts
import type { IconKey } from "@/lib/icons";

export interface MenuItem {
  key: string;
  label: string;
  icon?: IconKey;
  children?: MenuItem[] | null;
}
export const menuItems: MenuItem[] = [
  {
    key: "dashboard",
    label: "داشبورد",
    icon: "calendar",
    children: null,
  },
  {
    key: "reports",
    label: "گزارشات",
    icon: "chart",
    children: null,
  },
  {
    key: "orders",
    label: "سفارشات",
    icon: "rocket",
    children: null,
  },
  {
    key: "cash",
    label: "نقد درآمد ارزی",
    icon: "paypal",
    children: null,
  },
  {
    key: "confirmDocs",
    label: "تایید مدارک",
    icon: "lockAlt",
    children: null,
  },
  {
    key: "tickets",
    label: "تیکت ها",
    icon: "telegramAlt",
    children: [
      { key: "ticket-list", label: "لیست تیکت ها" },
      { key: "new-ticket", label: "ثبت تیکت جدید" },
    ],
  },
];
