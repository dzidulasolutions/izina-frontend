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

export interface LoginPayload {
  email?: string;
  phone?: string;
  password: string;
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

export const loginRequest = (payload: LoginPayload) =>
  apiFetch<AuthApiResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const forgotPasswordRequest = (email: string) =>
  apiFetch<{ success: boolean; message: string }>("/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email }),
  });

export const resetPasswordRequest = (email: string, code: string, newPassword: string) =>
  apiFetch<{ success: boolean; message: string }>("/auth/reset-password", {
    method: "POST",
    body: JSON.stringify({ email, code, newPassword }),
  });

  // me 
export interface MeResponse {
  success: boolean;
  message: string;
  data: { id: string; displayName: string; role: string };
}

export const fetchMe = () =>
  apiFetch<MeResponse>("/auth/me", { method: "GET" }, true);