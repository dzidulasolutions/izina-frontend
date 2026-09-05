"use client";

import Link from "next/link";
import {
  IconlyArrowLeft,
  IconlyHeart,
  IconlySearch,
  IconlyStar,
} from "@/src/components/ui/icons";

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-background text-primary">
      <div className="mx-auto w-full max-w-3xl px-5 py-8 md:px-8">

        {/* Header */}
        <header className="mb-10">
          <Link
            href="/izina/parametres"
            className="mb-8 inline-flex items-center gap-2 font-ui text-xs font-semibold"
          >
            <IconlyArrowLeft
              size={16}
              color="currentColor"
            />

            Retour
          </Link>

          <p className="font-ui text-[10px] uppercase tracking-[0.2em] text-primary/50">
            Izina
          </p>

          <h1 className="mt-2 font-righteous text-4xl md:text-5xl">
            À propos
          </h1>

          <p className="mt-4 max-w-xl font-ui text-sm leading-6 text-primary/60">
            Izina est une application dédiée à la découverte,
            à la transmission et à la valorisation des prénoms
            africains.
          </p>
        </header>

        {/* Introduction */}
        <section className="space-y-8">

          <div>
            <h2 className="font-righteous text-2xl">
              Notre vision
            </h2>

            <p className="mt-3 font-ui text-sm leading-7 text-primary/70">
              Les prénoms racontent des histoires. Ils peuvent
              porter une origine, une langue, une tradition, une
              famille ou encore un événement particulier.
            </p>

            <p className="mt-3 font-ui text-sm leading-7 text-primary/70">
              Izina a été imaginée pour permettre à chacun de
              découvrir cette richesse et de mieux comprendre
              les prénoms issus des différentes cultures africaines.
            </p>
          </div>

          {/* Features */}
          <div>
            <h2 className="font-righteous text-2xl">
              Que peut-on faire avec Izina ?
            </h2>

            <div className="mt-5 space-y-3">

              <div className="flex gap-4 border border-primary p-4">
                  <span className="shrink-0">
                        <IconlySearch
                              size={20}
                              color="currentColor" 
                        />
                  </span>

                <div>
                  <h3 className="font-ui text-sm font-semibold">
                    Découvrir
                  </h3>

                  <p className="mt-1 font-ui text-xs leading-5 text-primary/60">
                    Explorez des prénoms africains et découvrez
                    leurs significations, leurs origines et leurs
                    particularités.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 border border-primary p-4">
                  <span className="shrink-0">
                        <IconlyHeart
                              size={20}
                              color="currentColor"
                        />
                  </span>

                <div>
                  <h3 className="font-ui text-sm font-semibold">
                    Sauvegarder
                  </h3>

                  <p className="mt-1 font-ui text-xs leading-5 text-primary/60">
                    Gardez vos prénoms préférés afin de pouvoir
                    les retrouver facilement.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 border border-primary p-4">
                  <span className="shrink-0">
                        <IconlyStar
                              size={20}
                              color="currentColor"
                        />
                  </span>

                <div>
                  <h3 className="font-ui text-sm font-semibold">
                    Participer
                  </h3>

                  <p className="mt-1 font-ui text-xs leading-5 text-primary/60">
                    Partagez vos connaissances en proposant de
                    nouveaux prénoms à la communauté.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Community */}
          <div>
            <h2 className="font-righteous text-2xl">
              Une connaissance collective
            </h2>

            <p className="mt-3 font-ui text-sm leading-7 text-primary/70">
              Izina repose également sur la contribution de sa
              communauté. Chaque utilisateur peut contribuer à
              enrichir la base de données avec des prénoms,
              significations et informations culturelles.
            </p>

            <p className="mt-3 font-ui text-sm leading-7 text-primary/70">
              Les contributions peuvent être vérifiées et
              modérées afin de préserver la qualité des
              informations proposées.
            </p>
          </div>

          {/* Footer */}
          <div className="border-t border-primary/10 pt-6">
            <p className="font-ui text-xs text-primary/40">
              Izina — Découvrir. Comprendre. Transmettre.
            </p>
          </div>

        </section>
      </div>
    </main>
  );
};

export default AboutPage;