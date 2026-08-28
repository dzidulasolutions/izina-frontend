"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IconlyLogo } from "@/src/components/ui/icons";

export default function RegisterPage() {
  const router = useRouter();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ displayName, email, phone, password }),
      });

      if (!res.ok) throw new Error("Inscription impossible");

      router.replace(`/verify-email?email=${encodeURIComponent(email)}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col justify-center bg-background px-6">
      <div className="w-full flex justify-center items-center "><IconlyLogo size={32} color="currentColor"/></div>
      <h1 className="mt-8 font-righteous text-2xl text-primary">Inscription</h1>
      <p className="font-ui font-medium text-sm mb-6 text-gray-500">
        Créez votre compte pour sauvegarder vos prénoms favoris et rejoindre la communauté.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="mb-1 block font-ui text-sm font-bold text-primary">
            Nom complet
          </label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Entrez votre nom complet"
            required
            className="w-full text-sm border font-ui border-primary/30 px-4 py-2 text-primary outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="mb-1 block font-ui text-sm font-bold text-primary">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Entrez votre email"
            required
            className="w-full text-sm border font-ui border-primary/30 px-4 py-2 text-primary outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="mb-1 block font-ui text-sm font-bold text-primary">
            Téléphone
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Entrez votre numéro"
            className="w-full text-sm border font-ui border-primary/30 px-4 py-2 text-primary outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="mb-1 font-ui block text-sm font-bold text-primary">
            Mot de passe
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Entrez votre mot de passe"
            required
            minLength={8}
            className="w-full text-sm font-ui border border-primary/30 px-4 py-2 text-primary outline-none focus:border-primary"
          />
        </div>

        {error && <p className="text-sm font-ui text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-4 font-ui bg-primary py-3 text-sm font-semibold text-background"
        >
          {loading ? "Création..." : "Créer mon compte"}
        </button>

        <div className="flex justify-center items-center gap-2">
          <span className="font-ui font-medium text-gray-500 text-sm">Déjà un compte ?</span>
          <a href="/login" className="font-ui underline hover:text-primary font-medium text-gray-500 text-sm">Connexion</a>
        </div>
      </form>
    </div>
  );
}