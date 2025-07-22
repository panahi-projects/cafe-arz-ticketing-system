import DashboardLayout from "@/components/layout/DashboardLayout";
import { notFound } from "next/navigation";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (false) {
    notFound();
  }
  return <DashboardLayout>{children}</DashboardLayout>;
}
