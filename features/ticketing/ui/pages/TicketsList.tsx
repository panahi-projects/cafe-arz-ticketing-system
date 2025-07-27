"use client";
import { Alert, Box, CircularProgress } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import TicketListElement from "../components/TicketListElement";
import { useTicketOperations } from "../hooks/useTicketOperations";
import { useTicketFilterStore } from "../../infrastructure/stores/ticketFilterStore";

// Default values
const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 20;

const TicketsList = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setFilters } = useTicketFilterStore();

  // Get params from URL or use defaults
  const page = parseInt(searchParams.get("page") || DEFAULT_PAGE.toString());
  const pageSize = parseInt(
    searchParams.get("pageSize") || DEFAULT_PAGE_SIZE.toString()
  );

  // Parse filters from URL
  const filters = useMemo(() => {
    const params = Object.fromEntries(searchParams.entries());
    const filterKeys = Object.keys(params).filter((key) =>
      key.startsWith("filter_")
    );

    return filterKeys.reduce((acc, key) => {
      const filterName = key.replace("filter_", "");
      return { ...acc, [filterName]: params[key] };
    }, {});
  }, [searchParams]);

  const { data, loading, error } = useTicketOperations().useTickets(
    page,
    pageSize,
    filters
  );

  useEffect(() => {
    if (data?.filters) {
      console.log("Filters form is updated!");

      setFilters(data.filters);
    }
  }, [data]);

  // Update URL when pagination or filters change
  const updateUrlParams = (newPage: number, newFilters = filters) => {
    const params = new URLSearchParams();

    // Add pagination params
    params.set("page", newPage.toString());
    params.set("pageSize", pageSize.toString());

    // Add filter params
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) params.set(`filter_${key}`, String(value));
    });

    // Update URL without page reload
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const handlePageChange = (newPage: number) => {
    updateUrlParams(newPage);
  };

  // Example filter handler
  const handleFilterChange = (filterName: string, value: string) => {
    const newFilters = { ...filters, [filterName]: value };
    updateUrlParams(DEFAULT_PAGE, newFilters); // Reset to first page when filters change
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
