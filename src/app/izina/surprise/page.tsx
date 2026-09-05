"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  IconlyArrowLeft,
  IconlyBookmark,
  IconlyHeartFill,
  IconlyStar,
} from "@/src/components/ui/icons";

type Gender = "Tous" | "Masculin" | "Féminin" | "Mixte";
type Category = "Tous" | "Populaire" | "Rare" | "Moderne" | "Traditionnel";

interface FakeName {
  id: string;
  name: string;
  meaning: string;
  origin: string;
  country: string;
  gender: Exclude<Gender, "Tous">;
  category: Exclude<Category, "Tous">;
}

const fakeNames: FakeName[] = [
  {
    id: "1",
    name: "Kossi",
    meaning: "Né un dimanche",
    origin: "Ewe",
    country: "Togo",
    gender: "Masculin",
    category: "Traditionnel",
  },
  {
    id: "2",
    name: "Ama",
    meaning: "Née un samedi",
    origin: "Akan",
    country: "Ghana",
    gender: "Féminin",
    category: "Populaire",
  },
  {
    id: "3",
    name: "Sena",
    meaning: "Destinée, grâce",
    origin: "Ewe",
    country: "Togo",
    gender: "Mixte",
    category: "Moderne",
  },
  {
    id: "4",
    name: "Kwame",
    meaning: "Né un samedi",
    origin: "Akan",
    country: "Ghana",
    gender: "Masculin",
    category: "Populaire",
  },
  {
    id: "5",
    name: "Afi",
    meaning: "Née un vendredi",
    origin: "Ewe",
    country: "Togo",
    gender: "Féminin",
    category: "Rare",
  },
  {
    id: "6",
    name: "Mawuli",
    meaning: "Dieu existe",
    origin: "Ewe",
    country: "Togo",
    gender: "Masculin",
    category: "Traditionnel",
  },
  {
    id: "7",
    name: "Adjoa",
    meaning: "Née un lundi",
    origin: "Akan",
    country: "Ghana",
    gender: "Féminin",
    category: "Traditionnel",
  },
  {
    id: "8",
    name: "Eyram",
    meaning: "La paix est avec moi",
    origin: "Ewe",
    country: "Togo",
    gender: "Mixte",
    category: "Moderne",
  },
];

const genders: Gender[] = [
  "Tous",
  "Masculin",
  "Féminin",
  "Mixte",
];

const categories: Category[] = [
  "Tous",
  "Populaire",
  "Rare",
  "Moderne",
  "Traditionnel",
];

export default function SurprisePage() {
  const router = useRouter();

  const [gender, setGender] = useState<Gender>("Tous");
  const [category, setCategory] = useState<Category>("Tous");

  const [selectedName, setSelectedName] = useState<FakeName | null>(null);

  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);

  const filteredNames = fakeNames.filter((item) => {
    const genderMatch =
      gender === "Tous" || item.gender === gender;

    const categoryMatch =
      category === "Tous" || item.category === category;

    return genderMatch && categoryMatch;
  });

  const generateName = () => {
    if (isSpinning || filteredNames.length === 0) return;

    setIsSpinning(true);

    const randomIndex = Math.floor(
      Math.random() * filteredNames.length
    );

    const randomName = filteredNames[randomIndex];

    /*
     * Plusieurs tours pour donner une vraie impression
     * de roue qui tourne.
     */
    setRotation((prev) => prev + 1440 + Math.floor(Math.random() * 360));

    setTimeout(() => {
      setSelectedName(randomName);
      setIsSpinning(false);
    }, 1800);
  };

  return (
    <div className="h-screen w-full overflow-hidden bg-background scrollbar-none">

      <main className="relative mx-auto h-full w-full md:w-[80%] lg:w-180">

        <div className="h-full overflow-y-auto overflow-x-hidden scrollbar-none px-4 pb-10 pt-4">

          {/* HEADER */}
          <header className="flex items-center justify-between">

            <button onClick={() => router.back()} className="flex h-10 w-10 items-center justify-center border border-primary/10">
              <IconlyArrowLeft size={17} color="currentColor" />
            </button>

            <div className="text-center">
              <p className="font-ui text-[9px] uppercase tracking-[0.25em] text-gray-400">Générateur</p>
              <h1 className="font-righteous text-xl text-primary"> Surprise</h1>
            </div>

            <div className="w-10" />

          </header>

          {/* INTRO */}
          <section className="mt-6">
            <p className="font-ui text-[10px] uppercase tracking-[0.2em] text-gray-400"> Trouvez l&apos;inspiration</p>
            <h2 className="mt-1 max-w-md font-righteous text-3xl leading-tight text-primary">Et si le prochain prénom <br /> était le bon ?</h2>
            <p className="mt-3 max-w-md font-ui text-sm leading-5 text-gray-500">Choisissez vos préférences ou laissez Izina décider pour vous.</p>
          </section>


          {/* FILTERS */}
          <section className="mt-7">

            <div className="flex items-center justify-between">
              <p className="font-ui text-[10px] uppercase tracking-widest text-gray-400">Genre</p>
              <span className="font-ui text-[10px] text-gray-400">{filteredNames.length} prénoms</span>
            </div>

            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {genders.map((item) => {
                const active = gender === item;
                return (
                  <button key={item} onClick={() => { setGender(item); setSelectedName(null);}} className={`shrink-0 px-4 py-2.5 font-ui text-xs font-medium transition ${
                      active ? "bg-primary text-background" : "border border-primary/10 text-primary" }`}>
                    {item}
                  </button>
                );
              })}
            </div>

            <p className="mt-5 font-ui text-[10px] uppercase tracking-widest text-gray-400"> Style</p>

            <div className="mt-3 flex flex-wrap gap-2">
              {categories.map((item) => {
                const active = category === item;
                return (

                  <button
                    key={item}
                    onClick={() => { setCategory(item); setSelectedName(null);}}
                    className={`px-4 py-2.5 font-ui text-xs font-medium transition ${ active ? "bg-primary text-background" : "border border-primary/10 text-primary" }`} >
                    {item}
                  </button>

                );
              })}
            </div>

          </section>


          {/* WHEEL */}
          <section className="mt-8 flex flex-col items-center">

            <div className="relative">

              {/* POINTER */}
              <div className="absolute -top-3 left-1/2 z-20 -translate-x-1/2">
                <div className=" h-0 w-0 border-l-[9px] border-r-[9px] border-t-18 border-l-transparent border-r-transparent border-t-primary"/>
              </div>

              {/* WHEEL */}
              <div className="relative flex h-64 w-64 items-center justify-center rounded-full border-10 border-primary bg-background"
                style={{  transform: `rotate(${rotation}deg)`, transition: isSpinning ? "transform 1.8s cubic-bezier(0.12, 0.8, 0.18, 1)": "none",}}
              >

                {/* SEGMENTS */}
                <div className="absolute inset-2 overflow-hidden rounded-full">
                  <div className="absolute left-1/2 top-0 h-1/2 w-1/2 origin-bottom-left border-l border-b border-primary/10 bg-primary" />
                  <div className="absolute bottom-0 left-0 h-1/2 w-1/2 origin-top-right border-r border-t border-primary/10 bg-primary" />
                  <div className="absolute right-0 top-0 h-1/2 w-1/2 border-l border-b border-primary/10 bg-background" />
                  <div className="absolute bottom-0 right-0 h-1/2 w-1/2 border-l border-t border-primary/10 bg-background" />
                </div>

                {/* CENTER */}
                <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-background">
                  <span className="font-righteous text-xl text-primary">IZINA</span>
                </div>

              </div>

            </div>


            {/* BUTTON */}
            <button onClick={generateName} disabled={isSpinning || filteredNames.length === 0} className="mt-7 flex w-full max-w-xs items-center justify-center gap-2 bg-primary px-6 py-4 font-ui text-sm font-semibold text-background disabled:cursor-not-allowed disabled:opacity-50">
              <IconlyStar size={17} color="currentColor"/>
              {isSpinning  ? "Izina cherche pour vous..." : "Lancer la surprise"}
            </button>
          </section>


          {/* RESULT */}
          {selectedName && !isSpinning && (

            <section className="mt-8">

              <div className="border border-primary/10 p-5">

                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-ui text-[10px] uppercase tracking-[0.2em] text-gray-400">Votre prénom</p>
                    <h2 className="mt-2 font-righteous text-4xl text-primary">{selectedName.name}</h2>
                  </div>
                  <span className="flex h-10 w-10 items-center justify-center bg-primary font-righteous text-background">{selectedName.name[0]}</span>
                </div>

                <div className="mt-6">
                  <p className="font-ui text-[10px] uppercase tracking-widest text-gray-400">Signification</p>
                  <p className="mt-2 font-righteous text-xl text-primary"> {selectedName.meaning}</p>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="bg-primary px-3 py-2 font-ui text-[10px] text-background">{selectedName.origin}</span>
                  <span className="border border-primary/10 px-3 py-2 font-ui text-[10px]">{selectedName.country}</span>
                  <span className="border border-primary/10 px-3 py-2 font-ui text-[10px]">{selectedName.category}</span>
                </div>

                {/* ACTIONS */}
                <div className="mt-5 grid grid-cols-2 gap-2">
                  <button className="flex items-center justify-center gap-2 border border-primary/10 py-3 font-ui text-xs font-semibold">
                    <IconlyBookmark size={15} color="currentColor" />
                    Enregistrer
                  </button>

                  <button onClick={generateName} className="flex items-center justify-center gap-2 bg-primary py-3 font-ui text-xs font-semibold text-background">
                    <IconlyStar size={15} color="currentColor" />
                    Encore un
                  </button>
                </div>

              </div>

            </section>

          )}

          {/* EMPTY */}
          {filteredNames.length === 0 && (
            <div className="mt-8 border border-primary/10 p-6 text-center">
              <p className="font-righteous text-lg">Aucun prénom trouvé</p>
              <p className="mt-2 font-ui text-xs text-gray-500">Essayez une autre combinaison de filtres.</p>
            </div>
          )}

          {/* FOOTER MESSAGE */}
          <section className="mt-10 border-t border-primary/10 pt-5">

            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center bg-primary text-background"><IconlyHeartFill size={15} color="currentColor" /></div>
              <p className="font-ui text-xs leading-5 text-gray-500"> Un prénom peut être bien plus qu&apos;un nom. Il peut raconter une histoire.</p>
            </div>

          </section>

        </div>

      </main>

    </div>
  );
}