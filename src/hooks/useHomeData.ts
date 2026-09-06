import { useEffect, useState } from "react";
import {
  fetchPopulaires,
  fetchRecents,
  PrenomResult,
} from "@/src/lib/api/prenoms";

function popularityLabel(likesCount = 0): string {
  if (likesCount >= 50) return "Très populaire";
  if (likesCount >= 10) return "Populaire";
  return "Rare";
}

export function useHomeData() {
  const [featured, setFeatured] = useState<PrenomResult[]>([]);
  const [recent, setRecent] = useState<PrenomResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [popRes, recentRes] = await Promise.all([
          fetchPopulaires(4),
          fetchRecents(3),
        ]);
        setFeatured(popRes.data.data ?? []);
        setRecent(recentRes.data.data ?? []);
      } catch {
        setFeatured([]);
        setRecent([]);
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, []);

  return { featured, recent, loading, popularityLabel };
}
