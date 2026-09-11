"use client";

import { useRouter } from "next/navigation";
import { MONTHS, WEEKDAYS, daysInMonth, firstWeekdayOfMonth, formatDayKey } from "@/src/lib/calendar-utils";
import { CalendarDay } from "./CalendarDay";
import { CalendarByDay } from "@/src/hooks/useCalendar";

interface CalendarMonthCardProps {
  year: number;
  monthIndex: number;
  byDay: CalendarByDay;
  birthdayDays: Set<string>;
  onLongPressDay: (monthIndex: number, day: number) => void;
}

export function CalendarMonthCard({ year, monthIndex, byDay, birthdayDays, onLongPressDay }: CalendarMonthCardProps) {
  const router = useRouter();
  const total = daysInMonth(year, monthIndex);
  const offset = firstWeekdayOfMonth(year, monthIndex);

  const cells: (number | null)[] = [
    ...Array(offset).fill(null),
    ...Array.from({ length: total }, (_, i) => i + 1),
  ];

  return (
    <div className="border border-primary/10 p-3">
      <button
        type="button"
        onClick={() => router.push(`/calendrier/${year}/${monthIndex + 1}`)}
        className="mb-3 w-full text-left"
      >
        <h3 className="font-righteous text-sm uppercase tracking-wide text-primary">
          {MONTHS[monthIndex]} {year}
        </h3>
      </button>

      <div className="grid grid-cols-7 gap-0.5">
        {WEEKDAYS.map((w, i) => (
          <span key={i} className="text-center font-ui text-[9px] text-gray-400">{w}</span>
        ))}

        {cells.map((day, i) =>
          day === null ? (
            <span key={`empty-${i}`} />
          ) : (
            <CalendarDay
              key={day}
              day={day}
              compact
              hasEntries={!!byDay[formatDayKey(monthIndex, day)]?.length}
              hasBirthday={birthdayDays.has(formatDayKey(monthIndex, day))}
              onClick={() => router.push(`/calendrier/${year}/${monthIndex + 1}/${day}`)}
              onLongPress={() => onLongPressDay(monthIndex, day)}
            />
          ),
        )}
      </div>
    </div>
  );
}