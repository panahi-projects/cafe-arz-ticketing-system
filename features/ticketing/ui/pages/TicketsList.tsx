"use client";
import { Alert, Box, CircularProgress } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import TicketListElement from "../components/TicketListElement";
import { useTicketOperations } from "../hooks/useTicketOperations";
import { useTicketFilterStore } from "../../infrastructure/stores/ticketFilterStore";
import { filterEmptyValues } from "@/lib/utils";
import { generateFilterObject } from "../../lib";
import { DepartmentMap } from "../../constants";

// Default values
const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 20;

const TicketsList = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    appliedFilters,
    setPage,
    setPageSize,
    setFilters,
    setAppliedFilters,
  } = useTicketFilterStore();

  // Parse all query params
  const queryParams = useMemo(() => {
    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  }, [searchParams]);

  // Set initial state from URL on first load
  useEffect(() => {
    // Set pagination
    const page = parseInt(queryParams.page || DEFAULT_PAGE.toString());
    const pageSize = parseInt(
      queryParams.pageSize || DEFAULT_PAGE_SIZE.toString()
    );
    setPage(page);
    setPageSize(pageSize);

    // Only initialize filters if none are set yet
    if (Object.keys(appliedFilters.rawFilters).length === 0) {
      // Extract filter params (excluding pagination)
      const rawFilters = Object.entries(queryParams).reduce<
        Record<string, unknown>
      >((acc, [key, value]) => {
        if (key !== "page" && key !== "pageSize") {
          acc[key] = value;
        }
        return acc;
      }, {});

      // Generate mapped filters
      const mappers = [
        {
          key: "fk_department_id",
          values: DepartmentMap,
        },
      ];
      const mappedFilters = generateFilterObject(rawFilters, mappers);

      // Set applied filters
      setAppliedFilters({
        rawFilters,
        mappedFilters,
      });
    }
  }, [queryParams]);

  // Watch for filter changes and update URL
  useEffect(() => {
    const { page, pageSize, ...currentParams } = queryParams;
    const currentFilters = Object.keys(currentParams);
    const newFilters = Object.keys(appliedFilters.rawFilters);

    // Only update URL if filters actually changed
    if (JSON.stringify(currentFilters) !== JSON.stringify(newFilters)) {
      updateUrlParams(
        parseInt(queryParams.page || DEFAULT_PAGE.toString()),
        appliedFilters.rawFilters
      );
    }
  }, [appliedFilters.rawFilters]);

  // Get current filters from store
  const filters = useMemo(() => {
    return filterEmptyValues(appliedFilters.rawFilters);
  }, [appliedFilters.rawFilters]);

  const { data, loading, error } = useTicketOperations().useTickets(
    parseInt(queryParams.page || DEFAULT_PAGE.toString()),
    parseInt(queryParams.pageSize || DEFAULT_PAGE_SIZE.toString()),
    filters
  );

  // Update form filters when data loads
  useEffect(() => {
    if (data?.filters) {
      setFilters(data.filters);
    }
  }, [data, setFilters]);

  // Update URL when pagination or filters change
  const updateUrlParams = (
    newPage: number,
    newFilters: Record<string, unknown>
  ) => {
    const params = new URLSearchParams();

    // Add pagination params
    params.set("page", newPage.toString());
    params.set(
      "pageSize",
      queryParams.pageSize || DEFAULT_PAGE_SIZE.toString()
    );

    // Add filter params
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) params.set(key, String(value));
    });

    // Update URL without page reload
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    updateUrlParams(newPage, appliedFilters.rawFilters);
  };

  const handleFilterChange = (filterName: string, value: string) => {
    const newFilters = { ...appliedFilters.rawFilters, [filterName]: value };

    // Generate mapped filters
    const mappers = [
      {
        key: "fk_department_id",
        values: DepartmentMap,
      },
    ];
    const mappedFilters = generateFilterObject(newFilters, mappers);

    setAppliedFilters({
      rawFilters: newFilters,
      mappedFilters,
    });
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
    <TicketListElement
      tickets={data.tickets.data}
      page={data.tickets.current_page}
      pageSize={data.tickets.per_page}
      total={data.tickets.total}
      handlePageChange={handlePageChange}
      onFilterChange={handleFilterChange}
      currentFilters={filters}
    />
  );
};

export default TicketsList;
