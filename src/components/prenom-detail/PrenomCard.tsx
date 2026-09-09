"use client";

import { useRef, useState } from "react";
import { toJpeg } from "html-to-image";
import { IconlyDownload, IconlyLoader } from "@/src/components/ui/icons";

interface PrenomCardProps {
  label: string;
  meaning: string;
  origin: string;
  onDownload?: () => void;
}

const palette = [
  { name: "Émeraude", bg: "#207561", text: "#FFFFFF", accent: "#F5F5F5" },
  { name: "Noir", bg: "#0F0F0F", text: "#FFFFFF", accent: "#207561" },
  { name: "Ivoire", bg: "#F5F5F5", text: "#0F0F0F", accent: "#207561" },
];

// Motif géométrique inspiré des tissages ouest-africains (kente),
// en SVG pattern répétable, coloré dynamiquement via currentColor
function CardPattern({ color }: { color: string }) {
  const patternId = "izina-pattern";
  return (
    <svg className="absolute inset-0 h-full w-full" style={{ opacity: 0.12 }}>
      <defs>
        <pattern id={patternId} width="56" height="56" patternUnits="userSpaceOnUse">
          <path d="M0 28 L28 0 L56 28 L28 56 Z" fill="none" stroke={color} strokeWidth="1.5" />
          <circle cx="28" cy="28" r="3" fill={color} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}

export function PrenomCard({ label, meaning, origin, onDownload }: PrenomCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [colorIndex, setColorIndex] = useState(0);
  const [downloading, setDownloading] = useState(false);

  const current = palette[colorIndex];

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const dataUrl = await toJpeg(cardRef.current, { quality: 0.95, pixelRatio: 3 });
      const link = document.createElement("a");
      link.download = `izina-${label.toLowerCase()}.jpg`;
      link.href = dataUrl;
      link.click();
      onDownload?.();
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="flex items-start gap-3">
      {/* CARTE */}
      <div
        ref={cardRef}
        className="relative aspect-square w-full max-w-sm overflow-hidden p-8"
        style={{ backgroundColor: current.bg, color: current.text }}
      >
        <CardPattern color={current.accent} />

        <div className="relative z-10 flex h-full flex-col justify-between">
          <div className="flex items-center gap-2">
            <span
              className="flex h-7 w-7 items-center justify-center font-righteous text-xs"
              style={{ backgroundColor: current.accent, color: current.bg }}
            >
              i
            </span>
            <span className="font-ui text-[10px] uppercase tracking-[0.2em]" style={{ opacity: 0.6 }}>
              izina
            </span>
          </div>

          <div>
            <div className="h-0.5 w-10" style={{ backgroundColor: current.accent }} />
            <h2 className="mt-4 font-righteous text-5xl leading-none">{label}</h2>
            <p className="mt-3 font-ui text-sm" style={{ opacity: 0.75 }}>{meaning}</p>
          </div>

          <p className="font-ui text-[10px] uppercase tracking-widest" style={{ opacity: 0.5 }}>
            {origin}
          </p>
        </div>
      </div>

      {/* BOUTONS COULEUR + TÉLÉCHARGER — verticaux à droite */}
      <div className="flex flex-col items-center gap-3 pt-2">
        {palette.map((p, index) => (
          <button
            key={p.name}
            type="button"
            aria-label={`Couleur ${p.name}`}
            onClick={() => setColorIndex(index)}
            className={`h-8 w-8 shrink-0 border-2 transition-transform ${
              colorIndex === index ? "scale-110 border-primary" : "border-primary/10"
            }`}
            style={{ backgroundColor: p.bg }}
          />
        ))}

        <div className="my-1 h-px w-6 bg-primary/10" />

        <button
          type="button"
          onClick={handleDownload}
          disabled={downloading}
          aria-label="Télécharger la carte"
          className="flex h-10 w-10 shrink-0 items-center justify-center bg-primary text-background disabled:opacity-50"
        >
          {downloading ? <IconlyLoader size={16} color="currentColor" /> : <IconlyDownload size={16} color="currentColor" />}
        </button>
      </div>
    </div>
  );
}