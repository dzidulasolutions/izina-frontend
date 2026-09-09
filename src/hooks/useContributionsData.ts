import { useEffect, useState } from "react";
import {
  fetchMyContributions,
  fetchTopContributors,
  MyContribution,
  TopContributor,
} from "@/src/lib/api/prenoms";
import {
  deletePrenomRequest,
  updatePrenomRequest,
  UpdatePrenomPayload,
} from "@/src/lib/api/prenoms";
import { ApiError } from "../lib/api/client";

const statusLabels: Record<string, string> = {
  brouillon: "Brouillon",
  verifie_ia: "Vérifié IA",
  publie: "Publié",
  rejete: "Rejeté",
};

const statusColors: Record<string, string> = {
  brouillon: "text-orange-500",
  verifie_ia: "text-blue-500",
  publie: "text-green-600",
  rejete: "text-red-600",
};

export function useContributionsData() {
  const [contributions, setContributions] = useState<MyContribution[]>([]);
  const [topContributors, setTopContributors] = useState<TopContributor[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false); // NOUVEAU
  const [actionAlert, setActionAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null); // NOUVEAU

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [mine, top] = await Promise.all([
          fetchMyContributions(),
          fetchTopContributors(),
        ]);
        setContributions(mine.data);
        setTopContributors(top.data);
      } catch {
        setContributions([]);
        setTopContributors([]);
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, []);

  const publishedCount = contributions.filter(
    (c) => c.status === "publie",
  ).length;
  const totalCount = contributions.length;

  const removeContribution = async (id: string) => {
    setActionAlert(null);
    setActionLoading(true);
    try {
      await deletePrenomRequest(id);
      setContributions((prev) => prev.filter((c) => c._id !== id));
      setActionAlert({
        type: "success",
        message: "Prénom supprimé avec succès",
      });
      return true;
    } catch (err) {
      setActionAlert({
        type: "error",
        message:
          err instanceof ApiError
            ? err.message
            : "Impossible de supprimer le prénom",
      });
      return false;
    } finally {
      setActionLoading(false);
    }
  };

  const editContribution = async (id: string, payload: UpdatePrenomPayload) => {
    setActionAlert(null);
    setActionLoading(true);
    try {
      const res = await updatePrenomRequest(id, payload);
      setContributions((prev) =>
        prev.map((c) => (c._id === id ? { ...c, ...res.data } : c)),
      );
      setActionAlert({
        type: "success",
        message: "Prénom modifié avec succès",
      });
      return true;
    } catch (err) {
      setActionAlert({
        type: "error",
        message:
          err instanceof ApiError
            ? err.message
            : "Impossible de modifier le prénom",
      });
      return false;
    } finally {
      setActionLoading(false);
    }
  };

  return {
    contributions,
    topContributors,
    loading,
    publishedCount,
    totalCount,
    statusLabels,
    statusColors,
    removeContribution,
    editContribution,
    actionLoading,
    actionAlert,
    setActionAlert,
  };
}
