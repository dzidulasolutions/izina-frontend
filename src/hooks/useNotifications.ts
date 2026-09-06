import { useEffect, useState, useCallback } from "react";
import {
  fetchNotifications,
  fetchUnreadCount,
  markNotificationRead,
  ApiNotification,
  NotificationType,
} from "@/src/lib/api/notifications";

// Traduit le type technique du backend en titre lisible côté UI
const notificationTitles: Record<NotificationType, string> = {
  anniversaire: "Anniversaire",
  contribution_approuvee: "Contribution validée",
  contribution_rejetee: "Contribution refusée",
  commentaire_recu: "Nouveau commentaire",
};

// Formatte une date en "il y a X min/h/jours"
function timeAgo(dateString: string): string {
  const diffMs = Date.now() - new Date(dateString).getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "À l'instant";
  if (diffMin < 60) return `Il y a ${diffMin} min`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `Il y a ${diffH} h`;
  const diffJ = Math.floor(diffH / 24);
  if (diffJ === 1) return "Hier";
  return `Il y a ${diffJ} jours`;
}

export interface DisplayNotification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  time: string;
  read: boolean;
}

function toDisplay(n: ApiNotification): DisplayNotification {
  return {
    id: n._id,
    type: n.type,
    title: notificationTitles[n.type] ?? "Notification",
    description: n.message.fr,
    time: timeAgo(n.createdAt),
    read: n.read,
  };
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<DisplayNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [listRes, countRes] = await Promise.all([
        fetchNotifications(),
        fetchUnreadCount(),
      ]);
      setNotifications(listRes.data.data.map(toDisplay));
      setUnreadCount(countRes.data.count);
    } catch {
      // silencieux : pas de notifications visibles en cas d'échec, pas bloquant pour l'app
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
      load();
  }, [load]);

  const markAsRead = async (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    setUnreadCount((prev) => Math.max(0, prev - 1));
    try {
      await markNotificationRead(id, true);
    } catch {
      load(); // resynchronise en cas d'échec silencieux
    }
  };

  const markAllAsRead = async () => {
    const unread = notifications.filter((n) => !n.read);
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setUnreadCount(0);
    await Promise.all(unread.map((n) => markNotificationRead(n.id, true).catch(() => null)));
  };

  return { notifications, unreadCount, loading, markAsRead, markAllAsRead };
}