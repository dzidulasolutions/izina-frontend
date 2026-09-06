// Stats.tsx
"use client";

type StatsProps = {
  totalPrenoms?: number;
  totalCountries?: number;
  totalLanguages?: number;
  loading?: boolean;
};

const Stats = ({ totalPrenoms = 0, totalCountries = 0, totalLanguages = 0, loading = false }: StatsProps) => {
  if (loading) {
    return (
      <>
        {[0, 1, 2].map((i) => (
          <div key={i} className={`animate-pulse p-3 ${i < 2 ? "border-r border-primary/10" : ""}`}>
            <div className="h-6 w-10 bg-primary/10" />
            <div className="mt-2 h-2 w-14 bg-primary/10" />
          </div>
        ))}
      </>
    );
  }

  return (
    <>
      <div className="border-r border-primary/10 p-3">
        <p className="font-righteous text-xl text-primary">{totalPrenoms}</p>
        <p className="mt-1 font-ui text-[10px] uppercase tracking-wide text-gray-500">Prénoms</p>
      </div>

      <div className="border-r border-primary/10 p-3">
        <p className="font-righteous text-xl text-primary">{totalCountries}</p>
        <p className="mt-1 font-ui text-[10px] uppercase tracking-wide text-gray-500">Pays</p>
      </div>

      <div className="p-3">
        <p className="font-righteous text-xl text-primary">{totalLanguages}</p>
        <p className="mt-1 font-ui text-[10px] uppercase tracking-wide text-gray-500">Langues</p>
      </div>
    </>
  );
};

export default Stats;