"use client";

import Stats from "@/src/components/stats/Stats";
import {
  IconlyHeart,
  IconlyArrowRight,
  IconlyChevronRight,
  IconlyPlus
} from "@/src/components/ui/icons";
import Navbar from "@/src/components/ui/navbar";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import NewContributionsCard from "@/src/components/cards/NewContributionsCard";
import NotificationsCard from "@/src/components/cards/NotificationsCard";
import FilterCard from "@/src/components/cards/FilterCard";
import { useCreateContribution } from "@/src/hooks/useCreateContribution";
import Alert from "@/src/components/ui/alert";
import { useHomeData } from "@/src/hooks/useHomeData";
import { useCurrentUser } from "@/src/hooks/useCurrentUser";

const categories = [
  {
    title: "Masculins",
    count: 0,
  },
  {
    title: "Féminins",
    count: 0,
  },
  {
    title: "Neutres",
    count: 0,
  },
  {
    title: "Rares",
    count: 0,
  },
  {
    title: "Populaires",
    count: 0,
  },
  {
    title: "Modernes",
    count: 0,
  },
];

const countries = [
  { name: "Togo", count: 0, flag: "🇹🇬", },
  { name: "Ghana", count: 0, flag: "🇬🇭", },
  { name: "Bénin", count: 0, flag: "🇧🇯", },
  { name: "Nigeria", count: 0, flag: "🇳🇬", },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [showContribution, setShowContribution] = useState(false);
  const { submit: submitContribution, loading: submittingContribution, alert: contributionAlert, setAlert: setContributionAlert } = useCreateContribution();
  const { featured, recent, loading: homeLoading, popularityLabel } = useHomeData();
  const { user, loading: userLoading } = useCurrentUser();
  const initial = user?.displayName?.charAt(0).toUpperCase() ?? "?";
  const firstName = user?.displayName?.split(" ")[0] ?? "Explorer";


  return (
    <div className="flex h-screen w-full overflow-hidden bg-background" onClick={() => showContribution && setShowContribution(false)}>

      <main className="relative mx-auto flex h-full w-full flex-col overflow-hidden md:w-[80%] lg:w-180">

        {/* =========================CONTENT========================== */}

        <div className="h-full overflow-y-auto overflow-x-hidden px-4 pb-28 pt-4 scrollbar-none">

          {/* =========================HEADER========================== */}

          <header className="flex h-14 w-full items-center justify-between">

            {userLoading ? (
              <div className="flex animate-pulse items-center gap-3">
                <div className="h-10 w-10 bg-primary/10" />
                <div className="flex flex-col gap-2">
                  <div className="h-3 w-14 bg-primary/10" />
                  <div className="h-2 w-16 bg-primary/10" />
                </div>
              </div>
            ) : (
              <button type="button" className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center bg-primary font-righteous text-xl text-background">
                  {initial}
                </span>
                <div className="flex flex-col gap-1">
                  <h2 className="font-righteous text-md leading-none text-primary">{firstName}</h2>
                  <p className="font-ui text-[10px] font-medium uppercase tracking-wider text-gray-500">Explorer</p>
                </div>
              </button>
            )}

            <NotificationsCard />
          </header>

          {/* Contribution Alert */}
          <section className="absolute top-10 left-1/2 z-50 w-1/2 -translate-x-1/2 px-4 pb-4">
            {contributionAlert && (
              <Alert
                type={contributionAlert.type}
                message={contributionAlert.message}
                onClose={() => setContributionAlert(null)}
              />
            )}
          </section>

          {/* =========================SEARCH========================== */}

          <section className="mt-5 flex w-full items-center gap-2">
            <FilterCard />
          </section>

          {/* =========================HERO========================== */}

          <section className="relative mt-5 overflow-hidden bg-primary p-5">

            {/* décoration */}

            <div className="absolute -right-16 -top-16 h-40 w-40 bg-background/10 rounded-full" />

            <div className="absolute -bottom-20 -right-5 h-48 w-48 bg-background/10 rounded-full" />

            <div className="relative z-10 max-w-md">

              <p className="mb-3 font-ui text-[10px] font-semibold uppercase tracking-[0.2em] text-background/50">
                IZINA · NOM & IDENTITÉ
              </p>

              <h1 className="max-w-sm font-righteous text-3xl leading-tight text-background">
                Le prénom raconte une histoire.
              </h1>

              <p className="mt-3 max-w-sm leading-6 font-ui text-sm text-background/50">
                Explorez les prénoms africains, leur origine,
                leur signification et les histoires qui les rendent
                uniques.
              </p>

              <div className="flex justidy-start items-center gap-2">

                <button type="button" onClick={() => router.push("/names")} className="mt-6 flex items-center gap-3 bg-background px-5 py-3 font-ui text-xs font-semibold text-primary">
                  Découvrir les prénoms
                  <IconlyArrowRight size={16} color="currentColor" />
                </button>

                <button type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowContribution(true);
                  }}
                  className="mt-6 flex items-center gap-3 bg-background/50 px-5 py-3 font-ui text-xs font-semibold text-primary">
                  Contribuer un prénom
                  <IconlyPlus size={16} color="currentColor" />
                </button>

              </div>

            </div>

          </section>

          {/* =========================STATS ========================== */}

          <section className="mt-5 grid grid-cols-3 border border-primary/10"><Stats loading={homeLoading} /></section>

          {/* =========================CATEGORIES========================== */}

          <section className="mt-7">

            <div className="flex items-center justify-between">

              <div>
                <p className="font-ui text-[10px] font-semibold uppercase tracking-widest text-gray-400">Explorer</p>
                <h2 className="mt-1 font-righteous text-xl text-primary">Catégories</h2>
              </div>

              <button type="button" className="font-ui text-xs font-medium text-gray-500">Voir tout</button>

            </div>
            {homeLoading ? (
              <div className="mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-20 min-w-28 shrink-0 animate-pulse bg-primary/5 p-3">
                    <div className="h-2 w-14 bg-primary/10" />
                    <div className="mt-8 h-2 w-16 bg-primary/10" />
                  </div>
                ))}
              </div>
            ) : (

              <div className="mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-none">

                {categories.map((category) => (
                  <button
                    key={category.title}
                    type="button"
                    className="flex h-20 min-w-28 flex-col justify-between bg-primary p-3 text-left text-background"
                  >

                    <span className="font-ui text-xs font-medium">
                      {category.title}
                    </span>

                    <span className="font-ui text-[10px] text-background/50">
                      {category.count} prénoms
                    </span>

                  </button>
                ))}

              </div>
            )
            }

          </section>

          {/* =========================FEATURED NAMES========================== */}

          <section className="mt-7">

            <div className="flex items-end justify-between">

              <div>
                <p className="font-ui text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                  Sélection Izina
                </p>

                <h2 className="mt-1 font-righteous text-xl text-primary">
                  Prénoms à la une
                </h2>
              </div>

              <button
                type="button"
                className="flex items-center gap-1 font-ui text-xs font-medium text-gray-500"
              >
                Explorer
                <IconlyChevronRight
                  size={12}
                  color="currentColor"
                />
              </button>

            </div>

            {
              homeLoading ? (
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {[0, 1, 2, 3].map((i) => (
                    <div key={i} className="min-h-44 animate-pulse border border-primary/10 bg-primary/5 p-4">
                      <div className="h-2 w-16 bg-primary/10" />
                      <div className="mt-4 h-8 w-24 bg-primary/10" />
                      <div className="mt-2 h-2 w-20 bg-primary/10" />
                      <div className="mt-8 h-2 w-full bg-primary/10" />
                      <div className="mt-2 h-2 w-14 bg-primary/10" />
                    </div>
                  ))}
                </div>
              ) : (

                <div className="mt-4 grid grid-cols-2 gap-3">
                  {featured.map((item, index) => (
                    <article
                      key={item._id}
                      className={`relative min-h-44 overflow-hidden border border-primary/10 p-4 ${index === 0 ? "bg-primary text-background" : "bg-background text-primary"
                        }`}
                    >
                      <button
                        type="button"
                        className={`absolute right-3 top-3 flex h-8 w-8 items-center justify-center ${index === 0 ? "bg-background text-primary" : "bg-primary text-background"
                          }`}
                      >
                        <IconlyHeart size={15} color="currentColor" />
                      </button>

                      <div className="flex h-full flex-col justify-between">
                        <div>
                          <span className={`font-ui text-[9px] uppercase tracking-widest ${index === 0 ? "text-background/50" : "text-gray-400"}`}>
                            {item.gender}
                          </span>
                          <h3 className="mt-4 font-righteous text-3xl">{item.label}</h3>
                          <p className={`mt-1 font-ui text-xs ${index === 0 ? "text-background/60" : "text-gray-500"}`}>
                            {item.ethnicGroup?.[0] ?? item.country?.[0] ?? ""}
                          </p>
                        </div>

                        <div>
                          <p className={`font-ui text-xs font-medium ${index === 0 ? "text-background" : "text-primary"}`}>
                            {item.description.fr}
                          </p>
                          <p className={`mt-1 font-ui text-[9px] uppercase tracking-wide ${index === 0 ? "text-background/40" : "text-gray-400"}`}>
                            {popularityLabel(item.likesCount)}
                          </p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )
            }

          </section>

          {/* =========================COUNTRIES========================== */}

          <section className="mt-7">

            <div className="flex items-end justify-between">
              <div>
                <p className="font-ui text-[10px] font-semibold uppercase tracking-widest text-gray-400">Origines</p>
                <h2 className="mt-1 font-righteous text-xl text-primary">Explorer par pays</h2>
              </div>
              <span className="font-ui text-xs text-gray-400">Afrique</span>
            </div>

            {
              homeLoading ? (
                <div className="mt-4 flex flex-col border-t border-primary/10">
                  {[0, 1, 2, 3].map((i) => (
                    <div key={i} className="flex animate-pulse items-center gap-3 border-b border-primary/10 py-4">
                      <div className="h-10 w-10 shrink-0 bg-primary/10" />
                      <div className="flex-1">
                        <div className="h-3 w-16 bg-primary/10" />
                        <div className="mt-2 h-2 w-24 bg-primary/10" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-4 flex flex-col border-t border-primary/10">

                  {countries.map((country) => (
                    <button
                      key={country.name}
                      type="button"
                      className="flex items-center justify-between border-b border-primary/10 py-4"
                    >

                      <div className="flex items-center gap-3">

                        <span className="flex h-10 w-10 items-center justify-center bg-primary text-lg">
                          {country.flag}
                        </span>

                        <div className="text-left">

                          <p className="font-ui text-sm font-semibold text-primary">
                            {country.name}
                          </p>

                          <p className="mt-1 font-ui text-[10px] text-gray-400">
                            {country.count} prénoms disponibles
                          </p>

                        </div>

                      </div>

                      <IconlyChevronRight
                        size={16}
                        color="currentColor"
                      />

                    </button>
                  ))}

                </div>
              )
            }

          </section>

          {/* =========================RECENT NAMES========================== */}

          <section className="mt-7">

            <div className="flex items-end justify-between">

              <div>
                <p className="font-ui text-[10px] font-semibold uppercase tracking-widest text-gray-400">Nouveautés</p>
                <h2 className="mt-1 font-righteous text-xl text-primary">Ajoutés récemment</h2>
              </div>

            </div>

            {
              homeLoading ? (
                <div className="mt-4 flex flex-col gap-2">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="flex animate-pulse items-center gap-3 border border-primary/10 p-3">
                      <div className="h-11 w-11 shrink-0 bg-primary/10" />
                      <div className="flex-1">
                        <div className="h-3 w-20 bg-primary/10" />
                        <div className="mt-2 h-2 w-32 bg-primary/10" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (

                <div className="mt-4 flex flex-col gap-2">
                  {recent.map((item) => (
                    <button key={item._id} type="button" className="flex items-center justify-between border border-primary/10 p-3 text-left">
                      <div className="flex items-center gap-3">
                        <span className="flex h-11 w-11 items-center justify-center bg-primary font-righteous text-lg text-background">
                          {item.label.charAt(0)}
                        </span>
                        <div>
                          <h3 className="font-righteous text-base text-primary">{item.label}</h3>
                          <p className="mt-1 font-ui text-xs text-gray-500">{item.description.fr}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="hidden font-ui text-[10px] uppercase tracking-wide text-gray-400 sm:block">
                          {item.ethnicGroup?.[0] ?? ""}
                        </span>
                        <IconlyChevronRight size={15} color="currentColor" />
                      </div>
                    </button>
                  ))}
                </div>
              )
            }

          </section>

          {/* ========================= CTA========================== */}

          <section className="relative mt-7 overflow-hidden bg-primary p-5">

            <div className="relative z-10">

              <p className="font-ui text-[10px] uppercase tracking-[0.2em] text-background/40">
                Votre histoire commence ici
              </p>

              <h2 className="mt-2 max-w-xs font-righteous text-2xl leading-tight text-background">
                Trouvez un prénom qui a du sens.
              </h2>

              <button
                type="button"
                onClick={() => router.push("/names")}
                className="mt-5 flex items-center gap-2 bg-background px-4 py-3 font-ui text-xs font-semibold text-primary"
              >
                Explorer Izina

                <IconlyArrowRight
                  size={14}
                  color="currentColor"
                />
              </button>

            </div>

            <div className="absolute -bottom-20 -right-10 h-44 w-44 rounded-full border border-background/10" />

          </section>

        </div>

        {/* =========================NAVBAR========================== */}

        <section className="w-full flex justify-center items-center absolute bottom-3 left-0 right-0 z-50 px-4">
          <Navbar />
        </section>

        {/* Bottom Sheet */}
        <section>
          <AnimatePresence>
            {showContribution && (
              <>
                {/* Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full fixed inset-0 z-40 bg-primary/20"
                  onClick={() => setShowContribution(false)}
                />

                {/* Contribution Card */}
                <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
                  transition={{ type: "spring", stiffness: 400, damping: 35, duration: 0.5 }}
                  onClick={(e) => e.stopPropagation()}
                  className="absolute bottom-0 left-0 right-0 z-50 md:w-[80%] lg:w-180 bg-background p-4 h-[70%] overflow-y-auto scrollbar-none"
                >

                  <NewContributionsCard
                    onClose={() => setShowContribution(false)}
                    onSubmit={(data) =>
                      submitContribution(data, () => setShowContribution(false))
                    }
                    loading={submittingContribution}
                  />
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </section>

      </main>

    </div>
  );
}