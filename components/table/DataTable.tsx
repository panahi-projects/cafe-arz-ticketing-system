"use client";

import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { ReactNode } from "react";
import DataTableFilterChips from "./DataTableFilterChips";
import DataTablePagination from "./DataTablePagination";
import DataTableSummary from "./DataTableSummary";
import DataTableToolbar from "./DataTableToolbar";

export type Column<T> = {
  id: keyof T & string;
  label: string;
  render?: (row: T) => ReactNode;
};

export type SummaryItem = {
  label: string;
  count: number;
  color?: "default" | "primary" | "secondary" | "error" | "warning" | "success"; // or use: `SystemStyleObject` or theme-based type if you're using strict MUI typings
};

type Props<T> = {
  columns: Column<T>[];
  rows: T[];
  page: number;
  total: number;
  onPageChange?: (page: number) => void;
  filters?: ReactNode;
  summaryItems?: SummaryItem[];
  appliedFilters?: string[];
  rowsPerPage?: number;
  onRemoveFilter?: (filter: string) => void;
  loading?: boolean;
};

const DataTable = <T,>({
  columns,
  rows,
  page,
  total,
  onPageChange,
  filters,
  summaryItems,
  appliedFilters,
  rowsPerPage,
  onRemoveFilter,
  loading = false,
}: Props<T>) => {
  return (
    <Paper elevation={1} sx={{ borderRadius: 4 }}>
      {/* 1. Filters */}
      <Box sx={{ p: 2 }}>
        <DataTableToolbar>{filters}</DataTableToolbar>
      </Box>

      {/* 2. Summary tags */}
      <Box sx={{ p: 2 }}>
        {summaryItems && <DataTableSummary items={summaryItems} />}
      </Box>

      {/* 3. Applied filters */}
      <Box sx={{ p: 2 }}>
        {appliedFilters?.length && (
          <DataTableFilterChips
            filters={appliedFilters}
            onRemove={onRemoveFilter}
          />
        )}
      </Box>

      {/* 4. Table */}
      <Table
        sx={{
          "& .MuiTableCell-root": {
            textAlign: "right", // Right-align all table cells
          },
          "& .MuiTableHead-root .MuiTableCell-root": {
            color: "text.secondary",
            fontSize: "12px",
            pb: 0.5,
            border: 0,
          },
        }}
      >
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={col.id}>{col.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={columns.length} align="center">
                <CircularProgress />
              </TableCell>
            </TableRow>
          ) : rows && rows.length > 0 ? (
            rows.map((row, i) => (
              <TableRow
                key={i}
                sx={{
                  backgroundColor:
                    i % 2 === 1 ? "background.paper" : "background.default",
                  "&:hover": {
                    backgroundColor: "gray.200", // Darker gray on hover
                  },
                }}
              >
                {columns.map((col) => (
                  <TableCell
                    key={col.id}
                    sx={{ border: 0, fontWeight: "600", fontSize: 12 }}
                  >
                    {col.render ? col.render(row) : String(row[col.id])}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} align="center">
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* 5. Pagination */}
      {total > (rowsPerPage || 10) && (
        <Box mt={2}>
          <DataTablePagination
            page={page}
            total={total}
            rowsPerPage={rowsPerPage}
            onPageChange={onPageChange as (page: number) => void}
          />
        </Box>
      )}
    </Paper>
  );
};

export default DataTable;
