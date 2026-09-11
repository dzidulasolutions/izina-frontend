"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IconlyArrowLeft } from "@/src/components/ui/icons";
import { useCalendar } from "@/src/hooks/useCalendar";
import { useUserBirthdays } from "@/src/hooks/useUserBirthdays";
import { AnnualCalendar } from "@/src/components/calendar/AnnualCalendar";
import { CalendarSkeleton } from "@/src/components/calendar/CalendarSkeleton";
import { BirthdayModal } from "@/src/components/calendar/BirthdayModal";
import { AuthRequiredModal } from "@/src/components/auth/AuthRequiredModal";
import { getAccessToken } from "@/src/lib/auth/storage";

const CURRENT_YEAR = new Date().getFullYear();

export default function CalendrierPage() {
  const router = useRouter();
  const { byDay, loading } = useCalendar();
  const { birthdayDays, addBirthday, saving } = useUserBirthdays();

  const [modalDate, setModalDate] = useState<{ year: number; monthIndex: number; day: number } | null>(null);
  const [needsAuth, setNeedsAuth] = useState(false);

  const handleLongPressDay = (monthIndex: number, day: number) => {
    if (!getAccessToken()) {
      setNeedsAuth(true);
      return;
    }
    setModalDate({ year: CURRENT_YEAR, monthIndex, day });
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
            <button onClick={() => router.back()} className="flex h-10 w-10 items-center justify-center border border-primary/10">
              <IconlyArrowLeft size={17} color="currentColor" />
            </button>
            <div className="text-center">
              <p className="font-ui text-[9px] uppercase tracking-[0.25em] text-gray-400">Izina</p>
              <h1 className="font-righteous text-xl text-primary">Calendrier</h1>
            </div>
            <div className="w-10" />
          </header>

          <p className="mt-4 text-center font-ui text-sm text-gray-500">
            Les prénoms associés à chaque jour
          </p>

          <section className="mt-6">
            {loading ? (
              <CalendarSkeleton />
            ) : (
              <AnnualCalendar
                year={CURRENT_YEAR}
                byDay={byDay}
                birthdayDays={birthdayDays}
                onLongPressDay={handleLongPressDay}
              />
            )}
          </section>
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