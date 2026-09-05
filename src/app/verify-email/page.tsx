"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { IconlyLoader, IconlyLogo } from "@/src/components/ui/icons";
import Alert from "@/src/components/ui/alert";
import { useVerifyEmail } from "@/src/hooks/useVerifyEmail";

export default function VerifyEmailPage() {
  const router = useRouter();
  const { verify, resend, loading, resending, alert, setAlert, hasToken } = useVerifyEmail();
  const initialEmail = useSearchParams().get("email") ?? "";
  const [email, setEmail] = useState(initialEmail);
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (!hasToken()) {
      router.replace("/register");
      return;
    }
    setTimeout(() => inputRefs.current[0]?.focus(), 100);
  }, [hasToken, router]);

  const handleCodeChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const newCode = [...code];
    newCode[index] = digit;
    setCode(newCode);
    if (digit && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleCodeKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleCodePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedCode = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pastedCode) return;
    const newCode = ["", "", "", "", "", ""];
    pastedCode.split("").forEach((digit, index) => { newCode[index] = digit; });
    setCode(newCode);
    inputRefs.current[Math.min(pastedCode.length, 5)]?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const verificationCode = code.join("");
    if (verificationCode.length !== 6) {
      setAlert({ type: "error", message: "Veuillez entrer le code complet." });
      return;
    }
    verify(verificationCode);
  };

  const handleResend = async () => {
    setCode(["", "", "", "", "", ""]);
    await resend();
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center p-4">
      <div className="relative flex h-auto w-full flex-col items-center justify-center px-4 pb-8 lg:w-100">
        <IconlyLogo size={32} color="currentColor" />
        {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

        <div className="w-full">
          <h1 className="mt-8 font-righteous text-2xl text-primary">Vérification</h1>
          <p className="mb-6 font-ui text-sm font-medium text-gray-500">
            Entrez le code reçu par email.
          </p>
          <p className="mb-6 font-ui text-xs text-gray-400">
            Code envoyé à{" "}
            <span className="font-semibold text-primary">
              {email}
            </span>
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex w-full justify-between gap-2">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => { inputRefs.current[index] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  onKeyDown={(e) => handleCodeKeyDown(index, e)}
                  onPaste={handleCodePaste}
                  aria-label={`Chiffre ${index + 1} du code`}
                  className="h-14 w-full border border-primary/30 text-center font-ui text-xl font-semibold text-primary outline-none focus:border-primary"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-4 flex w-full items-center justify-center bg-primary py-3 font-ui text-sm font-semibold text-background"
            >
              {loading ? <IconlyLoader color="currentColor" size={24} /> : "Vérifier"}
            </button>

            <button
              type="button"
              onClick={handleResend}
              disabled={resending}
              className="flex w-full items-center justify-center bg-primary/10 py-3 font-ui text-sm font-semibold text-primary"
            >
              {resending ? <IconlyLoader color="currentColor" size={24} /> : "Renvoyer le code"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}