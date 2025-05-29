import { fetchJson } from "@/utils/fetcher";
import type { ApiResponse } from "./types";

export async function deleteTrip(id: number): Promise<ApiResponse> {
  const requestOption: RequestInit = {
    method: "DELETE",
  };

  return fetchJson("trips/" + id, requestOption);
}
