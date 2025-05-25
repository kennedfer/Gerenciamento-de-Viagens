import { fetchJson } from "@/utils/fetcher";
export async function updateTrip(id, data) {
    const requestOption = {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    };
    return fetchJson("http://localhost:8080/api/v1/trips/" + id, requestOption);
}
