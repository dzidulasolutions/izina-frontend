"use client";

import { useRouter } from "next/navigation";
import { IconlyArrowLeft, IconlyBookmark, IconlyHeartFill, IconlyStar, IconlyFilter, FiXCircle } from "@/src/components/ui/icons";
import { useSurprise } from "@/src/hooks/useSurprise";
import { AuthRequiredModal } from "@/src/components/auth/AuthRequiredModal";
import Link from "next/link";
import { toJpeg } from "html-to-image";
import { useRef, useState } from "react";
import { IconlyDownload, IconlyLoader, IconlyChevronRight } from "@/src/components/ui/icons";
import Alert from "@/src/components/ui/alert";
import { recordDownload } from "@/src/lib/api/prenoms";

type Gender = "Tous" | "Masculin" | "Féminin" | "Mixte";
type Category = "Tous" | "Populaire" | "Rare" | "Moderne" | "Traditionnel";

const genders: Gender[] = ["Tous", "Masculin", "Féminin", "Mixte"];
const categories: Category[] = ["Tous", "Populaire", "Rare", "Moderne", "Traditionnel"];

export default function SurprisePage() {
  const router = useRouter();

  const [gender, setGender] = useState<Gender>("Tous");
  const [category, setCategory] = useState<Category>("Tous");
  const [rotation, setRotation] = useState(0);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const { result, isSpinning, notFound, saved, needsAuth, setNeedsAuth, alert, setAlert, draw, handleSaveResult } = useSurprise();
  const cardRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const handleSpin = () => {
    if (isSpinning) return;
    setRotation((prev) => prev + 1440 + Math.floor(Math.random() * 360));
    void draw(gender, category);
  };

  const handleDownload = async () => {
    if (!result || !cardRef.current) return;
    setDownloading(true);
    try {
      const dataUrl = await toJpeg(cardRef.current, { quality: 0.95, canvasWidth: 1080, canvasHeight: 1080 });
      const link = document.createElement("a");
      link.download = `izina-${result.label.toLowerCase()}.jpg`;
      link.href = dataUrl;
      link.click();
      await recordDownload(result._id);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="h-screen w-full overflow-hidden bg-background scrollbar-none">
      <main className="relative mx-auto h-full w-full md:w-[80%] lg:w-180">
        <div className="h-full overflow-y-auto overflow-x-hidden scrollbar-none px-4 pb-10 pt-4">

          <header className="flex items-center justify-between">
            <button onClick={() => router.back()} className="flex h-10 w-10 items-center justify-center border border-primary/10">
              <IconlyArrowLeft size={17} color="currentColor" />
            </button>
            <div className="text-center">
              <p className="font-ui text-[9px] uppercase tracking-[0.25em] text-gray-400">Générateur</p>
              <h1 className="font-righteous text-xl text-primary">Surprise</h1>
            </div>
            <button
              onClick={() => setFiltersOpen((prev) => !prev)}
              className={`flex h-10 w-10 items-center justify-center ${filtersOpen ? "bg-primary text-background" : "border border-primary/10 text-primary"}`}
            >
              {filtersOpen ? <FiXCircle size={17} color="currentColor" /> : <IconlyFilter size={17} color="currentColor" />}
            </button>
          </header>

          <section className="mt-6">
            <p className="font-ui text-[10px] uppercase tracking-[0.2em] text-gray-400">Trouvez l&apos;inspiration</p>
            <h2 className="mt-1 max-w-md font-righteous text-3xl leading-tight text-primary">
              Et si le prochain prénom <br /> était le bon ?
            </h2>
            <p className="mt-3 max-w-md font-ui text-sm leading-5 text-gray-500">
              Choisissez vos préférences ou laissez Izina décider pour vous.
            </p>
          </section>

          {filtersOpen && (
            <section className="mt-7">
              <p className="font-ui text-[10px] uppercase tracking-widest text-gray-400">Genre</p>
              <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                {genders.map((item) => {
                  const active = gender === item;
                  return (
                    <button
                      key={item}
                      onClick={() => setGender(item)}
                      className={`shrink-0 px-4 py-2.5 font-ui text-xs font-medium transition ${active ? "bg-primary text-background" : "border border-primary/10 text-primary"}`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>

              <p className="mt-5 font-ui text-[10px] uppercase tracking-widest text-gray-400">Style</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {categories.map((item) => {
                  const active = category === item;
                  return (
                    <button
                      key={item}
                      onClick={() => setCategory(item)}
                      className={`px-4 py-2.5 font-ui text-xs font-medium transition ${active ? "bg-primary text-background" : "border border-primary/10 text-primary"}`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </section>
          )}

          <section className="mt-8 flex flex-col items-center">
            <div className="relative">
              <div className="absolute -top-3 left-1/2 z-20 -translate-x-1/2">
                <div className="h-0 w-0 border-l-[9px] border-r-[9px] border-t-18 border-l-transparent border-r-transparent border-t-primary" />
              </div>
              <div
                className="relative flex h-64 w-64 items-center justify-center rounded-full border-10 border-primary bg-background"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transition: isSpinning ? "transform 1.8s cubic-bezier(0.12, 0.8, 0.18, 1)" : "none",
                }}
              >
                <div className="absolute inset-2 overflow-hidden rounded-full">
                  <div className="absolute left-1/2 top-0 h-1/2 w-1/2 origin-bottom-left border-l border-b border-primary/10 bg-primary" />
                  <div className="absolute bottom-0 left-0 h-1/2 w-1/2 origin-top-right border-r border-t border-primary/10 bg-primary" />
                  <div className="absolute right-0 top-0 h-1/2 w-1/2 border-l border-b border-primary/10 bg-background" />
                  <div className="absolute bottom-0 right-0 h-1/2 w-1/2 border-l border-t border-primary/10 bg-background" />
                </div>
                <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-background">
                  <span className="font-righteous text-xl text-primary">IZINA</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleSpin}
              disabled={isSpinning}
              className="mt-7 flex w-full max-w-xs items-center justify-center gap-2 bg-primary px-6 py-4 font-ui text-sm font-semibold text-background disabled:cursor-not-allowed disabled:opacity-50"
            >
              <IconlyStar size={17} color="currentColor" />
              {isSpinning ? "Izina cherche pour vous..." : "Lancer la surprise"}
            </button>
          </section>

          {result && !isSpinning && (
            <section className="mt-8">
              <div ref={cardRef} className="border border-primary/10 p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-ui text-[10px] uppercase tracking-[0.2em] text-gray-400">Votre prénom</p>
                    <h2 className="mt-2 font-righteous text-4xl text-primary">{result.label}</h2>
                  </div>
                  <span className="flex h-10 w-10 items-center justify-center bg-primary font-righteous text-background">
                    {result.label[0]}
                  </span>
                </div>

                <div className="mt-6">
                  <p className="font-ui text-[10px] uppercase tracking-widest text-gray-400">Signification</p>
                  <p className="mt-2 font-righteous text-xl text-primary">{result.description.fr}</p>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="bg-primary px-3 py-2 font-ui text-[10px] text-background">{result.ethnicGroup.join(", ")}</span>
                  <span className="border border-primary/10 px-3 py-2 font-ui text-[10px]">{result.country.join(", ")}</span>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-2">
                  <button
                    onClick={handleSaveResult}
                    disabled={saved}
                    className={`flex items-center justify-center gap-2 py-3 font-ui text-xs font-semibold transition-colors ${saved ? "bg-primary text-background" : "border border-primary/10 text-primary"}`}
                  >
                    <IconlyBookmark size={15} color="currentColor" />
                    {saved ? "Enregistré" : "Enregistrer"}
                  </button>

                  <button
                    onClick={handleSpin}
                    className="flex items-center justify-center gap-2 bg-primary py-3 font-ui text-xs font-semibold text-background"
                  >
                    <IconlyStar size={15} color="currentColor" />
                    Encore un
                  </button>
                </div>

                {/* Actions dans le conteneur — icônes seules sur petit écran */}
                <div className="mt-3 flex items-center justify-between border-t border-primary/10 pt-3">
                  <Link
                    href={`/prenoms/${result._id}`}
                    className="flex items-center gap-1 font-ui text-xs font-medium text-primary"
                  >
                    <span className="hidden sm:inline">Voir la fiche complète</span>
                    <IconlyChevronRight size={14} color="currentColor" />
                  </Link>

                  <button
                    onClick={handleDownload}
                    disabled={downloading}
                    className="flex items-center gap-1.5 font-ui text-xs font-medium text-primary disabled:opacity-50"
                  >
                    {downloading ? <IconlyLoader size={14} color="currentColor" /> : <IconlyDownload size={14} color="currentColor" />}
                    <span className="hidden sm:inline">Télécharger</span>
                  </button>
                </div>
              </div>
            </section>
          )}

          {notFound && (
            <div className="mt-8 border border-primary/10 p-6 text-center">
              <p className="font-righteous text-lg">Aucun prénom trouvé</p>
              <p className="mt-2 font-ui text-xs text-gray-500">Essayez une autre combinaison de filtres.</p>
            </div>
          )}

          <section className="mt-10 border-t border-primary/10 pt-5">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center bg-primary text-background">
                <IconlyHeartFill size={15} color="currentColor" />
              </div>
              <p className="font-ui text-xs leading-5 text-gray-500">
                Un prénom peut être bien plus qu&apos;un nom. Il peut raconter une histoire.
              </p>
            </div>
          </section>
        </div>

        <section className="fixed top-10 left-1/2 z-50 w-1/2 -translate-x-1/2 px-4">
          {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}
        </section>

        <AuthRequiredModal open={needsAuth} onClose={() => setNeedsAuth(false)} />
      </main>
    </div>
  );
}