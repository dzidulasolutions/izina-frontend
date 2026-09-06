// src/hooks/usePrenomSearch.ts
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchPrenoms, PrenomResult, PrenomSearchFilters } from "@/src/lib/api/prenoms";

export function usePrenomSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [results, setResults] = useState<PrenomResult[]>([]);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentFilters: PrenomSearchFilters = {
    search: searchParams.get("search") ?? undefined,
    gender: searchParams.get("gender") ?? undefined,
    category: searchParams.get("category") ?? undefined,
    country: searchParams.get("country") ?? undefined,
    ethnicGroup: searchParams.get("ethnicGroup") ?? undefined,
  };

  const runSearch = useCallback(async (filters: PrenomSearchFilters) => {
    const hasAnyFilter = Object.values(filters).some(Boolean);
    if (!hasAnyFilter) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetchPrenoms({ ...filters, limit: 8 });
      setResults(res.data.data);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Recharge les résultats à chaque changement d'URL (donc aussi au retour arrière)
  useEffect(() => {
    void runSearch(currentFilters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const updateUrl = (filters: PrenomSearchFilters) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, String(value));
    });
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const search = (text: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      updateUrl({ ...currentFilters, search: text });
    }, 300);
  };

  const applyFilters = (filters: Omit<PrenomSearchFilters, "search">) => {
    updateUrl({ ...filters, search: currentFilters.search });
  };

  return { results, loading, search, applyFilters, currentFilters };
}