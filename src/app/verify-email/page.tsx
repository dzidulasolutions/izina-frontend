"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { IconlyLoader, IconlyLogo } from "@/src/components/ui/icons";
import Alert from "@/src/components/ui/alert";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialEmail = searchParams.get("email") ?? "";

  const [email, setEmail] = useState(initialEmail);
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  const [step, setStep] = useState<"email" | "verification">(
    initialEmail ? "verification" : "email"
  );

  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  /*
   * Focus automatique sur le premier champ
   * lorsque la vérification est affichée.
   */
  useEffect(() => {
    if (step === "verification") {
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    }
  }, [step]);

  /*
   * ENVOYER LE CODE
   */
  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setAlert({
        type: "error",
        message: "Veuillez entrer votre adresse email.",
      });
      return;
    }

    setAlert(null);
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/resend-verification-code`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Impossible d'envoyer le code."
        );
      }

      setAlert({
        type: "success",
        message: data.message || "Code envoyé avec succès.",
      });

      setStep("verification");
    } catch (err) {
      setAlert({
        type: "error",
        message:
          err instanceof Error
            ? err.message
            : "Une erreur est survenue.",
      });
    } finally {
      setLoading(false);
    }
  };

  /*
   * SAISIE DU CODE
   */
  const handleCodeChange = (
    index: number,
    value: string
  ) => {
    const digit = value.replace(/\D/g, "").slice(-1);

    const newCode = [...code];
    newCode[index] = digit;

    setCode(newCode);

    // Passage automatique au champ suivant
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  /*
   * BACKSPACE
   */
  const handleCodeKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (
      e.key === "Backspace" &&
      !code[index] &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  /*
   * COLLAGE DU CODE
   */
  const handleCodePaste = (
    e: React.ClipboardEvent<HTMLInputElement>
  ) => {
    e.preventDefault();

    const pastedCode = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pastedCode) return;

    const newCode = ["", "", "", "", "", ""];

    pastedCode.split("").forEach((digit, index) => {
      newCode[index] = digit;
    });

    setCode(newCode);

    const nextIndex = Math.min(pastedCode.length, 5);

    inputRefs.current[nextIndex]?.focus();
  };

  /*
   * VÉRIFIER LE CODE
   */
  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();

    const verificationCode = code.join("");

    if (verificationCode.length !== 6) {
      setAlert({
        type: "error",
        message: "Veuillez entrer le code complet.",
      });
      return;
    }

    setAlert(null);
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            code: verificationCode,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Code de vérification invalide."
        );
      }

      setAlert({
        type: "success",
        message:
          data.message || "Email vérifié avec succès.",
      });

      setTimeout(() => {
        router.replace("/login");
      }, 1000);
    } catch (err) {
      setAlert({
        type: "error",
        message:
          err instanceof Error
            ? err.message
            : "Une erreur est survenue.",
      });
    } finally {
      setLoading(false);
    }
  };

  /*
   * RENVoyer le code
   */
  const handleResend = async () => {
    setAlert(null);
    setResending(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/resend-verification-code`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Impossible de renvoyer le code."
        );
      }

      setCode(["", "", "", "", "", ""]);

      setAlert({
        type: "success",
        message: data.message || "Nouveau code envoyé.",
      });

      inputRefs.current[0]?.focus();
    } catch (err) {
      setAlert({
        type: "error",
        message:
          err instanceof Error
            ? err.message
            : "Impossible de renvoyer le code.",
      });
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center p-4">

      <div className="relative flex h-auto w-full flex-col items-center justify-center px-4 pb-8 lg:w-100">

        <IconlyLogo size={32} color="currentColor" />

        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}

        <div className="w-full">

          {/* =========================
              ÉTAPE 1 : EMAIL
          ========================= */}

          {step === "email" && (
            <>
              <h1 className="mt-8 font-righteous text-2xl text-primary">
                Vérification
              </h1>

              <p className="mb-6 font-ui text-sm font-medium text-gray-500">
                Entrez votre adresse email pour recevoir
                votre code de vérification.
              </p>

              <form
                onSubmit={handleSendCode}
                className="flex flex-col gap-4"
              >

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Entrez votre email"
                  required
                  className="w-full border border-primary/30 px-4 py-2 font-ui text-sm text-primary outline-none focus:border-primary"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-4 flex w-full items-center justify-center bg-primary py-3 font-ui text-sm font-semibold text-background"
                >
                  {loading ? (
                    <IconlyLoader
                      color="currentColor"
                      size={24}
                    />
                  ) : (
                    "Envoyer le code"
                  )}
                </button>

              </form>
            </>
          )}

          {/* =========================
              ÉTAPE 2 : CODE
          ========================= */}

          {step === "verification" && (
            <>
              <h1 className="mt-8 font-righteous text-2xl text-primary">
                Vérification
              </h1>

              <p className="mb-2 font-ui text-sm font-medium text-gray-500">
                Entrez le code reçu par email.
              </p>

              <p className="mb-6 font-ui text-xs text-gray-400">
                Code envoyé à{" "}
                <span className="font-semibold text-primary">
                  {email}
                </span>
              </p>

              <form
                onSubmit={handleVerifyCode}
                className="flex flex-col gap-4"
              >

                {/* 6 CHAMPS DU CODE */}

                <div className="flex w-full justify-between gap-2">

                  {code.map((digit, index) => (
                    <input
                      key={index}
                      ref={(element) => {
                        inputRefs.current[index] = element;
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) =>
                        handleCodeChange(
                          index,
                          e.target.value
                        )
                      }
                      onKeyDown={(e) =>
                        handleCodeKeyDown(index, e)
                      }
                      onPaste={handleCodePaste}
                      aria-label={`Chiffre ${index + 1} du code`}
                      className="h-14 w-full border border-primary/30 text-center font-ui text-xl font-semibold text-primary outline-none focus:border-primary"
                    />
                  ))}

                </div>

                {/* VÉRIFIER */}

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-4 flex w-full items-center justify-center bg-primary py-3 font-ui text-sm font-semibold text-background"
                >
                  {loading ? (
                    <IconlyLoader
                      color="currentColor"
                      size={24}
                    />
                  ) : (
                    "Vérifier"
                  )}
                </button>

                {/* RENVoyer */}

                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resending}
                  className="flex w-full items-center justify-center bg-primary/10 py-3 font-ui text-sm font-semibold text-primary"
                >
                  {resending ? (
                    <IconlyLoader
                      color="currentColor"
                      size={24}
                    />
                  ) : (
                    "Renvoyer le code"
                  )}
                </button>

                {/* MODIFIER EMAIL */}

                <button
                  type="button"
                  onClick={() => {
                    setStep("email");
                    setAlert(null);
                  }}
                  className="font-ui text-xs text-gray-500 underline"
                >
                  Modifier l&apos;adresse email
                </button>

              </form>
            </>
          )}

        </div>
      </div>
    </div>
  );
}

