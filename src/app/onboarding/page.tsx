"use client";

import { IconlyLogo } from "@/src/components/ui/icons";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const router = useRouter();

  const handleStart = () => {
    localStorage.setItem("hasSeenOnboarding", "true");
    router.replace("/login");
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-between bg-background px-6 py-12">
      <div className="w-100 flex flex-1 flex-col items-start justify-center text-start">
            <div className="flex ">

                  <h1 className="font-righteous text-2xl text-primary/20 text-start">Bienvenu sur izina</h1>
                  <IconlyLogo size={32} color="currentColor"/>
            </div>
        <h1 className="font-righteous text-2xl text-primary mt-8"> Découvrez des milliers de prénoms africains</h1>
        <p className="mt-4 font-ui text-sm text-primary/70">
            Découvrez les significations, les origines et les histoires uniques des
            prénoms d&apos;Afrique de l&apos;Ouest, et explorez la richesse de notre
            patrimoine culturel.
      </p>
      </div>

      <button onClick={handleStart} className="w-100 font-ui bg-primary py-3 text-sm font-semibold text-background">Commencer</button>
    </div>
  );
}