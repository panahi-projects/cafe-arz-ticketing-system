"use client";

import { useCallback, useEffect, useState } from "react";
import { useTicketService } from "../../context/TicketServiceContext";
import { TicketListResponse } from "../../types";

export const useTicketOperations = () => {
  const ticketService = useTicketService();

  // Cache state
  const [cache, setCache] = useState<{
    data: TicketListResponse | null;
    loading: boolean;
    error: Error | null;
  }>({ data: null, loading: true, error: null });

  const fetchTickets = useCallback(
    async (
      page: number,
      pageSize: number,
      filters = {},
      signal?: AbortSignal
    ) => {
      try {
        setCache((prev) => ({ ...prev, loading: true, error: null }));

        const result = await ticketService.getTickets(
          { page, pageSize, ...filters },
          { signal }
        );

        const responseData = {
          tickets: {
            data: result?.tickets?.data || [],
            current_page: page,
            total: result?.tickets?.total || 100,
            per_page: pageSize,
            last_page: Math.ceil((result?.tickets?.total || 100) / pageSize),
          },
          filters: result?.filters || [],
        };

        setCache({
          data: responseData,
          loading: false,
          error: null,
        });

        return responseData;
      } catch (err) {
        if (!signal?.aborted) {
          const error =
            err instanceof Error ? err : new Error("Failed to fetch tickets");
          setCache((prev) => ({ ...prev, error, loading: false }));
          throw error;
        }
      }
    },
    [ticketService]
  );

  const useTickets = (page: number, pageSize: number, filters = {}) => {
    useEffect(() => {
      const abortController = new AbortController();
      fetchTickets(page, pageSize, filters, abortController.signal);
      return () => abortController.abort();
    }, [page, pageSize, JSON.stringify(filters)]);

    return {
      data: cache.data,
      loading: cache.loading,
      error: cache.error,
      refetch: () => fetchTickets(page, pageSize, filters),
    };
  };

  return { useTickets };
};
