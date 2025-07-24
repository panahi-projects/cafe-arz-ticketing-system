import { useState, useEffect, useMemo } from "react";
import { TicketApi } from "@/features/ticketing/api/endpoints";
import { TicketListResponse } from "@/features/ticketing/types";

export const useTickets = (page: number, pageSize: number, filters = {}) => {
  const [data, setData] = useState<TicketListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Memoize filters to prevent unnecessary re-renders
  const memoizedFilters = useMemo(() => filters, [JSON.stringify(filters)]);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchTickets = async () => {
      try {
        setLoading(true);
        const response = await TicketApi.getTickets(
          {
            page,
            pageSize,
            ...memoizedFilters,
          },
          { signal: abortController.signal }
        );
        setData(response);
      } catch (err) {
        if (!abortController.signal.aborted) {
          setError(
            err instanceof Error ? err : new Error("Failed to fetch tickets")
          );
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchTickets();

    return () => {
      abortController.abort();
    };
  }, [page, pageSize, memoizedFilters]);

  return { data, loading, error };
};
