import { useState } from "react";
import { useRouter } from "next/navigation";
import { forgotPasswordRequest } from "@/src/lib/api/auth";
import { ApiError } from "@/src/lib/api/client";

export function useForgotPasswordForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const submit = async (email: string) => {
    setAlert(null);
    setLoading(true);

    try {
      const res = await forgotPasswordRequest(email);
      setAlert({ type: "success", message: res.message });
      router.replace(`/reset-password?email=${encodeURIComponent(email)}`);
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