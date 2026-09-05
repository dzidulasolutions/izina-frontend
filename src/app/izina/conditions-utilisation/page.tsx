"use client";

import Link from "next/link";
import {
  IconlyArrowLeft,
} from "@/src/components/ui/icons";

const CGUPage = () => {
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
            Conditions générales
          </h1>

          <p className="mt-4 font-ui text-xs text-primary/40">
            Dernière mise à jour : 4 septembre 2026
          </p>
        </header>

        <article className="space-y-10">

          <section>
            <h2 className="font-righteous text-2xl">
              1. Objet
            </h2>

            <p className="mt-3 font-ui text-sm leading-7 text-primary/70">
              Les présentes conditions générales d&apos;utilisation
              définissent les règles applicables à l&apos;utilisation
              de l&apos;application Izina et de ses fonctionnalités.
            </p>
          </section>

          <section>
            <h2 className="font-righteous text-2xl">
              2. Utilisation du service
            </h2>

            <p className="mt-3 font-ui text-sm leading-7 text-primary/70">
              Izina permet notamment de rechercher, découvrir,
              consulter, sauvegarder et partager des informations
              relatives aux prénoms africains.
            </p>

            <p className="mt-3 font-ui text-sm leading-7 text-primary/70">
              L&apos;utilisateur s&apos;engage à utiliser le service de
              manière légale, respectueuse et conforme aux
              présentes conditions.
            </p>
          </section>

          <section>
            <h2 className="font-righteous text-2xl">
              3. Compte utilisateur
            </h2>

            <p className="mt-3 font-ui text-sm leading-7 text-primary/70">
              Certaines fonctionnalités nécessitent la création
              d&apos;un compte utilisateur.
            </p>

            <p className="mt-3 font-ui text-sm leading-7 text-primary/70">
              L&apos;utilisateur est responsable de la confidentialité
              de ses informations de connexion et de toutes les
              actions effectuées depuis son compte.
            </p>
          </section>

          <section>
            <h2 className="font-righteous text-2xl">
              4. Contributions
            </h2>

            <p className="mt-3 font-ui text-sm leading-7 text-primary/70">
              Les utilisateurs peuvent proposer des prénoms et
              des informations associées.
            </p>

            <p className="mt-3 font-ui text-sm leading-7 text-primary/70">
              Toute contribution doit être pertinente, honnête
              et respecter les autres utilisateurs.
            </p>

            <p className="mt-3 font-ui text-sm leading-7 text-primary/70">
              Izina peut vérifier, modifier, masquer ou supprimer
              une contribution qui ne respecte pas les règles de
              la plateforme.
            </p>
          </section>

          <section>
            <h2 className="font-righteous text-2xl">
              5. Contenu interdit
            </h2>

            <p className="mt-3 font-ui text-sm leading-7 text-primary/70">
              Il est notamment interdit de publier du contenu
              illégal, haineux, discriminatoire, offensant,
              frauduleux ou portant atteinte aux droits d&apos;autrui.
            </p>
          </section>

          <section>
            <h2 className="font-righteous text-2xl">
              6. Exactitude des informations
            </h2>

            <p className="mt-3 font-ui text-sm leading-7 text-primary/70">
              Les informations présentes sur Izina peuvent
              provenir de différentes sources et de contributions
              d&apos;utilisateurs.
            </p>

            <p className="mt-3 font-ui text-sm leading-7 text-primary/70">
              Izina s&apos;efforce d&apos;améliorer la qualité des
              informations disponibles mais ne garantit pas que
              chaque information soit complète ou exempte
              d&apos;erreurs.
            </p>
          </section>

          <section>
            <h2 className="font-righteous text-2xl">
              7. Propriété intellectuelle
            </h2>

            <p className="mt-3 font-ui text-sm leading-7 text-primary/70">
              Les éléments propres à Izina, notamment son identité
              visuelle, son interface, son code et ses contenus
              originaux, sont protégés par les droits applicables
              à la propriété intellectuelle.
            </p>
          </section>

          <section>
            <h2 className="font-righteous text-2xl">
              8. Disponibilité du service
            </h2>

            <p className="mt-3 font-ui text-sm leading-7 text-primary/70">
              Izina peut être temporairement indisponible pour
              des raisons de maintenance, de mise à jour ou pour
              toute autre raison technique.
            </p>
          </section>

          <section>
            <h2 className="font-righteous text-2xl">
              9. Modification des conditions
            </h2>

            <p className="mt-3 font-ui text-sm leading-7 text-primary/70">
              Ces conditions peuvent être modifiées afin de tenir
              compte de l&apos;évolution du service, de ses
              fonctionnalités ou des obligations applicables.
            </p>
          </section>

          <section>
            <h2 className="font-righteous text-2xl">
              10. Contact
            </h2>

            <p className="mt-3 font-ui text-sm leading-7 text-primary/70">
              Pour toute question concernant les présentes
              conditions, l&apos;utilisateur peut contacter l&apos;équipe
              Izina via les moyens de contact disponibles dans
              l&apos;application.
            </p>
          </section>

          <footer className="border-t border-primary/10 pt-6">
            <p className="font-ui text-xs text-primary/40">
              Izina — Conditions générales d&apos;utilisation
            </p>
          </footer>

        </article>
      </div>
    </main>
  );
};

export default CGUPage;