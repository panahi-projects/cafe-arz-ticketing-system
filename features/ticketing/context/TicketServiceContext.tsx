"use client";
import React, { createContext, useContext, useMemo, ReactNode } from "react";
import { TicketRepositoryImpl } from "../infrastructure/repositories/ticketRepositoryImpl";
import { TicketService } from "../domain/services/ticketService";

interface TicketServices {
  ticketService: TicketService;
}

const TicketServiceContext = createContext<TicketServices | null>(null);

interface TicketServiceProviderProps {
  children: ReactNode;
}

export const TicketServiceProvider = ({
  children,
}: TicketServiceProviderProps) => {
  const services = useMemo(() => {
    const repository = new TicketRepositoryImpl();
    return {
      ticketService: new TicketService(repository),
    };
  }, []);

  return (
    <TicketServiceContext.Provider value={services}>
      {children}
    </TicketServiceContext.Provider>
  );
};

export const useTicketServices = () => {
  const context = useContext(TicketServiceContext);
  if (!context) {
    throw new Error(
      "useTicketServices must be used within a TicketServiceProvider"
    );
  }
  return context;
};

// Convenience hook for individual services
export const useTicketService = () => useTicketServices().ticketService;
