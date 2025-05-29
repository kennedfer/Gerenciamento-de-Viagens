const url = import.meta.env.VITE_BACKEND_URL;

export async function fetchJson<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(url + path, options);
  const json = await response.json();

  if (!response.ok) {
    throw json;
  }

  return json;
}
