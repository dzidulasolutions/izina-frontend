// src/lib/api/auth.ts
import { apiFetch } from "./client";

export interface RegisterPayload {
  displayName: string;
  email?: string;
  phone?: string;
  password: string;
}

export interface AuthApiResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    user: { id: string; displayName: string };
    emailVerificationRequired?: boolean;
  };
}

export const registerRequest = (payload: RegisterPayload) =>
  apiFetch<AuthApiResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });