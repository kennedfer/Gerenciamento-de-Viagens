export async function fetchJson<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(url, options);
  const json = await response.json();

  if (!response.ok) {
    throw json;
  }

  return json;
}
