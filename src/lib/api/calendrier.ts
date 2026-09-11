import { apiFetch } from "./client";

export interface CalendrierEntry {
  _id: string;
  day: string; // format "MM-DD"
  prenomId: { _id: string; label: string; description: { fr: string; en: string }; gender: string };
  isSpecialDay: boolean;
  specialDayLabel?: string;
}

interface CalendrierListResponse {
  success: boolean;
  message: string;
  data: CalendrierEntry[];
}

export const fetchFullCalendar = () =>
  apiFetch<CalendrierListResponse>("/calendrier", { method: "GET" });

export const fetchCalendarDay = (day: string) =>
  apiFetch<CalendrierListResponse>(`/calendrier/${day}`, { method: "GET" });