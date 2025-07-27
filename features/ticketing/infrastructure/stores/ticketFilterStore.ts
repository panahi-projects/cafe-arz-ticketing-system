import { FormField } from "@/components/GenericForm";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface FormFieldAttributes {
  [key: string]: any;
}

export interface AppliedFilterItem {
  key: string;
  label: string | number;
}

interface AppliedFilter {
  key: string;
  label: string;
  items: AppliedFilterItem[];
}

interface FilterState {
  page: number;
  pageSize: number;
  filters: FormField[];
  appliedFilters: AppliedFilter[];
}

interface FilterActions {
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setFilters: (filters: FormField[]) => void;
  setAppliedFilters: (filters: AppliedFilter[]) => void;
  removeFilter: (key: string) => void;
  removeAppliedFilter: (key: string) => void;
  clearAllFilters: () => void;
  clearAllAppliedFilters: () => void;
  reset: () => void;
}

const initialState: FilterState = {
  page: 1,
  pageSize: 20,
  filters: [],
  appliedFilters: [],
};

export const useTicketFilterStore = create<FilterState & FilterActions>()(
  persist(
    (set) => ({
      ...initialState,
      setPage: (page) => set({ page }),
      setPageSize: (pageSize) => set({ pageSize }),
      setFilters: (filters) => set({ filters }),
      setAppliedFilters: (appliedFilters) => set({ appliedFilters }),
      removeFilter: (key) =>
        set((state) => ({
          filters: state.filters.filter((f) => f.name !== key),
          appliedFilters: state.appliedFilters.filter((f) => f.key !== key),
        })),
      removeAppliedFilter: (key) =>
        set((state) => ({
          appliedFilters: state.appliedFilters.filter((f) => f.key !== key),
        })),
      clearAllFilters: () => set({ filters: [], appliedFilters: [] }),
      clearAllAppliedFilters: () => set({ appliedFilters: [] }),
      reset: () => set(initialState),
    }),
    {
      name: "ticket-filters",
      partialize: (state) => ({
        page: state.page,
        pageSize: state.pageSize,
        filters: state.filters,
        appliedFilters: state.appliedFilters,
      }),
    }
  )
);
