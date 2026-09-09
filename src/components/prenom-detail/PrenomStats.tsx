// src/components/prenom-detail/PrenomStats.tsx
export function PrenomStats({ origin, country, popularity, views }: {
  origin: string; country: string; popularity: string; views: number;
}) {
  const items = [
    { label: "Origine", value: origin },
    { label: "Pays", value: country },
    { label: "Popularité", value: popularity },
    { label: "Vues", value: views.toLocaleString() },
  ];

  return (
    <section className="mt-7 grid grid-cols-2 gap-2">
      {items.map((item) => (
        <div key={item.label} className="border border-primary/10 p-4">
          <p className="font-ui text-[10px] uppercase text-gray-400">{item.label}</p>
          <p className="mt-2 font-righteous text-lg">{item.value}</p>
        </div>
      ))}
    </section>
  );
}