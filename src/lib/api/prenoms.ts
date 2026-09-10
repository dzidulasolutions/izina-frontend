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
export type PrenomStatus = "brouillon" | "verifie_ia" | "publie" | "rejete";
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
    status: PrenomStatus; // au lieu de string
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

export interface PrenomDetail {
  _id: string;
  label: string;
  description: { fr: string; en: string };
  category: string[];
  country: string[];
  ethnicGroup: string[];
  gender: string;
  likesCount: number;
  savesCount: number;
  downloadsCount: number;
  sharesCount: number;
  commentsCount: number;
  viewsCount: number;
}

interface PrenomDetailResponse {
  success: boolean;
  message: string;
  data: PrenomDetail;
}

export const fetchPrenomById = (id: string) =>
  apiFetch<PrenomDetailResponse>(`/prenoms/${id}`, { method: "GET" });

export const toggleLike = (id: string) =>
  apiFetch<{ success: boolean; message: string; data: { liked: boolean } }>(
    `/prenoms/${id}/like`,
    { method: "POST" },
    true,
  );

export const toggleSave = (id: string) =>
  apiFetch<{ success: boolean; message: string; data: { saved: boolean } }>(
    `/prenoms/${id}/save`,
    { method: "POST" },
    true,
  );

export const recordDownload = (id: string) =>
  apiFetch<{ success: boolean; message: string }>(
    `/prenoms/${id}/download`,
    { method: "POST" },
    true,
  );

export const recordShare = (id: string, channel?: string) =>
  apiFetch<{ success: boolean; message: string }>(
    `/prenoms/${id}/share`,
    { method: "POST", body: JSON.stringify({ channel }) },
    true,
  );

export interface ApiComment {
  _id: string;
  message: string;
  createdAt: string;
  userId: { _id: string; displayName: string };
}

interface CommentsResponse {
  success: boolean;
  message: string;
  data: { data: ApiComment[]; nextCursor: string | null };
}

export const fetchComments = (prenomId: string) =>
  apiFetch<CommentsResponse>(`/prenoms/${prenomId}/comments`, {
    method: "GET",
  });

export const postComment = (prenomId: string, message: string) =>
  apiFetch<{ success: boolean; message: string; data: ApiComment }>(
    "/prenoms/comments",
    { method: "POST", body: JSON.stringify({ prenomId, message }) },
    true,
  );

export interface MyContribution {
  _id: string;
  label: string;
  description: { fr: string; en: string };
  status: PrenomStatus;
}

interface MyContributionsResponse {
  success: boolean;
  message: string;
  data: MyContribution[];
}

export const fetchMyContributions = () =>
  apiFetch<MyContributionsResponse>(
    "/prenoms/mes-contributions",
    { method: "GET" },
    true,
  );

export interface TopContributor {
  _id: string;
  totalPublished: number;
  contributeur: { displayName: string; profilePhotoUrl?: string };
}

interface TopContributorsResponse {
  success: boolean;
  message: string;
  data: TopContributor[];
}

export const fetchTopContributors = () =>
  apiFetch<TopContributorsResponse>("/prenoms/top-contributeurs", {
    method: "GET",
  });

export interface UpdatePrenomPayload {
  label?: string;
  description?: { fr: string; en: string };
  category?: string[];
  country?: string[];
  ethnicGroup?: string[];
  gender?: "masculin" | "féminin" | "neutre";
}

export const updatePrenomRequest = (id: string, payload: UpdatePrenomPayload) =>
  apiFetch<PrenomApiResponse>(
    `/prenoms/${id}`,
    { method: "PATCH", body: JSON.stringify(payload) },
    true,
  );

export const deletePrenomRequest = (id: string) =>
  apiFetch<{ success: boolean; message: string }>(
    `/prenoms/${id}`,
    { method: "DELETE" },
    true,
  );

export const fetchSurprise = (filters?: { gender?: string; category?: string; country?: string; ethnicGroup?: string }) => {
  const params = new URLSearchParams();
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
  }
  return apiFetch<PrenomDetailResponse>(`/prenoms/surprise?${params.toString()}`, { method: "GET" });
};

export const fetchTendances = (limit = 4) =>
  apiFetch<PrenomsListResponse>(`/prenoms/tendances?limit=${limit}`, { method: "GET" });