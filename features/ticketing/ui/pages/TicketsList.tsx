"use client";
import DataTable, { Column } from "@/components/table/DataTable";
import { useTickets } from "@/features/ticketing/ui/hooks/useTickets";
import { Eye } from "@/lib/icons";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import React, { useState, useMemo } from "react";
import TicketStatusChip from "../components/TicketStatusChip";
import { Ticket, TicketStatus, UserInfo } from "../../types";
import TicketUserInfo from "../components/TicketUserInfo";

const TicketsList = () => {
  const [page, setPage] = useState(1);
  const pageSize = 20;
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
    <Box position="relative">
      <DataTable
        columns={columns}
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
    </Box>
  );
};

export default TicketsList;
