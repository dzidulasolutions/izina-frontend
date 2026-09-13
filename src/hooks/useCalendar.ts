import { useEffect, useMemo, useState } from "react";
import { fetchFullCalendar, CalendrierEntry } from "@/src/lib/api/calendrier";

// Regroupe les entrées par jour "MM-DD" -> liste de prénoms
export type CalendarByDay = Record<string, CalendrierEntry[]>;

export function useCalendar() {
  const [entries, setEntries] = useState<CalendrierEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetchFullCalendar();
        console.log("Entrées calendrier reçues:", res.data);
        setEntries(res.data ?? []);
      } catch {
        setEntries([]);
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, []);

  const byDay: CalendarByDay = useMemo(() => {
    const map: CalendarByDay = {};
    for (const entry of entries) {
      if (!map[entry.day]) map[entry.day] = [];
      map[entry.day].push(entry);
    }
    return map;
  }, [entries]);

  return { entries, byDay, loading };
}