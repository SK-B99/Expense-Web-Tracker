'use client';

let accessToken: string | null = null;
let onAuthFailure: (() => void) | null = null;
let refreshPromise: Promise<string | null> | null = null;

export function setAccessToken(token: string | null) {
  accessToken = token;
}

export function getAccessToken() {
  return accessToken;
}

export function registerAuthFailureHandler(handler: () => void) {
  onAuthFailure = handler;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function refreshAccessToken(): Promise<string | null> {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      try {
        if (!API_URL) {
          throw new Error('NEXT_PUBLIC_API_URL is not defined');
        }

        const res = await fetch(`${API_URL}/auth/refresh`, {
          method: 'POST',
          credentials: 'include',
        });

        if (!res.ok) return null;

        const data = await res.json();

        if (!data?.accessToken) return null;

        setAccessToken(data.accessToken);
        return data.accessToken as string;
      } catch {
        return null;
      } finally {
        refreshPromise = null;
      }
    })();
  }

  return refreshPromise;
}

async function request(
  path: string,
  options: RequestInit = {},
  retry = true,
): Promise<Response> {
  if (!API_URL) {
    throw new Error('NEXT_PUBLIC_API_URL is not defined');
  }

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
  });

  if (res.status === 401 && retry) {
    const newToken = await refreshAccessToken();

    if (newToken) {
      return request(path, options, false);
    }

    setAccessToken(null);
    onAuthFailure?.();
  }

  return res;
}

async function parseResponse<T>(response: Response): Promise<T> {
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new Error(data?.message || `Request failed: ${response.status}`);
  }

  return data as T;
}

export const api = {
  get: <T = unknown>(path: string) =>
    request(path).then((res) => parseResponse<T>(res)),

  post: <T = unknown>(path: string, body?: unknown) =>
    request(path, {
      method: 'POST',
      body: body !== undefined ? JSON.stringify(body) : undefined,
    }).then((res) => parseResponse<T>(res)),

  put: <T = unknown>(path: string, body?: unknown) =>
    request(path, {
      method: 'PUT',
      body: body !== undefined ? JSON.stringify(body) : undefined,
    }).then((res) => parseResponse<T>(res)),

  patch: <T = unknown>(path: string, body?: unknown) =>
    request(path, {
      method: 'PATCH',
      body: body !== undefined ? JSON.stringify(body) : undefined,
    }).then((res) => parseResponse<T>(res)),

  delete: <T = unknown>(path: string) =>
    request(path, { method: 'DELETE' }).then((res) => parseResponse<T>(res)),
};