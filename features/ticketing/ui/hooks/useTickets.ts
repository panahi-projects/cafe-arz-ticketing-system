import { useState, useEffect, useMemo } from "react";
import { TicketListResponse } from "../../types";
import { TicketRepositoryImpl } from "../../infrastructure/repositories/ticketRepositoryImpl";
import { TicketService } from "../../domain/services/ticketService";

export const useTickets = (page: number, pageSize: number, filters = {}) => {
  const [data, setData] = useState<TicketListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Initialize service and repository
  const ticketService = useMemo(() => {
    const repository = new TicketRepositoryImpl();
    return new TicketService(repository);
  }, []);

  // Memoize filters to prevent unnecessary re-renders
  const memoizedFilters = useMemo(() => filters, [JSON.stringify(filters)]);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchTickets = async () => {
      try {
        setLoading(true);
        const tickets = await ticketService.getTickets({
          page,
          pageSize,
          ...memoizedFilters,
          signal: abortController.signal,
        });
        setData({
          tickets: {
            data: tickets,
            current_page: page,
            total: 100, // Need to get this from the API response
            per_page: pageSize,
            last_page: Math.ceil(100 / pageSize),
          },
          filters: [],
        });
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
  }, [page, pageSize, memoizedFilters, ticketService]);

  return { data, loading, error };
};
