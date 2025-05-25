import { fetchJson } from "@/utils/fetcher";
export async function getTripById(id) {
    return fetchJson("http://localhost:8080/api/v1/trips/" + id);
}
