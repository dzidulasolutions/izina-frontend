"use client";

import { CalendarMonthCard } from "./CalendarMonthCard";
import { CalendarByDay } from "@/src/hooks/useCalendar";

interface AnnualCalendarProps {
  year: number;
  byDay: CalendarByDay;
  birthdayDays: Set<string>;
  onLongPressDay: (monthIndex: number, day: number) => void;
}

export function AnnualCalendar({ year, byDay, birthdayDays, onLongPressDay }: AnnualCalendarProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {Array.from({ length: 12 }, (_, monthIndex) => (
        <CalendarMonthCard
          key={monthIndex}
          year={year}
          monthIndex={monthIndex}
          byDay={byDay}
          birthdayDays={birthdayDays}
          onLongPressDay={onLongPressDay}
        />
      ))}
    </div>
  );
}