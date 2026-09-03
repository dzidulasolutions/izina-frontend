"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  IconlyHide,
  IconlyLoader,
  IconlyLogo,
  IconlyShow,
} from "@/src/components/ui/icons";
import Alert from "@/src/components/ui/alert";

type Step = "email" | "code" | "password";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [step, setStep] = useState<Step>("email");

  const [email, setEmail] = useState("");
  const [code, setCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  /*
   * ============================
   * PASSWORD RULES
   * ============================
   */

  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  const passwordIsValid =
    hasMinLength &&
    hasUppercase &&
    hasLowercase &&
    hasNumber;

  const passwordsMatch =
    password.length > 0 &&
    password === confirmPassword;

  /*
   * ============================
   * PASSWORD STRENGTH
   * ============================
   */

  const passwordStrength = [
    hasMinLength,
    hasUppercase,
    hasLowercase,
    hasNumber,
  ].filter(Boolean).length;

  /*
   * ============================
   * PASSWORD SUGGESTION
   * ============================
   */

  const generatePassword = () => {
    const suggestedPassword = "Motdepasse2026";

    setPassword(suggestedPassword);
    setConfirmPassword(suggestedPassword);
  };

  /*
   * ============================
   * FOCUS CODE
   * ============================
   */

  useEffect(() => {
    if (step === "code") {
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    }
  }, [step]);

  /*
   * ============================
   * SEND RESET CODE
   * ============================
   */

  const handleSendCode = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setAlert(null);
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
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
        message:
          data.message ||
          "Un code de réinitialisation a été envoyé.",
      });

      setStep("code");
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
   * ============================
   * CODE CHANGE
   * ============================
   */

  const handleCodeChange = (
    index: number,
    value: string
  ) => {
    const digit = value
      .replace(/\D/g, "")
      .slice(-1);

    const newCode = [...code];

    newCode[index] = digit;

    setCode(newCode);

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  /*
   * ============================
   * CODE BACKSPACE
   * ============================
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
   * ============================
   * CODE PASTE
   * ============================
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

    const newCode = [
      "",
      "",
      "",
      "",
      "",
      "",
    ];

    pastedCode.split("").forEach((digit, index) => {
      newCode[index] = digit;
    });

    setCode(newCode);

    const nextIndex = Math.min(
      pastedCode.length,
      5
    );

    inputRefs.current[nextIndex]?.focus();
  };

  /*
   * ============================
   * VERIFY CODE
   * ============================
   *
   * Le code n'est pas envoyé
   * séparément au backend.
   *
   * On vérifie simplement qu'il
   * contient 6 chiffres, puis il
   * sera envoyé avec le nouveau
   * mot de passe dans reset-password.
   */

  const handleVerifyCode = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const verificationCode = code.join("");

    if (verificationCode.length !== 6) {
      setAlert({
        type: "error",
        message:
          "Veuillez entrer les 6 chiffres du code.",
      });

      return;
    }

    setAlert(null);
    setStep("password");
  };

  /*
   * ============================
   * RESEND CODE
   * ============================
   */

  const handleResend = async () => {
    setAlert(null);
    setResending(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message ||
            "Impossible de renvoyer le code."
        );
      }

      setCode([
        "",
        "",
        "",
        "",
        "",
        "",
      ]);

      setAlert({
        type: "success",
        message:
          data.message ||
          "Nouveau code envoyé.",
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

  /*
   * ============================
   * RESET PASSWORD
   * ============================
   */

  const handleResetPassword = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!passwordIsValid) {
      setAlert({
        type: "error",
        message:
          "Le mot de passe ne respecte pas les critères requis.",
      });

      return;
    }

    if (!passwordsMatch) {
      setAlert({
        type: "error",
        message:
          "Les mots de passe ne correspondent pas.",
      });

      return;
    }

    setAlert(null);
    setLoading(true);

    try {
      const verificationCode = code.join("");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            code: verificationCode,
            newPassword: password,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message ||
            "Impossible de réinitialiser le mot de passe."
        );
      }

      setAlert({
        type: "success",
        message:
          data.message ||
          "Mot de passe réinitialisé avec succès.",
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

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background p-4">

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

          {/* =================================
              ÉTAPE 1 — EMAIL
          ================================= */}

          {step === "email" && (
            <>
              <h1 className="mt-8 font-righteous text-2xl text-primary">
                Mot de passe oublié
              </h1>

              <p className="mb-6 font-ui text-sm font-medium text-gray-500">
                Entrez votre email pour recevoir un
                code de réinitialisation.
              </p>

              <form
                onSubmit={handleSendCode}
                className="flex flex-col gap-4"
              >

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
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

                <a
                  href="/login"
                  className="text-center font-ui text-sm font-medium text-gray-500 underline hover:text-primary"
                >
                  Retour à la connexion
                </a>

              </form>
            </>
          )}

          {/* =================================
              ÉTAPE 2 — CODE
          ================================= */}

          {step === "code" && (
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

                <div className="flex w-full justify-between gap-2">

                  {code.map((digit, index) => (
                    <input
                      key={index}
                      ref={(element) => {
                        inputRefs.current[index] =
                          element;
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
                        handleCodeKeyDown(
                          index,
                          e
                        )
                      }
                      onPaste={handleCodePaste}
                      aria-label={`Chiffre ${
                        index + 1
                      } du code`}
                      className="h-14 w-full border border-primary/30 text-center font-ui text-xl font-semibold text-primary outline-none focus:border-primary"
                    />
                  ))}

                </div>

                <button
                  type="submit"
                  className="mt-4 flex w-full items-center justify-center bg-primary py-3 font-ui text-sm font-semibold text-background"
                >
                  Continuer
                </button>

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

              </form>
            </>
          )}

          {/* =================================
              ÉTAPE 3 — NOUVEAU MOT DE PASSE
          ================================= */}

          {step === "password" && (
            <>
              <h1 className="mt-8 font-righteous text-2xl text-primary">
                Nouveau mot de passe
              </h1>

              <p className="mb-6 font-ui text-sm font-medium text-gray-500">
                Choisissez un nouveau mot de passe
                sécurisé.
              </p>

              <form
                onSubmit={handleResetPassword}
                className="flex flex-col gap-4"
              >

                {/* MOT DE PASSE */}

                <div className="relative">

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={password}
                    onChange={(e) =>
                      setPassword(
                        e.target.value
                      )
                    }
                    placeholder="Nouveau mot de passe"
                    required
                    minLength={8}
                    className="w-full border border-primary/30 px-4 py-2 pr-11 font-ui text-sm text-primary outline-none focus:border-primary"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-primary"
                  >
                    {showPassword ? (
                      <IconlyHide
                        size={18}
                        color="currentColor"
                      />
                    ) : (
                      <IconlyShow
                        size={18}
                        color="currentColor"
                      />
                    )}
                  </button>

                </div>

                {/* SUGGESTION */}

                <button
                  type="button"
                  onClick={generatePassword}
                  className="text-left font-ui text-xs font-medium text-primary underline"
                >
                  Suggérer un mot de passe
                </button>

                {/* FORCE */}

                {password.length > 0 && (
                  <div className="flex gap-1">

                    {[0, 1, 2, 3].map(
                      (index) => (
                        <div
                          key={index}
                          className={`h-1 flex-1 ${
                            index <
                            passwordStrength
                              ? "bg-primary"
                              : "bg-primary/10"
                          }`}
                        />
                      )
                    )}

                  </div>
                )}

                {/* CRITÈRES */}

                <div className="flex flex-col gap-1 font-ui text-xs">

                  <p
                    className={
                      hasMinLength
                        ? "text-green-600"
                        : "text-gray-400"
                    }
                  >
                    {hasMinLength
                      ? "✓"
                      : "○"}{" "}
                    8 caractères minimum
                  </p>

                  <p
                    className={
                      hasUppercase &&
                      hasLowercase
                        ? "text-green-600"
                        : "text-gray-400"
                    }
                  >
                    {hasUppercase &&
                    hasLowercase
                      ? "✓"
                      : "○"}{" "}
                    Une majuscule et une minuscule
                  </p>

                  <p
                    className={
                      hasNumber
                        ? "text-green-600"
                        : "text-gray-400"
                    }
                  >
                    {hasNumber
                      ? "✓"
                      : "○"}{" "}
                    Un chiffre
                  </p>

                </div>

                {/* CONFIRMATION */}

                <div className="relative">

                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(
                        e.target.value
                      )
                    }
                    placeholder="Confirmez le mot de passe"
                    required
                    className="w-full border border-primary/30 px-4 py-2 pr-11 font-ui text-sm text-primary outline-none focus:border-primary"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-primary"
                  >
                    {showConfirmPassword ? (
                      <IconlyHide
                        size={18}
                        color="currentColor"
                      />
                    ) : (
                      <IconlyShow
                        size={18}
                        color="currentColor"
                      />
                    )}
                  </button>

                </div>

                {confirmPassword.length > 0 && (
                  <p
                    className={`font-ui text-xs ${
                      passwordsMatch
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {passwordsMatch
                      ? "✓ Les mots de passe correspondent"
                      : "✕ Les mots de passe ne correspondent pas"}
                  </p>
                )}

                {/* RESET */}

                <button
                  type="submit"
                  disabled={
                    loading ||
                    !passwordIsValid ||
                    !passwordsMatch
                  }
                  className="mt-4 flex w-full items-center justify-center bg-primary py-3 font-ui text-sm font-semibold text-background disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? (
                    <IconlyLoader
                      color="currentColor"
                      size={24}
                    />
                  ) : (
                    "Réinitialiser le mot de passe"
                  )}
                </button>

              </form>
            </>
          )}

        </div>
      </div>
    </div>
  );
}

