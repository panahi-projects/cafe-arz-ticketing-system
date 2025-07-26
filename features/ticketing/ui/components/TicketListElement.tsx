import DataTable, { Column } from "@/components/table/DataTable";
import { Box, Button, Typography } from "@mui/material";
import { Ticket, TicketStatus, UserInfo } from "../../types";
import TicketUserInfo from "./TicketUserInfo";
import TicketStatusChip from "./TicketStatusChip";
import { Eye } from "@/lib/icons";

interface TicketListElementProps {
  tickets: Ticket[];
  page: number;
  pageSize: number;
  total: number;
  handlePageChange: (newPage: number) => void;
  onFilterChange: (filterName: string, value: string) => void;
  loading?: boolean;
  currentFilters?: {};
}

const TicketListElement = ({
  tickets,
  page,
  pageSize,
  total,
  handlePageChange,
  onFilterChange,
}: TicketListElementProps) => {
  const columns: Column<Ticket>[] = [
    { id: "ticket_id", label: "شناسه" },
    {
      id: "user",
      label: "مشخصات کاربر",
      render: (row) => {
        return <TicketUserInfo user={row.user as Partial<UserInfo>} />;
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
      render: () => {
        //Generate sample value to see different status chips,
        //! It should be changed whenever real data provided. e.g: row.status
        const statuses: TicketStatus[] = [
          {
            key: "ANSWERED",
            label: "پاسخ داده شده",
          },
          {
            key: "NOANSWER",
            label: "بدون پاسخ",
          },
          {
            key: "PENDING",
            label: "در حال بررسی",
          },
          {
            key: "RESOLVED",
            label: "حل شده",
          },
        ];
        const randomIndex = Math.floor(Math.random() * statuses.length);
        return <TicketStatusChip item={statuses[randomIndex] || ""} />;
      },
    },
    {
      id: "user_info",
      label: "عملیات",
      render: (row) => (
        <Box sx={{ color: "text.dark" }}>
          <Eye size={18} />
        </Box>
      ),
    },
  ];
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
        appliedFilters={[
          {
            key: "status",
            label: "وضعیت",
            items: [
              {
                key: "NOANSWER",
                label: "NOANSWER",
              },
              {
                key: "PENDING",
                label: "PENDING",
              },
            ],
          },
          {
            key: "name",
            label: "نام و نام خانوادگی",
            items: [
              {
                key: "TEST",
                label: "تست",
              },
            ],
          },
        ]}
        onRemoveFilter={(f) => console.log("remove filter", f)}
        filters={
          <>
            <Button size="small" variant="outlined">
              پاسخ داده نشده
            </Button>
            <Button size="small" variant="outlined">
              در حال بررسی
            </Button>
          </>
        }
      />
    </Box>
  );
};

export default TicketListElement;
