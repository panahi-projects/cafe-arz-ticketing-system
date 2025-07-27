"use client";
import DataTable from "@/components/table/DataTable";
import { Eye } from "@/lib/icons";
import { AppliedFilter, Column } from "@/types";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTicketFilterStore } from "../../infrastructure/stores/ticketFilterStore";
import { Ticket, TicketListElementProps, UserInfo } from "../../types";
import TicketStatusChip from "./TicketStatusChip";
import TicketUserInfo from "./TicketUserInfo";
import { useRouter } from "next/navigation";

const TicketListElement = ({
  tickets,
  page,
  pageSize,
  total,
  handlePageChange,
}: TicketListElementProps) => {
  const router = useRouter();
  const { appliedFilters, clearAllAppliedFilters, removeAppliedFilter } =
    useTicketFilterStore();

  const [ticketFilters, setTicketFilters] = useState<AppliedFilter[]>([]);
  useEffect(() => {
    if (appliedFilters?.mappedFilters?.length) {
      setTicketFilters(
        appliedFilters.mappedFilters.filter((x) => x.items.length)
      );
    } else {
      setTicketFilters([]);
    }
  }, [appliedFilters]);

  const onRedirectToTicketDetail = (ticketId: string) => {
    router.push(`/dashboard/tickets/${ticketId}`);
  };

  const columns: Column<Ticket>[] = [
    { id: "ticket_id", label: "شناسه" },
    {
      id: "user",
      label: "مشخصات کاربر",
      render: (row) => {
        return (
          row.user && <TicketUserInfo user={row.user as Partial<UserInfo>} />
        );
      },
    },
    {
      id: "department",
      label: "دپارتمان",
      render: (row) => row.department || "-",
    },
    {
      id: "title",
      label: "عنوان تیکت",
      render: (row) => row.title || "پیام تستی",
    },
    {
      id: "date",
      label: "تاریخ",
      render: (row) => (
        <Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Typography fontSize={12} sx={{ color: "text.secondary" }}>
              ثبت:{" "}
            </Typography>
            <Typography fontSize={12} sx={{ fontWeight: "700" }}>
              {row.date?.created_at?.jalali || "15:11:21 1404/01/31"}
            </Typography>
          </Box>
          <Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Typography fontSize={12} sx={{ color: "text.secondary" }}>
                بروزرسانی:{" "}
              </Typography>
              <Typography fontSize={12} sx={{ fontWeight: "700" }}>
                {row.date?.updated_at?.jalali || "15:11:21 1404/01/31"}
              </Typography>
            </Box>
          </Box>
        </Box>
      ),
    },
    {
      id: "status",
      label: "وضعیت",
      render: (row) => {
        return <TicketStatusChip item={row.status} />;
      },
    },
    {
      id: "user_info",
      label: "عملیات",
      render: (row) => (
        <Box
          onClick={() => onRedirectToTicketDetail(row.id)}
          sx={{ color: "text.dark", p: 2, cursor: "pointer" }}
        >
          <Eye size={18} />
        </Box>
      ),
    },
  ];

  const onRemoveAllFilters = () => {
    clearAllAppliedFilters();
  };
  return (
    <Box position="relative">
      <DataTable
        columns={columns}
        rows={tickets}
        page={page}
        rowsPerPage={pageSize}
        total={total}
        onPageChange={handlePageChange}
        summaryItems={[
          { label: "بدون پاسخ", count: 12, key: "NOANSWER" },
          { label: "در حال بررسی", count: 20, key: "PENDING" },
          { label: "پاسخ داده شده", count: 24, key: "ANSWERED" },
          { label: "حل شده", count: 10, key: "RESOLVED" },
        ]}
        appliedFilters={ticketFilters}
        onRemoveFilter={(f) => removeAppliedFilter(f)}
        onRemoveAllFilters={onRemoveAllFilters}
      />
    </Box>
  );
};

export default TicketListElement;
