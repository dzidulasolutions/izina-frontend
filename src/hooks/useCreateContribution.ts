import { useState } from "react";
import {
  createPrenomRequest,
  CreatePrenomPayload,
} from "@/src/lib/api/prenoms";
import { ApiError } from "@/src/lib/api/client";

export function useCreateContribution() {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const submit = async (
    payload: CreatePrenomPayload,
    onSuccess?: () => void,
  ) => {
    setAlert(null);
    setLoading(true);

    const minDelay = new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      const [res] = await Promise.all([createPrenomRequest(payload), minDelay]);
      setAlert({ type: "success", message: res.message });
      setTimeout(() => onSuccess?.(), 2000);
    } catch (err) {
      await minDelay; 
      setAlert({
        type: "error",
        message:
          err instanceof ApiError
            ? err.message
            : "Impossible d'envoyer votre contribution",
      });
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading, alert, setAlert };
}
