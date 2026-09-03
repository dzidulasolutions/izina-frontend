"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IconlyLogo, IconlyFacebook, IconlyGoogle, IconlyLoader, } from "@/src/components/ui/icons";
import Alert from "@/src/components/ui/alert";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string; } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setAlert(null);
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      console.log(data);

      if (!res.ok) {
        throw new Error(data.message || "Identifiants incorrects");
      }

      localStorage.setItem("token", data.accessToken);

      setAlert({
        type: "success",
        message: "Connexion réussie !",
      });

      setTimeout(() => {
        router.replace("/accueil");
      }, 1000);

    } catch (err) {
      setAlert({
        type: "error",
        message:
          err instanceof Error
            ? err.message
            : "Une erreur est survenue",
      });
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
          <h1 className="mt-8 font-righteous text-2xl text-primary">Connexion</h1>
          <p className="font-ui font-medium text-sm mb-6 text-gray-500">  Connectez-vous pour retrouver vos prénoms favoris et continuer votre
            exploration.</p>

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

            <div>

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


            <button type="submit" disabled={loading} className="w-full mt-4 font-ui bg-primary flex justify-center items-center py-3 text-sm font-semibold text-background">
              {loading ? <IconlyLoader color="currentColor" size={24} /> : "Se connecter"}
            </button>

            <div className="flex justify-center items-center gap-2">
              <a href="/forgot-password" className="font-ui underline hover:text-primary font-medium text-gray-500 text-sm">Mot de passe oublie ?</a> |
              <a href="/register" className="font-ui underline hover:text-primary font-medium text-gray-500 text-sm">Inscription</a>
            </div>

            <div className="flex justify-center items-center gap-2">
              <span className="w-11 flex justify-center items-center h-11 py-2 bg-primary text-background"><IconlyFacebook size={24} color="currentColor" /></span>
              <span className="w-11 flex justify-center items-center h-11 py-2 bg-primary text-background"><IconlyGoogle size={24} color="currentColor" /></span>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}