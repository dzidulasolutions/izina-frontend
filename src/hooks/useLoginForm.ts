import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginRequest, LoginPayload } from "@/src/lib/api/auth";
import { ApiError } from "@/src/lib/api/client";
import { saveTokens } from "@/src/lib/auth/storage";

export function useLoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const submit = async (payload: LoginPayload) => {
    setAlert(null);
    setLoading(true);

    try {
      const res = await loginRequest(payload);
      saveTokens(res.data.accessToken, res.data.refreshToken);
      setAlert({ type: "success", message: "Connexion réussie !" });
      setTimeout(() => router.replace("/accueil"), 1000);
    } catch (err) {
      setAlert({
        type: "error",
        message: err instanceof ApiError ? err.message : "Une erreur est survenue",
      });
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading, alert, setAlert };
}