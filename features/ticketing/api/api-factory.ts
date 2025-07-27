import { apiFactory } from "@/lib/api-factory";

export const ticketingApi = apiFactory({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api",
});
/**
 * The Test API of CafeArz was not sufficient
 * and I decided to re-make local CRUD APIs for the ticketing system.
 * Deprecated: https://api2.cafearz.com/
 * New: http://localhost:3000/api
 */
