// src/hooks/useUserBirthdays.ts
import { useEffect, useState, useCallback } from "react";
import { fetchMe } from "@/src/lib/api/auth";
import { apiFetch } from "@/src/lib/api/client";
import { getAccessToken } from "@/src/lib/auth/storage";

interface BirthDateEntry {
  label: string;
  relationship?: string;
  date: string;
  reminderEnabled: boolean;
}

export function useUserBirthdays() {
  const [birthdayDays, setBirthdayDays] = useState<Set<string>>(new Set());
  const [userId, setUserId] = useState<string | null>(null);
  const [existingBirthDates, setExistingBirthDates] = useState<BirthDateEntry[]>([]);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    if (!getAccessToken()) return;
    try {
      const me = await fetchMe();
      setUserId(me.data.id);

      // GET /utilisateurs/:id renvoie le profil complet, incluant birthDates
      const profile = await apiFetch<{ data: { birthDates: BirthDateEntry[] } }>(
        `/utilisateurs/${me.data.id}`, { method: "GET" }, true,
      );
      const dates = profile.data.birthDates ?? [];
      setExistingBirthDates(dates);

      const days = new Set(
        dates.map((d) => {
          const dt = new Date(d.date);
          return `${String(dt.getMonth() + 1).padStart(2, "0")}-${String(dt.getDate()).padStart(2, "0")}`;
        }),
      );
      setBirthdayDays(days);
    } catch {
      /* utilisateur non connecté ou erreur, on laisse vide */
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const addBirthday = async (data: { label: string; relationship: string; note: string; date: string }) => {
    if (!userId) throw new Error("Non connecté");
    setSaving(true);
    try {
      const newEntry: BirthDateEntry = {
        label: data.label,
        relationship: data.relationship || undefined,
        date: data.date,
        reminderEnabled: true,
      };
      const updated = [...existingBirthDates, newEntry];

      await apiFetch(
        `/utilisateurs/${userId}`,
        { method: "PATCH", body: JSON.stringify({ birthDates: updated }) },
        true,
      );

      setExistingBirthDates(updated);
      await load();
    } finally {
      setSaving(false);
    }
  };

  return { birthdayDays, addBirthday, saving };
}