import { fetchJson } from "@/utils/fetcher";
import type { ApiResponse } from "./types";

export async function updateTrip(id: number, data): Promise<ApiResponse> {
  const requestOption: RequestInit = {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetchJson("trips/" + id, requestOption);
}
