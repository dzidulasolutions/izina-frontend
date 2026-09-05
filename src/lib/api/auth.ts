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

export const verifyEmailRequest = (code: string) =>
  apiFetch<{ success: boolean; message: string }>(
    "/auth/verify-email",
    { method: "POST", body: JSON.stringify({ code }) },
    true, // authentifié
  );

export const resendVerificationCodeRequest = () =>
  apiFetch<{ success: boolean; message: string }>(
    "/auth/resend-verification-code",
    { method: "POST" },
    true, // authentifié
  );
