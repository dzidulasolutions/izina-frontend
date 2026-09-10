import { useEffect, useState } from "react";
import {
  fetchSurprise,
  fetchTendances,
  fetchPopulaires,
  PrenomResult,
  PrenomDetail,
} from "@/src/lib/api/prenoms";

export function useDiscoverData() {
  const [surprise, setSurprise] = useState<PrenomDetail | null>(null);
  const [popular, setPopular] = useState<PrenomResult[]>([]);
  const [trending, setTrending] = useState<PrenomResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [surpriseRes, popularRes, trendingRes] = await Promise.all([
          fetchSurprise(),
          fetchPopulaires(3),
          fetchTendances(4),
        ]);
        setSurprise(surpriseRes.data);
        setPopular(popularRes.data.data ?? []);
        setTrending(trendingRes.data.data ?? []);
      } catch {
        setSurprise(null);
        setPopular([]);
        setTrending([]);
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, []);

  return { surprise, popular, trending, loading };
}
