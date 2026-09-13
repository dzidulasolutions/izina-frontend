import { useState } from "react";
import { useRouter } from "next/navigation";
import { logoutRequest } from "@/src/lib/api/auth";
import { clearTokens } from "@/src/lib/auth/storage";

export function useSettings() {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const logout = async () => {
    setLoggingOut(true);
    try {
      await logoutRequest(); // révoque le refresh token côté serveur (Redis)
    } catch {
      // même si la requête échoue (token déjà expiré...), on déconnecte quand même localement
    } finally {
      clearTokens();
      setLoggingOut(false);
      router.replace("/login");
    }
  };

  return { logout, loggingOut };
}