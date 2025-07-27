import { StatusType, TicketStatus } from "@/features/ticketing/types";
import { AppliedFilter, AppliedFilterItem } from "./storeTypes";
import { ReactNode } from "react";

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

export interface DataTableProps<T> {
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
}

export interface DataTableFilterChipsProps {
  filters: AppliedFilter[];
  onRemove?: (filter: string) => void;
  onRemoveAll?: () => void;
}

export interface FilterChipProps {
  id: string;
  items: AppliedFilterItem[];
  onRemove?: (filter: string) => void;
}

export interface DataTablePaginationProps {
  page: number;
  total: number;
  rowsPerPage?: number;
  onPageChange: (page: number) => void;
}

export interface DataTableToolbarProps {
  children?: ReactNode;
}

export interface DataTableSummaryChipProps {
  rawText: string;
  status: TicketStatus;
}
