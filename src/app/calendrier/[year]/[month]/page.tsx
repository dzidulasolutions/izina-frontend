// app/calendrier/[year]/[month]/page.tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { IconlyArrowLeft } from "@/src/components/ui/icons";
import { useCalendar } from "@/src/hooks/useCalendar";
import { useUserBirthdays } from "@/src/hooks/useUserBirthdays";
import { BirthdayModal } from "@/src/components/calendar/BirthdayModal";
import { AuthRequiredModal } from "@/src/components/auth/AuthRequiredModal";
import { getAccessToken } from "@/src/lib/auth/storage";
import { MONTHS, daysInMonth, formatDayKey, weekdayName } from "@/src/lib/calendar-utils";

export default function MonthCalendarPage() {
  const router = useRouter();
  const params = useParams();
  const year = Number(params.year);
  const monthIndex = Number(params.month) - 1; // l'URL utilise 1-12, l'index JS est 0-11

  const { byDay, loading } = useCalendar();
  const { birthdayDays, addBirthday, saving } = useUserBirthdays();

  const [modalDate, setModalDate] = useState<{ year: number; monthIndex: number; day: number } | null>(null);
  const [needsAuth, setNeedsAuth] = useState(false);

  const total = daysInMonth(year, monthIndex);
  const days = Array.from({ length: total }, (_, i) => i + 1);

  const handleLongPress = (day: number) => {
    if (!getAccessToken()) {
      setNeedsAuth(true);
      return;
    }
    setModalDate({ year, monthIndex, day });
  };

  const handleAddBirthday = async (data: { label: string; relationship: string; note: string }) => {
    if (!modalDate) return;
    const isoDate = new Date(modalDate.year, modalDate.monthIndex, modalDate.day).toISOString().slice(0, 10);
    await addBirthday({ ...data, date: isoDate });
  };

  return (
    <div className="h-screen w-full overflow-hidden bg-background">
      <main className="relative mx-auto h-full w-full md:w-[80%] lg:w-180">
        <div className="h-full overflow-y-auto overflow-x-hidden scrollbar-none px-4 pb-10 pt-4">

          <header className="flex items-center justify-between">
            <button onClick={() => router.push("/calendrier")} className="flex h-10 w-10 items-center justify-center border border-primary/10">
              <IconlyArrowLeft size={17} color="currentColor" />
            </button>
            <h1 className="font-righteous text-xl text-primary">{MONTHS[monthIndex]} {year}</h1>
            <div className="w-10" />
          </header>

          <div className="mt-6 flex flex-col">
            {loading ? (
              Array.from({ length: 10 }, (_, i) => (
                <div key={i} className="flex animate-pulse items-center gap-3 border-b border-primary/10 py-4">
                  <div className="h-8 w-8 shrink-0 bg-primary/10" />
                  <div className="h-2 w-32 bg-primary/10" />
                </div>
              ))
            ) : (
              days.map((day) => {
                const key = formatDayKey(monthIndex, day);
                const entries = byDay[key] ?? [];
                const hasBirthday = birthdayDays.has(key);

                return (
                  <div
                    key={day}
                    onContextMenu={(e) => { e.preventDefault(); handleLongPress(day); }}
                    className="border-b border-primary/10 py-2"
                  >
                    <div className="flex items-center gap-3 bg-primary/10">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-background font-righteous text-xs border border-primary/10">
                        {String(day).padStart(2, "0")}
                      </span>
                      <div className="w-1/4">
                        <p className="font-ui text-xs font-medium text-primary">{weekdayName(year, monthIndex, day)}</p>
                        {hasBirthday && (
                          <p className="font-ui text-[10px] text-red-500">🎂 Anniversaire</p>
                        )}

                      </div>
                        {entries.length > 0 && (
                        <div className="h-8 w-full bg-primary flex flex-wrap gap-2">
                              {entries.map((entry) => (
                              <button
                              key={entry._id}
                              onClick={() => router.push(`/prenoms/${entry.prenomId._id}`)}
                              className="w-full text-start px-3 py-1.5 font-ui text-xs uppercase text-background"
                              >
                              {entry.prenomId.label}
                              </button>
                              ))}
                        </div>
                        )}
                    </div>

                  </div>
                );
              })
            )}
          </div>
        </div>

        <BirthdayModal
          open={!!modalDate}
          date={modalDate}
          onClose={() => setModalDate(null)}
          onSubmit={handleAddBirthday}
          loading={saving}
        />
        <AuthRequiredModal open={needsAuth} onClose={() => setNeedsAuth(false)} />
      </main>
    </div>
  );
}