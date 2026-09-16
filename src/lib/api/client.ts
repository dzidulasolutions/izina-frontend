// src/lib/api/client.ts
import {
  getAccessToken,
  getRefreshToken,
  saveTokens,
  clearTokens,
} from "@/src/lib/auth/storage";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

// Évite que plusieurs requêtes en 401 en même temps déclenchent
// chacune leur propre appel à /auth/refresh — on partage la même Promise.
let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = getRefreshToken();
  console.log("[refreshAccessToken] token utilisé:", refreshToken);
  if (!refreshToken) return null;

  try {
    const res = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    console.log("[refreshAccessToken] status:", res.status);
    const data = await res.json();
    console.log("[refreshAccessToken] réponse:", data);

    if (!res.ok) return null;

    saveTokens(data.data.accessToken, data.data.refreshToken);
    return data.data.accessToken;
  } catch (err) {
    console.log("[refreshAccessToken] erreur:", err);
    return null;
  }
}

async function performRequest(
  endpoint: string,
  options: RequestInit,
  authenticated: boolean,
) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (authenticated) {
    const token = getAccessToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  return fetch(`${API_URL}${endpoint}`, { ...options, headers });
}

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
  authenticated = false,
): Promise<T> {
  let res = await performRequest(endpoint, options, authenticated);
  console.log(`[apiFetch] ${endpoint} - status: ${res.status}, authenticated: ${authenticated}`);

  // Le token a expiré → on tente un refresh, une seule fois
  if (res.status === 401 && authenticated) {
        console.log(`[apiFetch] Tentative de refresh pour ${endpoint}`);

    if (!refreshPromise) {
      refreshPromise = refreshAccessToken().finally(() => {
        refreshPromise = null;
      });
    }

    const newAccessToken = await refreshPromise;

    if (!newAccessToken) {
      clearTokens();
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("auth:session-expired"));
      }
      throw new ApiError("Session expirée, veuillez vous reconnecter", 401);
    }

    // Rejoue la requête d'origine avec le nouveau token
    res = await performRequest(endpoint, options, authenticated);
  }

  const data = await res.json();

  if (!res.ok) {
    throw new ApiError(data.message || "Une erreur est survenue", res.status);
  }

  return data;
}
