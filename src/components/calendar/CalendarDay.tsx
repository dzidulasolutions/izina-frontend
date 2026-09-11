"use client";

import { useRef } from "react";

interface CalendarDayProps {
  day: number;
  hasEntries: boolean;
  hasBirthday: boolean;
  onClick: () => void;
  onLongPress: () => void;
  compact?: boolean; // true = vue annuelle (petite case), false = vue mensuelle
}

const LONG_PRESS_DURATION = 500;

export function CalendarDay({ day, hasEntries, hasBirthday, onClick, onLongPress, compact = true }: CalendarDayProps) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggeredRef = useRef(false);

  const start = () => {
    triggeredRef.current = false;
    timerRef.current = setTimeout(() => {
      triggeredRef.current = true;
      onLongPress();
    }, LONG_PRESS_DURATION);
  };

  const cancel = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const handleClick = () => {
    if (triggeredRef.current) return; // évite de déclencher le clic après un appui long
    onClick();
  };

  return (
    <button
      type="button"
      onMouseDown={start}
      onMouseUp={cancel}
      onMouseLeave={cancel}
      onTouchStart={start}
      onTouchEnd={cancel}
      onClick={handleClick}
      className={`relative flex items-center justify-center font-ui transition-colors ${
        compact
          ? "aspect-square text-[10px] text-primary hover:bg-primary/5"
          : "h-11 w-11 text-xs text-primary hover:bg-primary/5"
      }`}
    >
      {day}
      {hasEntries && (
        <span className="absolute bottom-0.5 h-1 w-1 rounded-full bg-primary" />
      )}
      {hasBirthday && (
        <span className="absolute right-0.5 top-0.5 h-1.5 w-1.5 rounded-full bg-red-500" />
      )}
    </button>
  );
}