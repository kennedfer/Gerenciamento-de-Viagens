export async function fetchJson(url, options) {
    const response = await fetch(url, options);
    const json = await response.json();
    if (!response.ok) {
        throw json;
    }
    return json;
}
