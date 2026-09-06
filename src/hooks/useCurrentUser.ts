import { useEffect, useState } from "react";
import { fetchMe } from "@/src/lib/api/auth";
import { getAccessToken } from "@/src/lib/auth/storage";

export function useCurrentUser() {
  const [user, setUser] = useState<{ id: string; displayName: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!getAccessToken()) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetchMe();
        setUser({ id: res.data.id, displayName: res.data.displayName });
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, []);

  return { user, loading };
}