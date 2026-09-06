import { apiFetch } from "./client";

export interface CreatePrenomPayload {
  label: string;
  description: { fr: string; en: string };
  category?: string[];
  country?: string[];
  ethnicGroup?: string[];
  gender: "masculin" | "féminin" | "neutre";
}

// Creation de prenoms
export interface PrenomApiResponse {
  success: boolean;
  message: string;
  data: {
    _id: string;
    label: string;
    description: { fr: string; en: string };
    category: string[];
    country: string[];
    ethnicGroup: string[];
    gender: string;
    status: string;
    authorId: string;
    likesCount: number;
    savesCount: number;
    commentsCount: number;
    sharesCount: number;
    downloadsCount: number;
    viewsCount: number;
    createdAt: string;
    updatedAt: string;
  };
}

export const createPrenomRequest = (payload: CreatePrenomPayload) =>
  apiFetch<PrenomApiResponse>(
    "/prenoms",
    { method: "POST", body: JSON.stringify(payload) },
    true, // authentifié
  );

// Recherche de prenoms
export interface PrenomSearchFilters {
  search?: string;
  gender?: string;
  category?: string;
  country?: string;
  ethnicGroup?: string;
  sort?: "az" | "za" | "recent";
  cursor?: string;
  limit?: number;
}

export interface PrenomResult {
  _id: string;
  label: string;
  description: { fr: string; en: string };
  gender: string;
  country?: string[];
  ethnicGroup?: string[];
  likesCount?: number;
}

interface PrenomsListResponse {
  success: boolean;
  message: string;
  data: { data: PrenomResult[]; nextCursor: string | null };
}

export const fetchPrenoms = (filters: PrenomSearchFilters) => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.set(key, String(value));
  });
  return apiFetch<PrenomsListResponse>(`/prenoms?${params.toString()}`, {
    method: "GET",
  });
};

export const fetchPopulaires = (limit = 4) =>
  apiFetch<PrenomsListResponse>(`/prenoms/populaires?limit=${limit}`, {
    method: "GET",
  });

export const fetchRecents = (limit = 3) =>
  apiFetch<PrenomsListResponse>(`/prenoms?sort=recent&limit=${limit}`, {
    method: "GET",
  });
