import { FormField } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface FormFieldAttributes {
  [key: string]: any;
}

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

interface FilterActions {
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

const initialState: FilterState = {
  page: 1,
  pageSize: 20,
  filters: [],
  appliedFilters: {
    rawFilters: {},
    mappedFilters: [],
  },
};

export const useTicketFilterStore = create<FilterState & FilterActions>()(
  persist(
    (set, get) => ({
      ...initialState,
      setPage: (page) => set({ page }),
      setPageSize: (pageSize) => set({ pageSize }),
      setFilters: (filters) => set({ filters }),
      setAppliedFilters: (appliedFilters) => set({ appliedFilters }),
      setRawFilters: (rawFilters) =>
        set({
          appliedFilters: {
            ...get().appliedFilters,
            rawFilters,
          },
        }),
      setMappedFilters: (mappedFilters) =>
        set({
          appliedFilters: {
            ...get().appliedFilters,
            mappedFilters,
          },
        }),
      removeFilter: (key) =>
        set((state) => ({
          filters: state.filters.filter((f) => f.name !== key),
          appliedFilters: {
            rawFilters: Object.fromEntries(
              Object.entries(state.appliedFilters.rawFilters).filter(
                ([k]) => k !== key
              )
            ),
            mappedFilters: state.appliedFilters.mappedFilters.filter(
              (f) => f.key !== key
            ),
          },
        })),
      removeAppliedFilter: (key) =>
        set((state) => ({
          appliedFilters: {
            rawFilters: Object.fromEntries(
              Object.entries(state.appliedFilters.rawFilters).filter(
                ([k]) => k !== key
              )
            ),
            mappedFilters: state.appliedFilters.mappedFilters.filter(
              (f) => f.key !== key
            ),
          },
        })),
      clearAllFilters: () =>
        set({
          filters: [],
          appliedFilters: {
            rawFilters: {},
            mappedFilters: [],
          },
        }),
      clearAllAppliedFilters: () =>
        set({
          appliedFilters: {
            rawFilters: {},
            mappedFilters: [],
          },
        }),
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
