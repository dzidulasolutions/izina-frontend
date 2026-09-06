import { apiFetch } from "./client";

export interface CreatePrenomPayload {
  label: string;
  description: { fr: string; en: string };
  category?: string[];
  country?: string[];
  ethnicGroup?: string[];
  gender: "masculin" | "féminin" | "neutre";
}

// src/lib/api/prenoms.ts
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