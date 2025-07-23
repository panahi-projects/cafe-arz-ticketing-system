import { apiFactory } from "@/lib/api-factory";

export const ticketingApi = apiFactory({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://api2.cafearz.com/",
});
