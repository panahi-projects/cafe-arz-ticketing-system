import DashboardLayout from "@/components/layout/DashboardLayout";
import { DashboardLayoutProvider } from "@/context/DashboardLayoutContext";
import { notFound } from "next/navigation";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (false) {
    notFound();
  }
  return (
    <DashboardLayoutProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </DashboardLayoutProvider>
  );
}
