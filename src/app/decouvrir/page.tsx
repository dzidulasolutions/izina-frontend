"use client";

import {
  IconlyArrowRight,
  IconlyChevronRight,
  IconlyFilter,
  IconlyHeart,
  IconlyNotification,
  IconlySearch,
  IconlyStarFill,
} from "@/src/components/ui/icons";
import Navbar from "@/src/components/ui/navbar";
import { useRouter } from "next/navigation";

const popularNames = [
  {
    id: "1",
    name: "Kossi",
    meaning: "Né un dimanche",
    origin: "Ewe",
    country: "Togo",
    gender: "Masculin",
    views: "2.4K",
  },
  {
    id: "2",
    name: "Ama",
    meaning: "Née un samedi",
    origin: "Akan",
    country: "Ghana",
    gender: "Féminin",
    views: "1.9K",
  },
  {
    id: "3",
    name: "Kwame",
    meaning: "Né un samedi",
    origin: "Akan",
    country: "Ghana",
    gender: "Masculin",
    views: "1.7K",
  },
];

const trendingNames = [
  {
    id: "4",
    name: "Sena",
    meaning: "Destinée / grâce",
    origin: "Ewe",
  },
  {
    id: "5",
    name: "Nadia",
    meaning: "Espoir",
    origin: "Afrique de l'Ouest",
  },
  {
    id: "6",
    name: "Afi",
    meaning: "Née un vendredi",
    origin: "Ewe",
  },
];

const categories = [
  "Masculins",
  "Féminins",
  "Mixtes",
  "Rares",
  "Populaires",
  "Modernes",
];

export default function DiscoverPage() {
  const router = useRouter();

  return (
    <div className="h-screen w-full overflow-hidden bg-background">
      <main className="relative mx-auto h-full w-full md:w-[80%] lg:w-180">

        <div className="h-full overflow-y-auto overflow-x-hidden scrollbar-none px-4 pb-28 pt-4">

          {/* HEADER */}
          <header className="flex h-14 items-center justify-between">

            <div>
              <p className="font-ui text-[10px] uppercase tracking-[0.2em] text-gray-400">
                Izina
              </p>

              <h1 className="font-righteous text-xl text-primary">
                Découvrir
              </h1>
            </div>

            <button className="relative flex h-10 w-10 items-center justify-center bg-primary text-background">
              <IconlyNotification size={18} color="currentColor" />

              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 font-ui text-[9px] text-white">
                2
              </span>
            </button>

          </header>

          {/* SEARCH */}
          <div className="mt-5 flex gap-2">

            <div className="flex h-11 flex-1 items-center border border-primary/20">

            <span className="ml-3">
              <IconlySearch
                size={17}
                color="currentColor"
              />
            </span>

              <input
                placeholder="Rechercher un prénom..."
                className="h-full w-full bg-transparent px-3 font-ui text-xs outline-none"
              />

            </div>

            <button className="flex h-11 w-11 items-center justify-center bg-primary text-background">
              <IconlyFilter size={18} color="currentColor" />
            </button>

          </div>

          {/* SURPRISE */}
          <section className="mt-5 bg-primary p-5 text-background">

            <p className="font-ui text-[10px] uppercase tracking-[0.2em] text-background/40">
              Inspiration du jour
            </p>

            <div className="mt-3 flex items-end justify-between">

              <div>
                <h2 className="font-righteous text-4xl">
                  Afi
                </h2>

                <p className="mt-1 font-ui text-xs text-background/60">
                  Née un vendredi · Ewe · Togo
                </p>
              </div>

              <button className="flex h-10 w-10 items-center justify-center border border-background/20">
                <IconlyStarFill size={17} color="currentColor" />
              </button>

            </div>

            <p className="mt-4 max-w-sm font-ui text-sm leading-5 text-background/70">
              Un prénom simple, profond et chargé d’histoire.
              Découvrez son origine et sa signification.
            </p>

            <button
              onClick={() => router.push("/prenoms/6")}
              className="mt-5 flex items-center gap-2 bg-background px-4 py-3 font-ui text-xs font-semibold text-primary"
            >
              Découvrir ce prénom
              <IconlyArrowRight size={14} color="currentColor" />
            </button>

          </section>

          {/* CATEGORIES */}
          <section className="mt-7">

            <div className="flex items-center justify-between">
              <h2 className="font-righteous text-xl text-primary">
                Explorer
              </h2>

              <span className="font-ui text-xs text-gray-400">
                Catégories
              </span>
            </div>

            <div className="mt-4 flex gap-2 overflow-x-auto scrollbar-none pb-2">

              {categories.map((category) => (
                <button
                  key={category}
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
                <p className="font-ui text-[10px] uppercase tracking-widest text-gray-400">
                  Tous les temps
                </p>

                <h2 className="mt-1 font-righteous text-xl text-primary">
                  Les plus populaires
                </h2>
              </div>

              <button className="font-ui text-xs text-gray-500">
                Voir tout
              </button>

            </div>

            <div className="mt-4 flex flex-col">

              {popularNames.map((name, index) => (

                <button
                  key={name.id}
                  onClick={() => router.push(`/prenoms/${name.id}`)}
                  className="flex items-center justify-between border-b border-primary/10 py-4 text-left"
                >

                  <div className="flex items-center gap-3">

                    <span className="font-ui text-xs text-gray-400">
                      0{index + 1}
                    </span>

                    <span className="flex h-11 w-11 items-center justify-center bg-primary font-righteous text-lg text-background">
                      {name.name[0]}
                    </span>

                    <div>
                      <h3 className="font-righteous text-base text-primary">
                        {name.name}
                      </h3>

                      <p className="mt-1 font-ui text-xs text-gray-500">
                        {name.meaning}
                      </p>
                    </div>

                  </div>

                  <IconlyChevronRight size={15} color="currentColor" />

                </button>

              ))}

            </div>

          </section>

          {/* TRENDING */}
          <section className="mt-7">

            <div className="flex items-center justify-between">

              <div>
                <p className="font-ui text-[10px] uppercase tracking-widest text-gray-400">
                  7 derniers jours
                </p>

                <h2 className="mt-1 font-righteous text-xl text-primary">
                  Tendances
                </h2>
              </div>

              <span className="font-ui text-xs text-gray-400">
                ↗ cette semaine
              </span>

            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">

              {trendingNames.map((name) => (

                <button
                  key={name.id}
                  onClick={() => router.push(`/prenoms/${name.id}`)}
                  className="min-h-36 border border-primary/10 p-4 text-left"
                >

                  <div className="flex items-start justify-between">

                    <span className="font-righteous text-2xl text-primary">
                      {name.name}
                    </span>

                    <IconlyHeart size={15} color="currentColor" />

                  </div>

                  <p className="mt-8 font-ui text-xs font-medium text-primary">
                    {name.meaning}
                  </p>

                  <p className="mt-1 font-ui text-[10px] text-gray-400">
                    {name.origin}
                  </p>

                </button>

              ))}

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