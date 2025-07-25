import { useCallback, useState, useEffect, useMemo } from "react";
import { TicketListResponse } from "../../types";
import { useTicketService } from "../../context/TicketServiceContext";

export const useTickets = (page: number, pageSize: number, filters = {}) => {
  const ticketService = useTicketService();
  const [data, setData] = useState<TicketListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const memoizedFilters = useMemo(() => filters, [JSON.stringify(filters)]);

  const fetchTickets = useCallback(
    async (signal?: AbortSignal) => {
      try {
        setLoading(true);
        const result = await ticketService.getTickets(
          { page, pageSize, ...memoizedFilters },
          { signal }
        );

        setData({
          tickets: {
            data: result.tickets.data,
            current_page: page,
            total: 100, // Should come from API
            per_page: pageSize,
            last_page: Math.ceil(100 / pageSize),
          },
          filters: [],
        });
      } catch (err) {
        if (!signal?.aborted) {
          setError(
            err instanceof Error ? err : new Error("Failed to fetch tickets")
          );
        }
      } finally {
        if (!signal?.aborted) {
          setLoading(false);
        }
      }
    },
    [ticketService, page, pageSize, memoizedFilters]
  );

  useEffect(() => {
    const abortController = new AbortController();
    fetchTickets(abortController.signal);
    return () => abortController.abort();
  }, [fetchTickets]);

  return { data, loading, error };
};
