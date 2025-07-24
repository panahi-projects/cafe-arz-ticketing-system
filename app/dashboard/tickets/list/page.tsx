"use client";
import DataTable from "@/components/table/DataTable";
import { useTickets } from "@/features/ticketing/hooks/useTickets";
import { Eye } from "@/lib/icons";
import { Alert, Box, Button, CircularProgress } from "@mui/material";
import React, { useState, useMemo } from "react";

const TicketListPage = () => {
  const [page, setPage] = useState(1);
  const pageSize = 20;

  // Memoize empty filters object
  const filters = useMemo(() => ({}), []);

  const { data, loading, error } = useTickets(page, pageSize, filters);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (loading && !data) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={2}>
        <Alert severity="error">{error.message}</Alert>
      </Box>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div>
      <DataTable
        columns={[
          { id: "ticket_id", label: "شناسه" },
          {
            id: "user_name",
            label: "مشخصات کاربر",
            render: (row) => row.user?.name || "-",
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
                <Box>
                  ثبت:
                  <span>
                    {row.date?.created_at?.jalali || "15:11:21 1404/01/31"}
                  </span>
                </Box>
                <Box>
                  بروزرسانی:
                  <span>
                    {row.date?.updated_at?.jalali || "15:11:21 1404/01/31"}
                  </span>
                </Box>
              </Box>
            ),
          },
          {
            id: "status",
            label: "وضعیت",
            render: (row) => {
              const statuses = [
                "بدون پاسخ",
                "در حال بررسی",
                "پاسخ داده شده",
                "حل شده",
                "در انتظار پاسخ",
              ];
              const randomIndex = Math.floor(Math.random() * statuses.length);
              return statuses[randomIndex];
            },
          },
          {
            id: "actions",
            label: "عملیات",
            render: (row) => (
              <Box sx={{ color: "text.dark" }}>
                <Eye />
              </Box>
            ),
          },
        ]}
        rows={data.tickets.data}
        page={page}
        rowsPerPage={pageSize}
        total={data.tickets.total}
        onPageChange={handlePageChange}
        summaryItems={[
          { label: "بدون پاسخ", count: 12, color: "error" },
          { label: "در حال بررسی", count: 20, color: "warning" },
          { label: "پاسخ داده شده", count: 24, color: "success" },
        ]}
        appliedFilters={["وضعیت: بدون پاسخ"]}
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
    </div>
  );
};

export default TicketListPage;
