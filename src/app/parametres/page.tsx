"use client";

import {
  IconlyArrowLeft,
  IconlyChevronRight,
  IconlyLogout,
  IconlyNotification,
  IconlyLoader,
} from "@/src/components/ui/icons";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/src/hooks/useCurrentUser";
import { useSettings } from "@/src/hooks/useSettings";

export default function SettingsPage() {
  const router = useRouter();
  const { user, loading: userLoading } = useCurrentUser();
  const { logout, loggingOut } = useSettings();

  const initial = user?.displayName?.charAt(0).toUpperCase() ?? "?";

  return (
    <div className="h-screen w-full overflow-hidden scrollbar-none bg-background">
      <main className="mx-auto h-full w-full overflow-y-auto scrollbar-none md:w-[80%] lg:w-180">
        <div className="px-4 pb-10 pt-4">

          <header className="flex items-center justify-between">
            <button onClick={() => router.push("/accueil")} className="flex h-10 w-10 items-center justify-center border border-primary/10">
              <IconlyArrowLeft size={17} color="currentColor" />
            </button>
            <h1 className="font-righteous text-xl">Paramètres</h1>
            <div className="w-10" />
          </header>

          {/* PROFILE */}
          {userLoading ? (
            <section className="mt-6 flex animate-pulse items-center gap-4 border border-primary/10 p-4">
              <div className="h-14 w-14 bg-primary/10" />
              <div className="flex-1">
                <div className="h-3 w-20 bg-primary/10" />
                <div className="mt-2 h-2 w-28 bg-primary/10" />
              </div>
            </section>
          ) : (
            <button
              onClick={() => router.push("/profil")}
              className="mt-6 flex w-full items-center gap-4 border border-primary/10 p-4"
            >
              <span className="flex h-14 w-14 items-center justify-center bg-primary font-righteous text-2xl text-background">
                {initial}
              </span>
              <div className="flex-1 text-left">
                <h2 className="font-righteous text-lg">{user?.displayName ?? "Non connecté"}</h2>
              </div>
              <IconlyChevronRight size={16} color="currentColor" />
            </button>
          )}

          {/* COMPTE */}
          <section className="mt-8">
            <p className="font-ui text-[10px] uppercase tracking-widest text-gray-400">Compte</p>
            <div className="mt-3 border-t border-primary/10">
              <button
                onClick={() => router.push("/profil")}
                className="flex w-full items-center justify-between border-b border-primary/10 py-4"
              >
                <div className="text-left">
                  <p className="font-ui text-sm font-medium">Informations personnelles</p>
                  <p className="mt-1 font-ui text-xs text-gray-400">Nom, email et profil</p>
                </div>
                <IconlyChevronRight size={16} color="currentColor" />
              </button>

              <button
                onClick={() => router.push(`/forgot-password${user ? "" : ""}`)}
                className="flex w-full items-center justify-between border-b border-primary/10 py-4"
              >
                <div className="text-left">
                  <p className="font-ui text-sm font-medium">Mot de passe</p>
                  <p className="mt-1 font-ui text-xs text-gray-400">Modifier votre mot de passe</p>
                </div>
                <IconlyChevronRight size={16} color="currentColor" />
              </button>
            </div>
          </section>

          {/* PREFERENCES — Notifications, Langue, Confidentialité : pas encore de route dédiée, laissées en l'état visuel pour l'instant */}
          <section className="mt-8">
            <p className="font-ui text-[10px] uppercase tracking-widest text-gray-400">Préférences</p>
            <div className="mt-3 border-t border-primary/10">
              <button className="flex w-full items-center justify-between border-b border-primary/10 py-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center bg-primary text-background">
                    <IconlyNotification size={16} color="currentColor" />
                  </span>
                  <div className="text-left">
                    <p className="font-ui text-sm font-medium">Notifications</p>
                    <p className="mt-1 font-ui text-xs text-gray-400">Gérer vos notifications</p>
                  </div>
                </div>
                <IconlyChevronRight size={16} color="currentColor" />
              </button>

              <button className="flex w-full items-center justify-between border-b border-primary/10 py-4">
                <div className="text-left">
                  <p className="font-ui text-sm font-medium">Langue</p>
                  <p className="mt-1 font-ui text-xs text-gray-400">Français</p>
                </div>
                <IconlyChevronRight size={16} color="currentColor" />
              </button>

              <button className="flex w-full items-center justify-between border-b border-primary/10 py-4">
                <div className="text-left">
                  <p className="font-ui text-sm font-medium">Confidentialité</p>
                  <p className="mt-1 font-ui text-xs text-gray-400">Gérer vos données</p>
                </div>
                <IconlyChevronRight size={16} color="currentColor" />
              </button>
            </div>
          </section>

          {/* ABOUT — inchangé */}
          <section className="mt-8">
            <p className="font-ui text-[10px] uppercase tracking-widest text-gray-400">À propos</p>
            <div className="mt-3 border-t border-primary/10">
              <button onClick={() => router.push("/izina/a-propos")} className="flex w-full items-center justify-between border-b border-primary/10 py-4">
                <span className="font-ui text-sm font-medium">À propos d&apos;Izina</span>
                <IconlyChevronRight size={16} color="currentColor" />
              </button>
              <button onClick={() => router.push("/izina/conditions-utilisation")} className="flex w-full items-center justify-between border-b border-primary/10 py-4">
                <span className="font-ui text-sm font-medium">Conditions d&apos;utilisation</span>
                <IconlyChevronRight size={16} color="currentColor" />
              </button>
              <button onClick={() => router.push("/izina/politique-confidentialite")} className="flex w-full items-center justify-between border-b border-primary/10 py-4">
                <span className="font-ui text-sm font-medium">Politique de confidentialité</span>
                <IconlyChevronRight size={16} color="currentColor" />
              </button>
            </div>
          </section>

          {/* LOGOUT */}
          <button
            onClick={logout}
            disabled={loggingOut}
            className="mt-8 flex w-full items-center justify-center gap-2 border border-red-500/20 py-3 font-ui text-sm font-semibold text-red-600 disabled:opacity-50"
          >
            {loggingOut ? <IconlyLoader size={16} color="currentColor" /> : <IconlyLogout size={16} color="currentColor" />}
            {loggingOut ? "Déconnexion..." : "Se déconnecter"}
          </button>

          <p className="mt-6 text-center font-ui text-[10px] text-gray-400">Izina · Version 1.0.0</p>
        </div>
      </main>
    </div>
  );
}