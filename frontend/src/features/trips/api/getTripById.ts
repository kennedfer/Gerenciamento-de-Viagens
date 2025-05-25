import { fetchJson } from "@/utils/fetcher";
import type { ApiResponse } from "./types";

export async function getTripById(id: number): Promise<ApiResponse> {
  return fetchJson("http://localhost:8080/api/v1/trips/" + id);
}
