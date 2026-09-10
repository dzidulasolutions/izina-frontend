import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchPrenoms, PrenomResult, PrenomSearchFilters } from "@/src/lib/api/prenoms";

export function usePrenomsList() {
  const searchParams = useSearchParams();
  const [items, setItems] = useState<PrenomResult[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const filters: PrenomSearchFilters = {
    search: searchParams.get("search") ?? undefined,
    gender: searchParams.get("gender") ?? undefined,
    category: searchParams.get("category") ?? undefined,
    country: searchParams.get("country") ?? undefined,
    ethnicGroup: searchParams.get("ethnicGroup") ?? undefined,
    sort: (searchParams.get("sort") as PrenomSearchFilters["sort"]) ?? undefined,
  };

  const filtersKey = JSON.stringify(filters);

  // Recharge depuis zéro à chaque changement de filtre (nouvelle recherche)
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setCursor(null);
      try {
        const res = await fetchPrenoms({ ...filters, limit: 15 });
        setItems(res.data.data ?? []);
        setCursor(res.data.nextCursor);
        setHasMore(!!res.data.nextCursor);
      } catch {
        setItems([]);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtersKey]);

  const loadMore = useCallback(async () => {
    if (!cursor || loadingMore) return;
    setLoadingMore(true);
    try {
      const res = await fetchPrenoms({ ...filters, cursor, limit: 15 });
      setItems((prev) => [...prev, ...(res.data.data ?? [])]);
      setCursor(res.data.nextCursor);
      setHasMore(!!res.data.nextCursor);
    } finally {
      setLoadingMore(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cursor, loadingMore, filtersKey]);

  return { items, loading, loadingMore, hasMore, loadMore };
}