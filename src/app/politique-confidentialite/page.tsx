"use client";

import Link from "next/link";
import {
  IconlyArrowLeft,
} from "@/src/components/ui/icons";

const PrivacyPage = () => {
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
            Politique de confidentialité
          </h1>

          <p className="mt-4 font-ui text-xs text-primary/40">
            Dernière mise à jour : 4 septembre 2026
          </p>
        </header>

        <article className="space-y-10">

          <section>
            <h2 className="font-righteous text-2xl">
              1. Introduction
            </h2>

            <p className="mt-3 font-ui text-sm leading-7 text-primary/70">
              La présente politique explique quelles informations
              peuvent être collectées lorsque vous utilisez Izina,
              pourquoi elles sont utilisées et comment elles sont
              protégées.
            </p>
          </section>

          <section>
            <h2 className="font-righteous text-2xl">
              2. Informations collectées
            </h2>

            <p className="mt-3 font-ui text-sm leading-7 text-primary/70">
              Selon les fonctionnalités utilisées, Izina peut
              collecter notamment les informations nécessaires à
              la création et à la gestion de votre compte.
            </p>

            <ul className="mt-4 space-y-2 pl-5 font-ui text-sm leading-6 text-primary/70">
              <li className="list-disc">
                Adresse e-mail
              </li>

              <li className="list-disc">
                Nom ou informations de profil fournies par
                l&apos;utilisateur
              </li>

              <li className="list-disc">
                Prénoms proposés et contributions
              </li>

              <li className="list-disc">
                Commentaires et interactions réalisées sur la
                plateforme
              </li>

              <li className="list-disc">
                Informations techniques nécessaires au
                fonctionnement du service
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-righteous text-2xl">
              3. Utilisation des informations
            </h2>

            <p className="mt-3 font-ui text-sm leading-7 text-primary/70">
              Les informations collectées peuvent être utilisées
              afin de fournir et améliorer les fonctionnalités
              d&apos;Izina, notamment pour :
            </p>

            <ul className="mt-4 space-y-2 pl-5 font-ui text-sm leading-6 text-primary/70">
              <li className="list-disc">
                créer et gérer votre compte ;
              </li>

              <li className="list-disc">
                sécuriser votre compte ;
              </li>

              <li className="list-disc">
                vous envoyer les communications nécessaires au
                fonctionnement du service ;
              </li>

              <li className="list-disc">
                gérer vos contributions et interactions ;
              </li>

              <li className="list-disc">
                améliorer l&apos;expérience utilisateur.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-righteous text-2xl">
              4. Sécurité
            </h2>

            <p className="mt-3 font-ui text-sm leading-7 text-primary/70">
              Nous mettons en œuvre des mesures techniques et
              organisationnelles destinées à protéger les
              informations des utilisateurs contre les accès,
              modifications ou utilisations non autorisés.
            </p>
          </section>

          <section>
            <h2 className="font-righteous text-2xl">
              5. Conservation des données
            </h2>

            <p className="mt-3 font-ui text-sm leading-7 text-primary/70">
              Les informations sont conservées pendant la durée
              nécessaire au fonctionnement du service et au
              respect des obligations applicables.
            </p>
          </section>

          <section>
            <h2 className="font-righteous text-2xl">
              6. Partage des informations
            </h2>

            <p className="mt-3 font-ui text-sm leading-7 text-primary/70">
              Les informations personnelles ne sont pas destinées
              à être vendues à des tiers.
            </p>

            <p className="mt-3 font-ui text-sm leading-7 text-primary/70">
              Certaines données peuvent toutefois être traitées
              par des prestataires techniques nécessaires au
              fonctionnement d&apos;Izina, par exemple pour
              l&apos;hébergement, l&apos;envoi d&apos;e-mails ou le stockage.
            </p>
          </section>

          <section>
            <h2 className="font-righteous text-2xl">
              7. Cookies et technologies similaires
            </h2>

            <p className="mt-3 font-ui text-sm leading-7 text-primary/70">
              Izina peut utiliser des technologies nécessaires au
              fonctionnement de l&apos;application, à la sécurité et
              à la mémorisation de certaines préférences.
            </p>
          </section>

          <section>
            <h2 className="font-righteous text-2xl">
              8. Vos droits
            </h2>

            <p className="mt-3 font-ui text-sm leading-7 text-primary/70">
              Selon la législation applicable, vous pouvez
              disposer de droits concernant vos données
              personnelles, notamment un droit d&apos;accès, de
              rectification, de suppression ou de limitation de
              certains traitements.
            </p>
          </section>

          <section>
            <h2 className="font-righteous text-2xl">
              9. Suppression du compte
            </h2>

            <p className="mt-3 font-ui text-sm leading-7 text-primary/70">
              Vous pouvez demander la suppression de votre compte
              et des données personnelles qui y sont associées,
              sous réserve des informations que nous sommes
              légalement tenus de conserver.
            </p>
          </section>

          <section>
            <h2 className="font-righteous text-2xl">
              10. Contact
            </h2>

            <p className="mt-3 font-ui text-sm leading-7 text-primary/70">
              Pour toute question concernant vos données
              personnelles ou cette politique, vous pouvez
              contacter l&apos;équipe Izina via le moyen de contact
              indiqué dans l&apos;application.
            </p>
          </section>

          <footer className="border-t border-primary/10 pt-6">
            <p className="font-ui text-xs text-primary/40">
              Izina — Politique de confidentialité
            </p>
          </footer>

        </article>
      </div>
    </main>
  );
};

export default PrivacyPage;