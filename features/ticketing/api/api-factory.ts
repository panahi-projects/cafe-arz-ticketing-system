import { apiFactory } from "@/lib/api-factory";

// Determine the base URL based on environment
const getBaseUrl = () => {
  // In browser, use the public environment variable
  if (typeof window !== "undefined") {
    return process.env.NEXT_PUBLIC_API_BASE_URL;
  }

  // On server during SSR, use different URLs based on environment
  if (process.env.VERCEL_ENV === "production") {
    return "https://cafe-arz-ticketing-system.vercel.app/api";
  }

  if (process.env.VERCEL_ENV === "preview") {
    return `https://${process.env.VERCEL_URL}/api`;
  }

  // Default to local development
  return "http://localhost:3000/api";
};

export const ticketingApi = apiFactory({
  baseURL: getBaseUrl() || "http://localhost:3000/api",
});
/**
 * The Test API of CafeArz was not sufficient
 * and I decided to re-make local CRUD APIs for the ticketing system.
 * Deprecated: https://api2.cafearz.com/
 * New: http://localhost:3000/api
 */
