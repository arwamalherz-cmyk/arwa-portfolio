import { API_URL } from "@/lib/api";

/**
 * Thin fetch wrapper for the portfolio API.
 *
 * `USE_MOCK` lets the whole frontend run without the backend: every service
 * falls back to bundled sample data. Set `VITE_USE_MOCK=false` (and run
 * `apps/api`) to switch the site over to live data with no component changes.
 */
export const USE_MOCK = import.meta.env.VITE_USE_MOCK !== "false";

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function apiFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...init?.headers },
    ...init,
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new ApiError(
      detail || `Request to ${path} failed`,
      response.status,
    );
  }

  if (response.status === 204) return undefined as T;
  return (await response.json()) as T;
}

/** Small helper so mock services feel async like the real ones. */
export function mock<T>(data: T, delayMs = 120): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(structuredClone(data)), delayMs);
  });
}

/** Local id generator used only by the mock services. */
export function mockId(): string {
  return (
    globalThis.crypto?.randomUUID?.() ??
    `id-${Date.now()}-${Math.random().toString(16).slice(2)}`
  );
}
