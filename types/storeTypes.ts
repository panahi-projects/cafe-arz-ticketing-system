import { ReactNode } from "react";
import { FormField } from "./formTypes";
import { TicketService } from "@/features/ticketing/domain/services/ticketService";

export interface AppliedFilterItem {
  key: string;
  label: string | number;
}

export interface AppliedFilter {
  key: string;
  label: string;
  items: AppliedFilterItem[];
}

export interface FilterState {
  page: number;
  pageSize: number;
  filters: FormField[];
  appliedFilters: {
    rawFilters: Record<string, unknown>;
    mappedFilters: AppliedFilter[];
  };
}

export interface FilterActions {
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setFilters: (filters: FormField[]) => void;
  setAppliedFilters: (appliedFilters: {
    rawFilters: Record<string, unknown>;
    mappedFilters: AppliedFilter[];
  }) => void;
  setRawFilters: (rawFilters: Record<string, unknown>) => void;
  setMappedFilters: (mappedFilters: AppliedFilter[]) => void;
  removeFilter: (key: string) => void;
  removeAppliedFilter: (key: string) => void;
  clearAllFilters: () => void;
  clearAllAppliedFilters: () => void;
  reset: () => void;
}

export interface TicketServices {
  ticketService: TicketService;
}

export interface TicketServiceProviderProps {
  children: ReactNode;
}
