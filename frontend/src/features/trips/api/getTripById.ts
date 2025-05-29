import { fetchJson } from "@/utils/fetcher";
import type { ApiResponse } from "./types";

export async function getTripById(id: number): Promise<ApiResponse> {
  return fetchJson("trips/" + id);
}
