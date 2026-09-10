"use client";

import FilterCard from "@/src/components/cards/FilterCard";
import {
  IconlyArrowRight, IconlyChevronRight, IconlyHeart, IconlyStarFill,
} from "@/src/components/ui/icons";
import Navbar from "@/src/components/ui/navbar";
import { useRouter } from "next/navigation";
import { useDiscoverData } from "@/src/hooks/useDiscoverData";

const categories = ["Masculins", "Féminins", "Mixtes", "Rares", "Populaires", "Modernes"];

export default function DiscoverPage() {
  const router = useRouter();
  const { surprise, popular, trending, loading } = useDiscoverData();
  // dans DiscoverPage
  const categoryFilters: Record<string, { gender?: string; category?: string }> = {
    "Masculins": { gender: "masculin" },
    "Féminins": { gender: "féminin" },
    "Mixtes": { gender: "neutre" },
    "Rares": { category: "rare" },
    "Populaires": { category: "populaire" },
    "Modernes": { category: "moderne" },
  };

  const handleCategoryClick = (category: string) => {
    const filter = categoryFilters[category];
    if (!filter) return;
    const params = new URLSearchParams(filter as Record<string, string>);
    router.push(`/prenoms?${params.toString()}`);
  };

  return (
    <div className="h-screen w-full overflow-hidden bg-background">
      <main className="relative mx-auto h-full w-full md:w-[80%] lg:w-180">
        <div className="h-full overflow-y-auto overflow-x-hidden scrollbar-none px-4 pb-28 pt-4">

          <header className="flex h-14 items-center justify-between">
            <div>
              <p className="font-ui text-[10px] uppercase tracking-[0.2em] text-gray-400">Izina</p>
              <h1 className="font-righteous text-xl text-primary">Découvrir</h1>
            </div>
          </header>

          <section className="mt-5 flex w-full items-center gap-2">
            <FilterCard />
          </section>

          {/* SURPRISE */}
          {loading ? (
            <section className="mt-5 animate-pulse bg-primary/5 p-5">
              <div className="h-2 w-24 bg-primary/10" />
              <div className="mt-3 h-10 w-20 bg-primary/10" />
              <div className="mt-2 h-2 w-32 bg-primary/10" />
              <div className="mt-4 h-2 w-full bg-primary/10" />
            </section>
          ) : surprise ? (
            <section className="mt-5 bg-primary p-5 text-background">
              <p className="font-ui text-[10px] uppercase tracking-[0.2em] text-background/40">Inspiration du jour</p>

              <div className="mt-3 flex items-end justify-between">
                <div>
                  <h2 className="font-righteous text-4xl">{surprise.label}</h2>
                  <p className="mt-1 font-ui text-xs text-background/60">
                    {surprise.description.fr} · {surprise.ethnicGroup.join(", ")} · {surprise.country.join(", ")}
                  </p>
                </div>
                <button className="flex h-10 w-10 items-center justify-center border border-background/20">
                  <IconlyStarFill size={17} color="currentColor" />
                </button>
              </div>

              <button
                onClick={() => router.push(`/prenoms/${surprise._id}`)}
                className="mt-5 flex items-center gap-2 bg-background px-4 py-3 font-ui text-xs font-semibold text-primary"
              >
                Découvrir ce prénom
                <IconlyArrowRight size={14} color="currentColor" />
              </button>
            </section>
          ) : null}

          {/* CATEGORIES — pas encore de compteurs backend, on garde les libellés statiques pour l'instant */}
          <section className="mt-7">
            <div className="flex items-center justify-between">
              <h2 className="font-righteous text-xl text-primary">Explorer</h2>
              <span className="font-ui text-xs text-gray-400">Catégories</span>
            </div>

            <div className="mt-4 flex gap-2 overflow-x-auto scrollbar-none pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className="shrink-0 bg-primary px-4 py-3 font-ui text-xs font-medium text-background"
                >
                  {category}
                </button>
              ))}
            </div>
          </section>

          {/* POPULAR */}
          <section className="mt-7">
            <div className="flex items-end justify-between">
              <div>
                <p className="font-ui text-[10px] uppercase tracking-widest text-gray-400">Tous les temps</p>
                <h2 className="mt-1 font-righteous text-xl text-primary">Les plus populaires</h2>
              </div>
            </div>

            <div className="mt-4 flex flex-col">
              {loading ? (
                [0, 1, 2].map((i) => (
                  <div key={i} className="flex animate-pulse items-center gap-3 border-b border-primary/10 py-4">
                    <div className="h-11 w-11 shrink-0 bg-primary/10" />
                    <div className="flex-1">
                      <div className="h-3 w-16 bg-primary/10" />
                      <div className="mt-2 h-2 w-32 bg-primary/10" />
                    </div>
                  </div>
                ))
              ) : (
                popular.map((name, index) => (
                  <button
                    key={name._id}
                    onClick={() => router.push(`/prenoms/${name._id}`)}
                    className="flex items-center justify-between border-b border-primary/10 py-4 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-ui text-xs text-gray-400">0{index + 1}</span>
                      <span className="flex h-11 w-11 items-center justify-center bg-primary font-righteous text-lg text-background">
                        {name.label[0]}
                      </span>
                      <div>
                        <h3 className="font-righteous text-base text-primary">{name.label}</h3>
                        <p className="mt-1 font-ui text-xs text-gray-500">{name.description.fr}</p>
                      </div>
                    </div>
                    <IconlyChevronRight size={15} color="currentColor" />
                  </button>
                ))
              )}
            </div>
          </section>

          {/* TRENDING */}
          <section className="mt-7">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-ui text-[10px] uppercase tracking-widest text-gray-400">7 derniers jours</p>
                <h2 className="mt-1 font-righteous text-xl text-primary">Tendances</h2>
              </div>
              <span className="font-ui text-xs text-gray-400">↗ cette semaine</span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              {loading ? (
                [0, 1, 2, 3].map((i) => (
                  <div key={i} className="min-h-36 animate-pulse border border-primary/10 bg-primary/5 p-4">
                    <div className="h-6 w-16 bg-primary/10" />
                    <div className="mt-8 h-2 w-full bg-primary/10" />
                    <div className="mt-2 h-2 w-16 bg-primary/10" />
                  </div>
                ))
              ) : (
                trending.map((name) => (
                  <button
                    key={name._id}
                    onClick={() => router.push(`/prenoms/${name._id}`)}
                    className="min-h-36 border border-primary/10 p-4 text-left"
                  >
                    <div className="flex items-start justify-between">
                      <span className="font-righteous text-2xl text-primary">{name.label}</span>
                      <IconlyHeart size={15} color="currentColor" />
                    </div>
                    <p className="mt-8 font-ui text-xs font-medium text-primary">{name.description.fr}</p>
                    <p className="mt-1 font-ui text-[10px] text-gray-400">{name.ethnicGroup?.[0] ?? ""}</p>
                  </button>
                ))
              )}
            </div>
          </section>

        </div>

        <div className="absolute bottom-3 left-0 right-0 z-50 px-4">
          <Navbar />
        </div>
      </main>
    </div>
  );
}