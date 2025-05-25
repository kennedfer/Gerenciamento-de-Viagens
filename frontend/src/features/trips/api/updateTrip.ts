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

  return fetchJson("http://localhost:8080/api/v1/trips/" + id, requestOption);
}
