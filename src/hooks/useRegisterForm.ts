import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerRequest, RegisterPayload } from "@/src/lib/api/auth";
import { ApiError } from "@/src/lib/api/client";

export function useRegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const submit = async (payload: RegisterPayload) => {
    setAlert(null);
    setLoading(true);

    try {
      const res = await registerRequest(payload);
      setAlert({ type: "success", message: res.message });
      router.replace(`/verify-email?email=${encodeURIComponent(payload.email ?? "")}`);
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