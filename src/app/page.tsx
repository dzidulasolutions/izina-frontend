"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { IconlyLogo } from "../components/ui/icons";

const SPLASH_DURATION = 1500; // ms

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      const token = localStorage.getItem("token");
      const hasSeenOnboarding = localStorage.getItem("hasSeenOnboarding");

      if (token) {
        router.replace("/accueil");
      } else if (!hasSeenOnboarding) {
        router.replace("/onboarding");
      } else {
        router.replace("/login");
      }
    }, SPLASH_DURATION);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex h-screen w-screen items-center justify-center gap-2 bg-background">
        <span><IconlyLogo size={32}/></span>
      <h1 className="font-righteous text-3xl text-primary">izina</h1>
    </div>
  );
}