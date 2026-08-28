"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { IconlyLogo } from "@/src/components/ui/icons";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState(searchParams.get("email") ?? "");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code, newPassword }),
      });

      if (!res.ok) throw new Error("Réinitialisation impossible");

      router.replace("/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col justify-center bg-background px-6">
      <div className="w-full flex justify-center items-center "><IconlyLogo size={32} color="currentColor"/></div>
      <h1 className="mt-8 font-righteous text-2xl text-primary">Réinitialisation</h1>
      <p className="font-ui font-medium text-sm mb-6 text-gray-500">
        Entrez le code reçu et votre nouveau mot de passe.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            Code
          </label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Entrez le code reçu"
            required
            className="w-full text-sm border font-ui border-primary/30 px-4 py-2 text-primary outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="mb-1 block font-ui text-sm font-bold text-primary">
            Nouveau mot de passe
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Entrez votre nouveau mot de passe"
            required
            minLength={8}
            className="w-full text-sm border font-ui border-primary/30 px-4 py-2 text-primary outline-none focus:border-primary"
          />
        </div>

        {error && <p className="text-sm font-ui text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-4 font-ui bg-primary py-3 text-sm font-semibold text-background"
        >
          {loading ? "Réinitialisation..." : "Réinitialiser"}
        </button>
      </form>
    </div>
  );
}