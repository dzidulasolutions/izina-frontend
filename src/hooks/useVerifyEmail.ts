import { useState } from "react";
import { useRouter } from "next/navigation";
import { verifyEmailRequest, resendVerificationCodeRequest } from "@/src/lib/api/auth";
import { ApiError } from "@/src/lib/api/client";
import { getAccessToken } from "@/src/lib/auth/storage";

export function useVerifyEmail() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const hasToken = () => !!getAccessToken();

  const verify = async (code: string) => {
    setAlert(null);
    setLoading(true);
    try {
      const res = await verifyEmailRequest(code);
      setAlert({ type: "success", message: res.message });
      setTimeout(() => router.replace("/"), 1000);
    } catch (err) {
      setAlert({
        type: "error",
        message: err instanceof ApiError ? err.message : "Code invalide ou expiré",
      });
    } finally {
      setLoading(false);
    }
  };

  const resend = async () => {
    setAlert(null);
    setResending(true);
    try {
      const res = await resendVerificationCodeRequest();
      setAlert({ type: "success", message: res.message });
    } catch (err) {
      setAlert({
        type: "error",
        message: err instanceof ApiError ? err.message : "Impossible de renvoyer le code",
      });
    } finally {
      setResending(false);
    }
  };

  return { verify, resend, loading, resending, alert, setAlert, hasToken };
}