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
    icon: "calendar",
    children: null,
  },
  {
    key: "orders",
    label: "سفارشات",
    icon: "calendar",
    children: null,
  },
  {
    key: "cash",
    label: "نقد درآمد ارزی",
    icon: "calendar",
    children: null,
  },
  {
    key: "confirmDocs",
    label: "تایید مدارک",
    icon: "calendar",
    children: null,
  },
  {
    key: "tickets",
    label: "تیکت ها",
    icon: "calendar",
    children: [
      { key: "ticket-list", label: "لیست تیکت ها" },
      { key: "new-ticket", label: "ثبت تیکت جدید" },
    ],
  },
];
