import { useEffect, useState, useCallback } from "react";
import {
  fetchPrenomById,
  toggleLike,
  toggleSave,
  recordDownload,
  recordShare,
  fetchComments,
  postComment,
  PrenomDetail,
  ApiComment,
} from "@/src/lib/api/prenoms";
import { ApiError } from "@/src/lib/api/client";
import { getAccessToken } from "@/src/lib/auth/storage";
import { fetchMe } from "@/src/lib/api/auth"; // à ajouter si pas déjà importé

function timeAgo(dateString: string): string {
  const diffMin = Math.floor(
    (Date.now() - new Date(dateString).getTime()) / 60000,
  );
  if (diffMin < 1) return "À l'instant";
  if (diffMin < 60) return `Il y a ${diffMin} min`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `Il y a ${diffH} h`;
  return `Il y a ${Math.floor(diffH / 24)} j`;
}

export function popularityLabel(likesCount = 0): string {
  if (likesCount >= 50) return "Élevée";
  if (likesCount >= 10) return "Moyenne";
  return "Faible";
}

export function usePrenomDetail(id: string, currentUser?: { id: string; displayName: string } | null) {
  const [prenom, setPrenom] = useState<PrenomDetail | null>(null);
  const [comments, setComments] = useState<ApiComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [needsAuth, setNeedsAuth] = useState(false); // déclenche le popup "connecte-toi"

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [prenomRes, commentsRes] = await Promise.all([
        fetchPrenomById(id),
        fetchComments(id),
      ]);
      setPrenom(prenomRes.data);
      setComments(commentsRes.data.data);
    } catch {
      setPrenom(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    void load();
  }, [load]);

  const guardAuth = () => {
    if (!getAccessToken()) {
      setNeedsAuth(true);
      return false;
    }
    return true;
  };

  const handleLike = async () => {
    if (!guardAuth() || !prenom) return;
    const wasLiked = liked;
    setLiked(!wasLiked);
    setPrenom({
      ...prenom,
      likesCount: prenom.likesCount + (wasLiked ? -1 : 1),
    });
    try {
      await toggleLike(id);
    } catch {
      setLiked(wasLiked);
      setPrenom((p) =>
        p ? { ...p, likesCount: p.likesCount + (wasLiked ? 1 : -1) } : p,
      );
    }
  };

  const handleSave = async () => {
    if (!guardAuth() || !prenom) return;
    const wasSaved = saved;
    setSaved(!wasSaved);
    setPrenom({
      ...prenom,
      savesCount: prenom.savesCount + (wasSaved ? -1 : 1),
    });
    try {
      await toggleSave(id);
    } catch {
      setSaved(wasSaved);
      setPrenom((p) =>
        p ? { ...p, savesCount: p.savesCount + (wasSaved ? 1 : -1) } : p,
      );
    }
  };

  const handleDownload = async () => {
    if (!guardAuth() || !prenom) return;
    setPrenom({ ...prenom, downloadsCount: prenom.downloadsCount + 1 });
    try {
      await recordDownload(id);
    } catch {
      // pas critique, on ne rollback pas un compteur de téléchargement
    }
  };

  const handleShare = async (channel?: string) => {
    if (!prenom) return; // le partage reste possible sans compte, comme la consultation
    setPrenom({ ...prenom, sharesCount: prenom.sharesCount + 1 });
    if (getAccessToken()) {
      try {
        await recordShare(id, channel);
      } catch {
        /* silencieux */
      }
    }
  };

const addComment = async (message: string) => {
    if (!guardAuth()) return;
    try {
      const res = await postComment(id, message);
      const newComment: ApiComment = {
        _id: res.data._id,
        message: res.data.message,
        createdAt: res.data.createdAt,
        userId: { _id: currentUser?.id ?? "", displayName: currentUser?.displayName ?? "Vous" },
      };
      setComments((prev) => [newComment, ...prev]);
      setPrenom((p) => (p ? { ...p, commentsCount: p.commentsCount + 1 } : p));
    } catch (err) {
      throw err instanceof ApiError ? err : new Error("Impossible d'ajouter le commentaire");
    }
  };

  const displayComments = comments.map((c) => ({
    id: c._id,
    user: c.userId.displayName,
    comment: c.message,
    date: timeAgo(c.createdAt),
  }));

  return {
    prenom,
    comments: displayComments,
    loading,
    liked,
    saved,
    needsAuth,
    setNeedsAuth,
    handleLike,
    handleSave,
    handleDownload,
    handleShare,
    addComment,
  };

}

