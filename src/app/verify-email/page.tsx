"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { IconlyLogo } from "@/src/components/ui/icons";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
const [email, setEmail] = useState(searchParams.get("email") ?? "");  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      if (!res.ok) throw new Error("Code invalide");

      router.replace("/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError("");
    setResending(true);

    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/resend-verification-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch {
      setError("Impossible de renvoyer le code");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col justify-center bg-background px-6">
      <div className="w-full flex justify-center items-center "><IconlyLogo size={32} color="currentColor"/></div>
      <h1 className="mt-8 font-righteous text-2xl text-primary">Vérification</h1>
      <p className="font-ui font-medium text-sm mb-6 text-gray-500">
        Entrez le code reçu par email pour activer votre compte.
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
            Code de vérification
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

        {error && <p className="text-sm font-ui text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-4 font-ui bg-primary py-3 text-sm font-semibold text-background"
        >
          {loading ? "Vérification..." : "Vérifier"}
        </button>

        <div className="flex justify-center items-center gap-2">
          <button
            type="button"
            onClick={handleResend}
            disabled={resending}
            className="font-ui underline hover:text-primary font-medium text-gray-500 text-sm"
          >
            {resending ? "Envoi..." : "Renvoyer le code"}
          </button>
        </div>
      </form>
    </div>
  );
}