"use client";

import { useCallback, useEffect, useState } from "react";
import { useTicketService } from "../../context/TicketServiceContext";
import { TicketListResponse, TicketResponse } from "../../types";

export const useTicketOperations = () => {
  const ticketService = useTicketService();

  // Cache state for tickets list
  const [cache, setCache] = useState<{
    data: TicketListResponse | null;
    loading: boolean;
    error: Error | null;
  }>({ data: null, loading: true, error: null });

  // Cache state for single ticket
  const [ticketCache, setTicketCache] = useState<{
    data: TicketResponse | null;
    loading: boolean;
    error: Error | null;
  }>({ data: null, loading: false, error: null });

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

  const fetchTicketById = useCallback(
    async (id: string, signal?: AbortSignal) => {
      try {
        setTicketCache((prev) => ({ ...prev, loading: true, error: null }));

        const result = await ticketService.getTicketById(id, { signal });

        setTicketCache({
          data: result,
          loading: false,
          error: null,
        });

        return result;
      } catch (err) {
        if (!signal?.aborted) {
          const error =
            err instanceof Error ? err : new Error("Failed to fetch ticket");
          setTicketCache((prev) => ({ ...prev, error, loading: false }));
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

  const useTicketById = (id: string) => {
    useEffect(() => {
      if (!id) return;

      const abortController = new AbortController();
      fetchTicketById(id, abortController.signal);
      return () => abortController.abort();
    }, [id, fetchTicketById]);

    return {
      data: ticketCache.data,
      loading: ticketCache.loading,
      error: ticketCache.error,
      refetch: () => fetchTicketById(id),
    };
  };

  return { useTickets, useTicketById };
};
