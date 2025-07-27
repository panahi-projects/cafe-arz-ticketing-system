"use client";

import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { ReactNode } from "react";
import DataTableFilterChips from "./DataTableFilterChips";
import DataTablePagination from "./DataTablePagination";
import DataTableSummary from "./DataTableSummary";
import DataTableToolbar from "./DataTableToolbar";
import { StatusType } from "@/features/ticketing/types";

export type Column<T> = {
  id: keyof T & string;
  label: string;
  render?: (row: T) => ReactNode;
};

export type SummaryItem = {
  key?: StatusType;
  label: string;
  count: number;
};
export type FiletItem = {
  key: string;
  label?: string | number;
};
export type AppliedFilter = {
  key: string;
  label: string;
  items: FiletItem[];
};

type Props<T> = {
  columns: Column<T>[];
  rows: T[];
  page: number;
  total: number;
  onPageChange?: (page: number) => void;
  filters?: ReactNode;
  summaryItems?: SummaryItem[];
  appliedFilters?: AppliedFilter[];
  rowsPerPage?: number;
  onRemoveFilter?: (filter: string) => void;
  onRemoveAllFilters?: () => void;
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
  onRemoveAllFilters,
  loading = false,
}: Props<T>) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box position={"relative"} sx={{ overflow: "hidden" }}>
      <Paper elevation={1} sx={{ borderRadius: 4, overflow: "hidden" }}>
        {/* 1. Filters */}
        <Box sx={{ p: { xs: 1, sm: 2 }, pb: { xs: 1, sm: 0.5 } }}>
          <DataTableToolbar>{total}</DataTableToolbar>
        </Box>

        {/* 2. Summary tags */}
        {summaryItems && (
          <Box
            sx={{
              px: { xs: 1, sm: 2 },
              pb: { xs: 1, sm: 1 },
              borderBottom: "2px solid",
              borderColor: "divider",
            }}
          >
            <DataTableSummary items={summaryItems} />
          </Box>
        )}

        {/* 3. Applied filters */}
        {appliedFilters?.length ? (
          <Box sx={{ p: { xs: 1, sm: 2 }, pt: 0 }}>
            <DataTableFilterChips
              filters={appliedFilters}
              onRemove={onRemoveFilter}
              onRemoveAll={onRemoveAllFilters}
            />
          </Box>
        ) : null}

        {/* 4. Table */}
        <TableContainer
          sx={{
            maxWidth: "100%",
            overflowX: "auto",
            "& .MuiTableCell-root": {
              textAlign: "right",
              py: { xs: 2, sm: 4 },
            },
          }}
        >
          <Table
            sx={{
              minWidth: isSmallScreen ? "800px" : "100%",
              "& .MuiTableCell-root": {
                textAlign: "right",
                py: { xs: 1, sm: 4 },
                px: { xs: 0.5, sm: 2 },
              },
              "& .MuiTableHead-root .MuiTableCell-root": {
                color: "text.secondary",
                fontSize: { xs: "10px", sm: "12px" },
                pb: 0.5,
                border: 0,
                whiteSpace: "nowrap",
              },
              "& .MuiTableBody-root .MuiTableCell-root": {
                fontSize: { xs: "11px", sm: "12px" },
                fontWeight: "600",
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
                    <CircularProgress size={isSmallScreen ? 20 : 24} />
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
                        backgroundColor: "gray.200",
                      },
                      "&:last-of-type": {
                        borderBottom: "1px solid",
                        borderColor: "divider",
                      },
                    }}
                  >
                    {columns.map((col) => (
                      <TableCell key={col.id} sx={{ border: 0 }}>
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
        </TableContainer>

        {/* 5. Pagination */}
        {total > (rowsPerPage || 10) && (
          <Box sx={{ p: { xs: 1, sm: 2 }, pt: 0 }}>
            <DataTablePagination
              page={page}
              total={total}
              rowsPerPage={rowsPerPage}
              onPageChange={onPageChange as (page: number) => void}
            />
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default DataTable;
