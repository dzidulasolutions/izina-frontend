// src/hooks/useSurprise.ts
import { useEffect, useState } from "react";
import { fetchSurprise, toggleSave, recordDownload, PrenomDetail } from "@/src/lib/api/prenoms";
import { getAccessToken } from "@/src/lib/auth/storage";

type Gender = "Tous" | "Masculin" | "Féminin" | "Mixte";
type Category = "Tous" | "Populaire" | "Rare" | "Moderne" | "Traditionnel";

const genderMap: Record<Gender, string | undefined> = {
  "Tous": undefined, "Masculin": "masculin", "Féminin": "féminin", "Mixte": "neutre",
};

const categoryMap: Record<Category, string | undefined> = {
  "Tous": undefined, "Populaire": "populaire", "Rare": "rare", "Moderne": "moderne", "Traditionnel": "traditionnel",
};

const STORAGE_KEY = "izina_surprise_result";

export function useSurprise() {
  const [result, setResult] = useState<PrenomDetail | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [saved, setSaved] = useState(false);
  const [needsAuth, setNeedsAuth] = useState(false);
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Recharge le dernier résultat depuis sessionStorage au montage
  // (survit à une navigation aller-retour vers /prenoms/:id)
  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setResult(parsed.result);
        setSaved(parsed.saved);
      } catch {
        /* ignore */
      }
    }
  }, []);

  const persist = (r: PrenomDetail | null, s: boolean) => {
    if (r) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ result: r, saved: s }));
    } else {
      sessionStorage.removeItem(STORAGE_KEY);
    }
  };

  const draw = async (gender: Gender, category: Category) => {
    setAlert(null);
    setIsSpinning(true);
    setNotFound(false);
    setSaved(false);

    const minDelay = new Promise((resolve) => setTimeout(resolve, 1800));

    try {
      const [res] = await Promise.all([
        fetchSurprise({ gender: genderMap[gender], category: categoryMap[category] }),
        minDelay,
      ]);
      setResult(res.data);
      persist(res.data, false);
    } catch {
      await minDelay;
      setResult(null);
      setNotFound(true);
      persist(null, false);
    } finally {
      setIsSpinning(false);
    }
  };

  const handleSaveResult = async () => {
    if (!result) return;
    if (!getAccessToken()) {
      setNeedsAuth(true);
      return;
    }
    try {
      await toggleSave(result._id);
      setSaved(true);
      persist(result, true);
      setAlert({ type: "success", message: "Prénom enregistré dans vos favoris" });
    } catch {
      setAlert({ type: "error", message: "Impossible d'enregistrer ce prénom" });
    }
  };

  return { result, isSpinning, notFound, saved, needsAuth, setNeedsAuth, alert, setAlert, draw, handleSaveResult };
}