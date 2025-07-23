"use client";

import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Box,
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

type Props = {
  columns: Column[];
  rows: any[];
  page: number;
  total: number;
  //   onPageChange?: (page: number) => void;
  filters?: ReactNode;
  summaryItems?: { label: string; count: number; color?: any }[];
  appliedFilters?: string[];
  onRemoveFilter?: (filter: string) => void;
};

const DataTable = ({
  columns,
  rows,
  page,
  total,
  filters,
  summaryItems,
  appliedFilters,
  onRemoveFilter,
}: Props) => {
  return (
    <Paper elevation={1} sx={{ p: 2 }}>
      {/* 1. Filters */}
      <DataTableToolbar>{filters}</DataTableToolbar>

      {/* 2. Summary tags */}
      {summaryItems && <DataTableSummary items={summaryItems} />}

      {/* 3. Applied filters */}
      {appliedFilters?.length && (
        <DataTableFilterChips filters={appliedFilters} />
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
          {rows &&
            rows.map((row, i) => (
              <TableRow key={i}>
                {columns.map((col) => (
                  <TableCell key={col.id}>
                    {col.render ? col.render(row) : row[col.id]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>

      {/* 5. Pagination */}
      <Box mt={2}>
        <DataTablePagination page={page} total={total} />
      </Box>
    </Paper>
  );
};

export default DataTable;
