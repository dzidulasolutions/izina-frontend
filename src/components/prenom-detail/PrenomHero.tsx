"use client";

import { forwardRef, useState } from "react";
import { IconlyLogo } from "../ui/icons";

interface PrenomHeroProps {
  label: string;
  gender: string;
  origin: string;
  meaningFr: string;
  meaningEn: string;
  bgColor: string;
  onColorChange: (color: string) => void;
  lang: "fr" | "en";
  onLangChange: (lang: "fr" | "en") => void;
}

const colors = ["#171717", "#007DCC", "#E73F1E", "#207561"];

export const PrenomHero = forwardRef<HTMLDivElement, PrenomHeroProps>(
  ({ label, gender, origin, meaningFr, meaningEn, bgColor, onColorChange, lang, onLangChange }, ref) => {
    const meaning = lang === "fr" ? meaningFr : meaningEn;

    return (
      <section className="relative my-5">
        {/* ZONE CAPTURÉE — design inchangé, juste bgColor dynamique */}
        <div ref={ref} className="grid-wrapper p-6 text-background" style={{ backgroundColor: bgColor }}>
          <div className="flex w-full items-center justify-between">
            <p className="font-ui text-[10px] uppercase tracking-[0.2em] text-background/40">
              Prénom africain · {gender}
            </p>
            <IconlyLogo size={24} color="currentColor" />
          </div>

          <h1 className="mt-8 font-righteous text-6xl">{label}</h1>
          <p className="mt-2 font-ui text-sm text-background/60">{origin}</p>

          <div className="mt-8 border-t border-background/10 pt-5">
            <p className="font-ui text-[10px] uppercase tracking-widest text-background/40">Signification</p>
            <p className="mt-2 font-righteous text-2xl">{meaning}</p>
          </div>

          <div className="grid-background -z-10" />
        </div>

        {/* BOUTONS COULEUR — absolute à droite, sans bordure */}
        <div className="absolute right-3 bottom-14 flex flex-col gap-2">
          {colors.map((c) => (
            <button
              key={c}
              type="button"
              aria-label={`Couleur ${c}`}
              onClick={() => onColorChange(c)}
              className={`h-6 w-6 shrink-0 border border-0.2 border-gray-50 rounded-full transition-transform ${bgColor === c ? "scale-125" : "opacity-70"}`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        {/* TOGGLE LANGUE */}
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={() => onLangChange("fr")}
            className={`px-3 py-1 font-ui text-xs ${lang === "fr" ? "bg-primary text-background" : "text-primary/50"}`}
          >
            FR
          </button>
          <button
            type="button"
            onClick={() => onLangChange("en")}
            className={`px-3 py-1 font-ui text-xs ${lang === "en" ? "bg-primary text-background" : "text-primary/50"}`}
          >
            EN
          </button>
        </div>
      </section>
    );
  },
);

PrenomHero.displayName = "PrenomHero";