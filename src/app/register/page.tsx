"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IconlyFacebook, IconlyGoogle, IconlyLoader, IconlyLogo, IconlyShow, IconlyHide, IconlyRefresh, FiXCircle } from "@/src/components/ui/icons";
import Alert from "@/src/components/ui/alert";

function Requirement({
  valid,
  text,
}: {
  valid: boolean;
  text: string;
}) {
  return (
    <span className={valid ? "text-primary" : "text-primary/40"}>
      {valid ? "✓" : "○"} {text}
    </span>
  );
}

export default function RegisterPage() {
  const router = useRouter();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string; } | null>(null);

  const requirements = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
  };

  const score = Object.values(requirements).filter(Boolean).length;
  const strength = score === 0 ? "" : score <= 2 ? "Faible" : score === 3 ? "Moyen" : "Fort";

  const generatePassword = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%";
    let generated = "";
    // Garantit les critères minimum
    generated += "A";
    generated += "a";
    generated += "7";
    generated += "!";
    for (let i = generated.length; i < 12; i++) {
      generated += chars[Math.floor(Math.random() * chars.length)];
    }
    // Mélange le mot de passe
    generated = generated
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
    setPassword(generated);
  };

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

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Inscription impossible");
      setAlert({
        type: "success",
        message: data.message,
      });
      console.log(data)
      router.replace(`/verify-email?email=${encodeURIComponent(email)}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center p-4">

      <div className="w-full px-4 pb-8  lg:w-100 h-auto flex-col flex justify-center items-center relative">
        <IconlyLogo size={32} color="currentColor" />
        {error && <div className="text-sm w-full h-11 font-ui bg-red-600/30 text-red-600 border border-red-500 mt-2 flex justify-center items-center gap-2"><FiXCircle size={16} color="currentColor" /> {error}</div>}
        {alert && (<Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />)}
        <div className="w-full">
          <h1 className="mt-4 font-righteous text-2xl text-primary text-start">Inscription</h1>
          <p className="w-[90%] font-ui font-medium text-sm mb-6 text-primary/70">Créez votre compte pour sauvegarder vos prénoms favoris et rejoindre la communauté.</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-2">

            <div>
              <input type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Entrez votre nom complet"
                required
                className="w-full text-sm border font-ui border-primary/10 px-4 py-2 text-primary outline-none focus:border-primary"
              />
            </div>

            <div>
              <input type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Entrez votre email"
                required
                className="w-full text-sm border font-ui border-primary/10 px-4 py-2 text-primary outline-none focus:border-primary"
              />
            </div>

            <div>

              <input type="tel" value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+22800000000"
                className="w-full text-sm border font-ui border-primary/10 px-4 py-2 text-primary outline-none focus:border-primary"
              />
            </div>

            <div className="space-y-3">
              {/* Input */}
              <div className="relative">
                <input type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Entrez votre mot de passe"
                  required
                  minLength={8}
                  className="w-full border border-primary/10 px-4 py-2 pr-11 font-ui text-sm text-primary outline-none focus:border-primary"
                />

                <button type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={
                    showPassword
                      ? "Masquer le mot de passe"
                      : "Afficher le mot de passe"
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/50 hover:text-primary"
                >
                  {showPassword ? (
                    <IconlyHide size={20} />
                  ) : (
                    <IconlyShow size={20} />
                  )}
                </button>
              </div>

              {/* Sécurité */}
              {password && (
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3].map((bar) => (
                      <div
                        key={bar}
                        className={`h-1 flex-1 transition-all ${score >= 4
                          ? "bg-primary"
                          : score === 3 && bar <= 2
                            ? "bg-primary"
                            : score <= 2 && bar === 1
                              ? "bg-primary"
                              : "bg-primary/10"
                          }`}
                      />
                    ))}

                    <span className="ml-2 font-ui text-xs text-primary/60">
                      {strength}
                    </span>
                  </div>

                  {/* Conditions */}
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 font-ui text-xs">
                    <Requirement
                      valid={requirements.length}
                      text="8 caractères minimum"
                    />

                    <Requirement
                      valid={requirements.uppercase}
                      text="Une majuscule"
                    />

                    <Requirement
                      valid={requirements.lowercase}
                      text="Une minuscule"
                    />

                    <Requirement
                      valid={requirements.number}
                      text="Un chiffre"
                    />
                  </div>
                </div>
              )}

              {/* Génération */}
              <div className="w-full flex justify-end items-center">
                <button type="button"
                  onClick={generatePassword}
                  className="font-ui flex justify-start items-center gap-2 text-xs font-medium text-primary underline"
                >
                  <IconlyRefresh size={12} color="currentColor" />
                  Générer un mot de passe
                </button>
              </div>
            </div>

            <button type="submit"
              disabled={loading}
              className="w-full mt-4 font-ui bg-primary flex justify-center items-center py-3 text-sm font-semibold text-background"
            >
              {loading ? <IconlyLoader color="currentColor" size={24} /> : "Créer mon compte"}
            </button>

            <div className="flex justify-center items-center gap-2">
              <span className="font-ui font-medium text-primary/70 text-sm">Déjà un compte ?</span>
              <a href="/login" className="font-ui underline hover:text-primary font-medium text-primary text-sm">Connexion</a>
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
