"use client";
import { IconlyArrowLeft, IconlyArrowRight, IconlyMore, } from "@/src/components/ui/icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import NewContributionsCard from "@/src/components/cards/NewContributionsCard";
import { useCreateContribution } from "@/src/hooks/useCreateContribution";
import Alert from "@/src/components/ui/alert";
import { useContributionsData } from "@/src/hooks/useContributionsData";
import { fetchPrenomById } from "@/src/lib/api/prenoms";
import { PrenomDetail } from "@/src/lib/api/prenoms";


export default function ContributionsPage() {
  const router = useRouter();
  const [editingContribution, setEditingContribution] = useState<PrenomDetail | null>(null);
  const [showContribution, setShowContribution] = useState(false);
  const { contributions, topContributors, loading: dataLoading, publishedCount, totalCount, statusLabels, statusColors, removeContribution, editContribution, actionLoading, actionAlert, setActionAlert } = useContributionsData();
  const { submit: submitContribution, loading: submittingContribution, alert: contributionAlert, setAlert: setContributionAlert } = useCreateContribution();
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  return (
    <div className="h-screen w-full overflow-hidden bg-background">

      <main className="relative mx-auto h-full w-full overflow-y-auto scrollbar-none md:w-[80%] lg:w-180" onClick={() => showContribution && setShowContribution(false)}>

        <div className="-full overflow-y-auto overflow-x-hidden px-4 pb-10 pt-4 scrollbar-none">

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
            <button></button>

          </header>

          {/* Contribution Alert */}
          <section className="absolute top-10 left-1/2 z-50 w-1/2 -translate-x-1/2 px-4 pb-4">
            {contributionAlert && (
              <Alert type={contributionAlert.type} message={contributionAlert.message} onClose={() => setContributionAlert(null)} />
            )}
            {actionAlert && (
              <Alert type={actionAlert.type} message={actionAlert.message} onClose={() => setActionAlert(null)} />
            )}
          </section>

          {/* PROFILE CONTRIBUTOR */}
          {dataLoading ? (
            <section className="mt-5 animate-pulse bg-primary/5 p-5">
              <div className="h-2 w-20 bg-primary/10" />
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <div className="h-9 w-12 bg-primary/10" />
                  <div className="mt-2 h-2 w-24 bg-primary/10" />
                </div>
                <div>
                  <div className="h-5 w-10 bg-primary/10" />
                  <div className="mt-2 h-2 w-16 bg-primary/10" />
                </div>
              </div>
              <div className="mt-5 h-1 w-full bg-primary/10" />
              <div className="mt-2 h-2 w-40 bg-primary/10" />
            </section>
          ) :
            (
              <section className="mt-5 bg-primary p-5 text-background">
                <p className="font-ui text-[10px] uppercase tracking-[0.2em] text-background/40">Votre impact</p>

                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <h2 className="font-righteous text-4xl">{totalCount}</h2>
                    <p className="mt-1 font-ui text-xs text-background/60">prénoms proposés</p>
                  </div>

                  <div className="text-right">
                    <p className="font-righteous text-xl">#--</p>
                    <p className="font-ui text-[10px] text-background/50">classement</p>
                  </div>
                </div>

                <div className="mt-5 h-1 bg-background/10">
                  <div className="h-full bg-background" style={{ width: `${totalCount > 0 ? Math.min((publishedCount / totalCount) * 100, 100) : 0}%` }} />
                </div>

                <p className="mt-2 font-ui text-[10px] text-background/40">
                  {publishedCount} publié{publishedCount > 1 ? "s" : ""} sur {totalCount} proposé{totalCount > 1 ? "s" : ""}
                </p>
              </section>
            )
          }

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
                <p className="font-ui text-[10px] uppercase tracking-widest text-gray-400">Votre activité</p>
                <h2 className="mt-1 font-righteous text-xl">Mes contributions</h2>
              </div>
              <span className="font-ui text-xs text-gray-400">{totalCount} total</span>
            </div>

            <div className="mt-4 flex flex-col">
              {dataLoading ? (
                [0, 1, 2].map((i) => (
                  <div key={i} className="flex animate-pulse items-center gap-3 border-b border-primary/10 py-4">
                    <div className="h-10 w-10 shrink-0 bg-primary/10" />
                    <div className="flex-1">
                      <div className="h-3 w-16 bg-primary/10" />
                      <div className="mt-2 h-2 w-32 bg-primary/10" />
                    </div>
                    <div className="h-2 w-14 bg-primary/10" />
                  </div>
                ))
              ) : contributions.length === 0 ? (
                <p className="py-6 text-center font-ui text-xs text-gray-400">Aucune contribution pour l&apos;instant</p>
              ) : (
                contributions.map((item) => (
                  <div key={item._id} className="relative flex items-center justify-between border-b border-primary/10 py-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center bg-primary font-righteous text-sm text-background">
                        {item.label[0]}
                      </span>
                      <div>
                        <h3 className="font-righteous text-base">{item.label}</h3>
                        <p className="mt-1 font-ui text-xs text-gray-500">{item.description.fr}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`font-ui text-[10px] font-semibold ${statusColors[item.status]}`}>
                        {statusLabels[item.status]}
                      </span>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenuId(openMenuId === item._id ? null : item._id);
                        }}
                        className="flex h-7 w-7 items-center justify-center text-primary/40"
                      >
                        ⋮
                      </button>

                      {openMenuId === item._id && (
                        <div className="absolute right-0 top-14 z-10 w-32 border border-primary/10 bg-background shadow-lg">
                          <button
                            type="button"
                            onClick={async () => {
                              const full = await fetchPrenomById(item._id);
                              setEditingContribution(full.data);
                              setOpenMenuId(null);
                            }}
                            className="block w-full px-3 py-2 text-left font-ui text-xs text-primary hover:bg-primary/5"
                          >
                            Modifier
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setConfirmDeleteId(item._id);
                              setOpenMenuId(null);
                            }}
                            className="block w-full px-3 py-2 text-left font-ui text-xs text-red-600 hover:bg-red-50"
                          >
                            Supprimer
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* TOP CONTRIBUTORS */}
          <section className="mt-8">
            <div>
              <p className="font-ui text-[10px] uppercase tracking-widest text-gray-400">Communauté</p>
              <h2 className="mt-1 font-righteous text-xl">Top contributeurs</h2>
            </div>

            <div className="mt-4 bg-primary text-background">
              {
                dataLoading ? (
                  [0, 1, 2].map((i) => (
                    <div key={i} className={`flex animate-pulse items-center justify-between p-4 ${i !== 2 ? "border-b border-background/10" : ""}`}>
                      <div className="flex items-center gap-3">
                        <div className="h-3 w-4 bg-background/10" />
                        <div className="h-9 w-9 bg-background/10" />
                        <div className="h-3 w-16 bg-background/10" />
                      </div>
                      <div className="h-2 w-20 bg-background/10" />
                    </div>
                  ))
                ) : (

                  topContributors.map((item, index) => (
                    <div key={item._id} className={`flex items-center justify-between p-4 ${index !== topContributors.length - 1 ? "border-b border-background/10" : ""}`}>
                      <div className="flex items-center gap-3">
                        <span className="font-ui text-xs text-background/40">{String(index + 1).padStart(2, "0")}</span>
                        <span className="flex h-9 w-9 items-center justify-center bg-background font-righteous text-primary">
                          {item.contributeur.displayName[0]}
                        </span>
                        <span className="font-ui text-sm font-medium">{item.contributeur.displayName}</span>
                      </div>

                      <span className="font-ui text-xs text-background/50">{item.totalPublished} contributions</span>
                    </div>
                  ))
                )
              }
            </div>
          </section>

          {/* CREATION DE PRENOM*/}
          <section>
            <AnimatePresence>
              {showContribution && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="fixed inset-0 z-40 bg-primary/20"
                    onClick={() => setShowContribution(false)}
                  />
                  <motion.div
                    initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    onClick={(e) => e.stopPropagation()}
                    className="fixed bottom-0 left-0 right-0 z-50 h-[70%] overflow-y-auto bg-background p-4 scrollbar-none md:w-[80%] lg:w-180 md:left-1/2 md:-translate-x-1/2"
                  >
                    <NewContributionsCard
                      mode="create"
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

          {/*  EDITION DU PRENOM*/}
          <section>
            <section>
              <AnimatePresence>
                {editingContribution && (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="fixed inset-0 z-40 bg-primary/20"
                      onClick={() => setEditingContribution(null)}
                    />
                    <motion.div
                      initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                      onClick={(e) => e.stopPropagation()}
                      className="fixed bottom-0 left-0 right-0 z-50 h-[70%] overflow-y-auto bg-background p-4 scrollbar-none md:w-[80%] lg:w-180 md:left-1/2 md:-translate-x-1/2"
                    >
                      <NewContributionsCard
                        mode="edit"
                        loading={actionLoading}
                        initialData={{
                          label: editingContribution.label,
                          description: editingContribution.description,
                          category: editingContribution.category,
                          country: editingContribution.country,
                          ethnicGroup: editingContribution.ethnicGroup,
                          gender: editingContribution.gender as "féminin" | "masculin" | "neutre",
                        }}
                        onClose={() => {
                          setEditingContribution(null);
                        }}
                        onSubmit={async (data) => {
                          try {
                            const success = await editContribution(editingContribution._id, data);
                            if (success) {
                              setTimeout(() => setEditingContribution(null), 1000);
                            }
                          } catch (error) {
                            console.error("Erreur lors de la modification :", error);
                          }
                        }}
                      />
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </section>
          </section>

          {/* Popup de confirmation de suppression */}
          <section>
            <AnimatePresence>
              {confirmDeleteId && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="fixed inset-0 z-40 bg-black/30"
                    onClick={() => setConfirmDeleteId(null)}
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                    className="fixed left-1/2 top-1/2 z-50 w-[85%] max-w-sm -translate-x-1/2 -translate-y-1/2 bg-background p-6 text-center"
                  >
                    <h3 className="font-righteous text-lg text-primary">Supprimer ce prénom ?</h3>
                    <p className="mt-2 font-ui text-sm text-gray-500">Cette action est irréversible.</p>
                    <div className="mt-5 flex gap-2">
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteId(null)}
                        className="h-11 flex-1 border border-primary/10 font-ui text-sm text-primary"
                      >
                        Annuler
                      </button>
                      <button
                        type="button"
                        disabled={deleting}
                        onClick={async () => {
                          setDeleting(true);
                          await removeContribution(confirmDeleteId);
                          setDeleting(false);
                          setConfirmDeleteId(null);
                        }}
                        className="h-11 flex-1 bg-red-600 font-ui text-sm text-white disabled:opacity-50"
                      >
                        {deleting ? "..." : "Supprimer"}
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </section>

        </div>

      </main>

    </div>
  );
}