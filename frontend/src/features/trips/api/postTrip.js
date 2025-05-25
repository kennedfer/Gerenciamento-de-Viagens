import { fetchJson } from "@/utils/fetcher";
export async function postTrip(payload) {
    const options = {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json",
        },
    };
    return fetchJson("http://localhost:8080/api/v1/trips", options);
}
