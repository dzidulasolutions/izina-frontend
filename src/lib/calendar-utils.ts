export const MONTHS = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
];

export const WEEKDAYS = ["L", "M", "M", "J", "V", "S", "D"];

export function daysInMonth(year: number, monthIndex: number): number {
  return new Date(year, monthIndex + 1, 0).getDate();
}

// Retourne l'index (0 = Lundi ... 6 = Dimanche) du premier jour du mois
export function firstWeekdayOfMonth(year: number, monthIndex: number): number {
  const jsDay = new Date(year, monthIndex, 1).getDay(); // 0 = Dimanche en JS
  return jsDay === 0 ? 6 : jsDay - 1;
}

export function formatDayKey(monthIndex: number, day: number): string {
  const mm = String(monthIndex + 1).padStart(2, "0");
  const dd = String(day).padStart(2, "0");
  return `${mm}-${dd}`;
}

export function weekdayName(year: number, monthIndex: number, day: number): string {
  const names = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
  return names[new Date(year, monthIndex, day).getDay()];
}