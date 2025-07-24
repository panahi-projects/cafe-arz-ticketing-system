"use client";

import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Box,
  CircularProgress,
} from "@mui/material";
import { ReactNode } from "react";
import DataTablePagination from "./DataTablePagination";
import DataTableToolbar from "./DataTableToolbar";
import DataTableSummary from "./DataTableSummary";
import DataTableFilterChips from "./DataTableFilterChips";

type Column = {
  id: string;
  label: string;
  render?: (row: any) => ReactNode;
};

type Props<T = any> = {
  columns: Column[];
  rows: T[];
  page: number;
  total: number;
  onPageChange?: (page: number) => void;
  filters?: ReactNode;
  summaryItems?: { label: string; count: number; color?: any }[];
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
    <Paper elevation={1} sx={{ p: 2 }}>
      {/* 1. Filters */}
      <DataTableToolbar>{filters}</DataTableToolbar>

      {/* 2. Summary tags */}
      {summaryItems && <DataTableSummary items={summaryItems} />}

      {/* 3. Applied filters */}
      {appliedFilters?.length && (
        <DataTableFilterChips
          filters={appliedFilters}
          onRemove={onRemoveFilter}
        />
      )}

      {/* 4. Table */}
      <Table>
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
              <TableRow key={i}>
                {columns.map((col) => (
                  <TableCell key={col.id}>
                    {col.render ? col.render(row) : (row as any)[col.id]}
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
