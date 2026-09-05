"use client";

import {
  IconlyArrowLeft,
  IconlyArrowRight,
  IconlyMore,
} from "@/src/components/ui/icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import NewContributionsCard from "@/src/components/cards/NewContributionsCard";

const contributions = [
  {
    id: "1",
    name: "Kossi",
    meaning: "Né un dimanche",
    status: "Approuvé",
  },
  {
    id: "2",
    name: "Akou",
    meaning: "Prénom traditionnel Ewe",
    status: "En attente",
  },
  {
    id: "3",
    name: "Sena",
    meaning: "Destinée / grâce",
    status: "Approuvé",
  },
];

const contributors = [
  {
    rank: "01",
    name: "Mawuli",
    contributions: 42,
  },
  {
    rank: "02",
    name: "Kossi",
    contributions: 31,
  },
  {
    rank: "03",
    name: "Akoss",
    contributions: 27,
  },
];

export default function ContributionsPage() {
  const router = useRouter();
  const [showContribution, setShowContribution] = useState(false);
  return (
    <div className="h-screen w-full overflow-hidden bg-background">

      <main className="mx-auto h-full w-full overflow-y-auto scrollbar-none md:w-[80%] lg:w-180" onClick={() => showContribution && setShowContribution(false)}>

        <div className="px-4 pb-10 pt-4">

          {/* HEADER */}
          <header className="flex items-center justify-between">

            <button
              onClick={() => router.back()}
              className="flex h-10 w-10 items-center justify-center border border-primary/10"
            >
              <IconlyArrowLeft size={17} />
            </button>

            <h1 className="font-righteous text-xl">
              Contributions
            </h1>

            <button
              onClick={() => router.push("/contributions/create")}
              className="flex h-10 w-10 items-center justify-center bg-primary text-background"
            >
              <IconlyMore size={17} color="currentColor" />
            </button>

          </header>

          {/* PROFILE CONTRIBUTOR */}
          <section className="mt-5 bg-primary p-5 text-background">

            <p className="font-ui text-[10px] uppercase tracking-[0.2em] text-background/40">
              Votre impact
            </p>

            <div className="mt-4 flex items-end justify-between">

              <div>
                <h2 className="font-righteous text-4xl">
                  31
                </h2>

                <p className="mt-1 font-ui text-xs text-background/60">
                  prénoms proposés
                </p>
              </div>

              <div className="text-right">
                <p className="font-righteous text-xl">
                  #02
                </p>

                <p className="font-ui text-[10px] text-background/50">
                  classement
                </p>
              </div>

            </div>

            <div className="mt-5 h-1 bg-background/10">
              <div className="h-full w-[72%] bg-background" />
            </div>

            <p className="mt-2 font-ui text-[10px] text-background/40">
              Encore 11 contributions pour atteindre le niveau Expert.
            </p>

          </section>

          {/* ACTION */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowContribution(true);
            }}
            className="mt-3 flex w-full items-center justify-between border border-primary/10 p-4">

            <div className="text-left">

              <p className="font-ui text-[10px] uppercase tracking-widest text-gray-400">Participer</p>

              <p className="mt-1 font-righteous text-lg">Ajouter un prénom</p>

            </div>
            <span className="flex h-10 w-10 items-center justify-center bg-primary text-background">
              <IconlyArrowRight size={17} color="currentColor" />
            </span>

          </button>

          {/* MY CONTRIBUTIONS */}
          <section className="mt-8">

            <div className="flex items-end justify-between">

              <div>
                <p className="font-ui text-[10px] uppercase tracking-widest text-gray-400">
                  Votre activité
                </p>

                <h2 className="mt-1 font-righteous text-xl">
                  Mes contributions
                </h2>
              </div>

              <span className="font-ui text-xs text-gray-400">
                31 total
              </span>

            </div>

            <div className="mt-4 flex flex-col">

              {contributions.map((item) => (

                <div
                  key={item.id}
                  className="flex items-center justify-between border-b border-primary/10 py-4"
                >

                  <div className="flex items-center gap-3">

                    <span className="flex h-10 w-10 items-center justify-center bg-primary font-righteous text-sm text-background">
                      {item.name[0]}
                    </span>

                    <div>
                      <h3 className="font-righteous text-base">
                        {item.name}
                      </h3>

                      <p className="mt-1 font-ui text-xs text-gray-500">
                        {item.meaning}
                      </p>
                    </div>

                  </div>

                  <span
                    className={`font-ui text-[10px] font-semibold ${item.status === "Approuvé"
                      ? "text-green-600"
                      : "text-orange-500"
                      }`}
                  >
                    {item.status}
                  </span>

                </div>

              ))}

            </div>

          </section>

          {/* TOP CONTRIBUTORS */}
          <section className="mt-8">

            <div>
              <p className="font-ui text-[10px] uppercase tracking-widest text-gray-400">
                Communauté
              </p>

              <h2 className="mt-1 font-righteous text-xl">
                Top contributeurs
              </h2>
            </div>

            <div className="mt-4 bg-primary text-background">

              {contributors.map((item, index) => (

                <div
                  key={item.rank}
                  className={`flex items-center justify-between p-4 ${index !== contributors.length - 1
                    ? "border-b border-background/10"
                    : ""
                    }`}
                >

                  <div className="flex items-center gap-3">

                    <span className="font-ui text-xs text-background/40">
                      {item.rank}
                    </span>

                    <span className="flex h-9 w-9 items-center justify-center bg-background font-righteous text-primary">
                      {item.name[0]}
                    </span>

                    <span className="font-ui text-sm font-medium">
                      {item.name}
                    </span>

                  </div>

                  <span className="font-ui text-xs text-background/50">
                    {item.contributions} contributions
                  </span>

                </div>

              ))}

            </div>

          </section>

          <section>
            <section>
              <AnimatePresence>
                {showContribution && (
                  <>
                    {/* Overlay */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-40 bg-primary/40"
                      onClick={() => setShowContribution(false)}
                    />

                    {/* Contribution Card */}
                    <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
                      transition={{ type: "spring", stiffness: 400, damping: 35, duration: 0.5 }}
                      onClick={(e) => e.stopPropagation()}
                      className="fixed bottom-0 left-0 z-50 w-full bg-background p-4 h-[70%] overflow-y-auto scrollbar-none"
                    >

                      {/* 
                                    <ContributionsCard
                                      contribution={{
                                        label: "Afia",
                                        description: {
                                          fr: "Née un vendredi",
                                          en: "Born on Friday",
                                        },
                                        category: ["traditionnel"],
                                        country: ["Togo", "Ghana"],
                                        ethnicGroup: ["Éwé"],
                                        gender: "féminin",
                                      }}
                                    /> 
                                    */}
                      <NewContributionsCard
                        onClose={() => setShowContribution(false)}
                        onSubmit={(data) => {
                          console.log(data);
                        }}
                      />
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </section>
          </section>

        </div>

      </main>

    </div>
  );
}