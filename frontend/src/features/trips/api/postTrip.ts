import type { TripPayload } from "@/types";
import { fetchJson } from "@/utils/fetcher";

export async function postTrip(payload: TripPayload): Promise<any> {
  const options: RequestInit = {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetchJson("trips", options);
}
