"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IconlyLogo } from "@/src/components/ui/icons";
import Alert from "@/src/components/ui/alert";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string; } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("Envoi impossible");

      router.replace(`/reset-password?email=${encodeURIComponent(email)}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background p-4">

      <div className="w-full px-4 pb-8 lg:w-100 h-auto flex-col flex justify-center items-center relative">
        <IconlyLogo size={32} color="currentColor" />
        {alert && (<Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />)}
        <div className="w-full">
          <h1 className="mt-8 font-righteous text-2xl text-primary">Mot de passe oublié</h1>
          <p className="font-ui font-medium text-sm mb-6 text-gray-500">
            Entrez votre email pour recevoir un code de réinitialisation.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Entrez votre email"
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
              {loading ? "Envoi..." : "Envoyer le code"}
            </button>

            <div className="flex justify-center items-center gap-2">
              <a href="/login" className="font-ui underline hover:text-primary font-medium text-gray-500 text-sm">
                Retour à la connexion
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}