import { fetchJson } from "@/utils/fetcher";
export async function deleteTrip(id) {
    const requestOption = {
        method: "DELETE",
    };
    return fetchJson("http://localhost:8080/api/v1/trips/" + id, requestOption);
}
