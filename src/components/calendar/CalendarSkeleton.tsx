export function CalendarSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {Array.from({ length: 12 }, (_, i) => (
        <div key={i} className="animate-pulse border border-primary/10 p-3">
          <div className="mb-3 h-3 w-24 bg-primary/10" />
          <div className="grid grid-cols-7 gap-0.5">
            {Array.from({ length: 35 }, (_, j) => (
              <div key={j} className="aspect-square bg-primary/5" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}