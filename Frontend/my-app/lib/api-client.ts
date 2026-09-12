let accessToken: string | null = null;

export function setAccessToken(token: string | null) {
  accessToken = token;
}

export function getAccessToken() {
  return accessToken;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

async function request(path: string, options: RequestInit = {}, retry = true): Promise<Response> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: 'include',
    headers: {
      ...options.headers,
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      'Content-Type': 'application/json',
    },
  });

  if (res.status === 401 && retry) {
    const refreshed = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    });
    if (refreshed.ok) {
      const data = await refreshed.json();
      setAccessToken(data.accessToken);
      return request(path, options, false);
    }
    setAccessToken(null);
  }

  return res;
}

export const api = {
  get: (path: string) => request(path).then((r) => r.json()),
  post: (path: string, body?: unknown) =>
    request(path, { method: 'POST', body: body ? JSON.stringify(body) : undefined }).then((r) => r.json()),
};