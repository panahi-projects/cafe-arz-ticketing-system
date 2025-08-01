"use client";
import { useLayoutContext } from "@/context/DashboardLayoutContext";
import TicketsList from "@/features/ticketing/ui/pages/TicketsList";
import { Plus } from "@/lib/icons";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const TicketListPage = () => {
  const router = useRouter();
  const { setLayoutConfig } = useLayoutContext();

  useEffect(() => {
    setLayoutConfig({
      headerAction: {
        label: "تیکت جدید",
        icon: <Plus opacity={1} />,
        onClick: () => router.push("/dashboard/tickets/new"),
      },
    });

    return () => setLayoutConfig({});
  }, [setLayoutConfig, router]);

  return <TicketsList />;
};

export default TicketListPage;
