// src/hooks/useForgotPasswordFlow.ts
import { useState } from "react";
import { useRouter } from "next/navigation";
import { forgotPasswordRequest, resetPasswordRequest } from "@/src/lib/api/auth";
import { ApiError } from "@/src/lib/api/client";

type Step = "email" | "code" | "password";

export function useForgotPasswordFlow() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("email");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const sendCode = async (email: string) => {
    setAlert(null);
    setLoading(true);
    try {
      const res = await forgotPasswordRequest(email);
      setAlert({ type: "success", message: res.message ?? "Un code de réinitialisation a été envoyé." });
      setStep("code");
    } catch (err) {
      setAlert({
        type: "error",
        message: err instanceof ApiError ? err.message : "Une erreur est survenue.",
      });
    } finally {
      setLoading(false);
    }
  };

  const resendCode = async (email: string) => {
    setAlert(null);
    setResending(true);
    try {
      const res = await forgotPasswordRequest(email);
      setAlert({ type: "success", message: res.message ?? "Nouveau code envoyé." });
    } catch (err) {
      setAlert({
        type: "error",
        message: err instanceof ApiError ? err.message : "Impossible de renvoyer le code.",
      });
    } finally {
      setResending(false);
    }
  };

  const resetPassword = async (email: string, code: string, newPassword: string) => {
    setAlert(null);
    setLoading(true);
    try {
      const res = await resetPasswordRequest(email, code, newPassword);
      setAlert({ type: "success", message: res.message ?? "Mot de passe réinitialisé avec succès." });
      setTimeout(() => router.replace("/login"), 1000);
    } catch (err) {
      setAlert({
        type: "error",
        message: err instanceof ApiError ? err.message : "Une erreur est survenue.",
      });
    } finally {
      setLoading(false);
    }
  };

  return { step, setStep, sendCode, resendCode, resetPassword, loading, resending, alert, setAlert };
}