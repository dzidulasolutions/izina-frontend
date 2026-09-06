import { apiFetch } from "./client";

export type NotificationType =
  | "anniversaire"
  | "contribution_approuvee"
  | "contribution_rejetee"
  | "commentaire_recu";

export interface ApiNotification {
  _id: string;
  type: NotificationType;
  message: { fr: string; en: string };
  referenceId?: string;
  referenceType?: string;
  read: boolean;
  createdAt: string;
}

interface NotificationsListResponse {
  success: boolean;
  message: string;
  data: {
    data: ApiNotification[];
    nextCursor: string | null;
  };
}

interface UnreadCountResponse {
  success: boolean;
  message: string;
  data: { count: number };
}

export const fetchNotifications = (cursor?: string) =>
  apiFetch<NotificationsListResponse>(
    `/notifications${cursor ? `?cursor=${cursor}` : ""}`,
    { method: "GET" },
    true,
  );

export const fetchUnreadCount = () =>
  apiFetch<UnreadCountResponse>("/notifications/unread-count", { method: "GET" }, true);

export const markNotificationRead = (id: string, read: boolean) =>
  apiFetch<{ success: boolean; message: string }>(
    `/notifications/${id}/read`,
    { method: "PATCH", body: JSON.stringify({ read }) },
    true,
  );