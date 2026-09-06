"use client";

import { useState } from "react";
import { IconlyArrowLeft, IconlyArrowRight, FiXCircle, IconlyPlus, IconlyLoader, } from "../ui/icons";

export type NewContribution = {
  label: string;
  description: {
    fr: string;
    en: string;
  };
  category: string[];
  country: string[];
  ethnicGroup: string[];
  gender: "féminin" | "masculin" | "neutre";
};

type NewContributionsCardProps = {
  onClose: () => void;
  onSubmit?: (data: NewContribution) => void;
  loading?: boolean;
};

const genders: { label: string; value: "féminin" | "masculin" | "neutre" }[] = [
  { label: "Féminin", value: "féminin" },
  { label: "Masculin", value: "masculin" },
  { label: "Mixte", value: "neutre" },
];

const categories = [
  "traditionnel",
  "moderne",
  "rare",
  "populaire",
  "original",
];

const NewContributionsCard = ({
  onClose,
  onSubmit,
  loading = false,
}: NewContributionsCardProps) => {
  const [step, setStep] = useState(1);

  const [form, setForm] = useState<NewContribution>({
    label: "",
    description: {
      fr: "",
      en: "",
    },
    category: [],
    country: [],
    ethnicGroup: [],
    gender: "féminin",
  });

  const updateForm = <K extends keyof NewContribution>(
    field: K,
    value: NewContribution[K]
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateDescription = (
    language: "fr" | "en",
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      description: {
        ...prev.description,
        [language]: value,
      },
    }));
  };

  const toggleCategory = (category: string) => {
    setForm((prev) => ({
      ...prev,
      category: prev.category.includes(category)
        ? prev.category.filter((item) => item !== category)
        : [...prev.category, category],
    }));
  };

  const updateArrayField = (
    field: "country" | "ethnicGroup",
    value: string
  ) => {
    updateForm(
      field,
      value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    );
  };

  const nextStep = () => {
    if (step < 3) {
      setStep((prev) => prev + 1);
    }
  };

  const previousStep = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    onSubmit?.(form);
  };

  return (
    <div className="flex h-full w-full flex-col bg-background">
      {/* HEADER */}
      <div className="flex shrink-0 items-start justify-between border-b border-primary/10 pb-4">
        <div>
          <p className="font-ui text-[10px] uppercase tracking-[0.2em] text-primary/50">
            Étape {step} sur 3
          </p>

          <h2 className="mt-1 font-righteous text-2xl text-primary">
            {step === 1 && "Le prénom"}
            {step === 2 && "Son origine"}
            {step === 3 && "Sa signification"}
          </h2>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="flex h-9 w-9 shrink-0 items-center justify-center bg-primary text-background"
          aria-label="Fermer"
        >
          <FiXCircle
            size={18}
            color="currentColor"
          />
        </button>
      </div>

      {/* PROGRESS */}
      <div className="mt-4 flex shrink-0 gap-1">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className={`h-1 flex-1 ${item <= step
              ? "bg-primary"
              : "bg-primary/10"
              }`}
          />
        ))}
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="flex min-h-0 flex-1 flex-col"
      >
        {/* CONTENT */}
        <div className="min-h-0 flex-1 overflow-y-auto scrollbar-none py-5">

          {/* ================= STEP 1 ================= */}
          {step === 1 && (
            <div className="space-y-6 scrollbar-none">
              <div>
                <p className="font-ui text-sm text-primary/60">
                  Commençons par les informations essentielles
                  du prénom.
                </p>
              </div>

              {/* Prénom */}
              <div className="space-y-2 scrollbar-none overflow-y-auto">
                <label htmlFor="label" className="font-ui text-xs font-semibold uppercase tracking-wide"> Prénom</label>
                <input id="label" type="text" value={form.label}
                  onChange={(e) =>
                    updateForm("label", e.target.value)
                  }
                  placeholder="Ex : Afia" required
                  className="h-12 w-full border border-primary bg-background px-3 font-ui text-sm text-primary outline-none placeholder:text-primary/30 focus:border-2"
                />
              </div>

              {/* Genre */}
              <div className="space-y-3">
                <label className="font-ui text-xs font-semibold uppercase tracking-wide">Genre</label>
                <div className="grid grid-cols-3 gap-2">
                  {genders.map((g) => {
                    const selected = form.gender === g.value;
                    return (
                      <button
                        key={g.value}
                        type="button"
                        onClick={() => updateForm("gender", g.value)}
                        className={`border px-3 py-3 font-ui text-xs transition-colors ${selected
                          ? "border-primary bg-primary text-background"
                          : "border-primary bg-background text-primary"
                          }`}
                      >
                        {g.label}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

          {/* ================= STEP 2 ================= */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <p className="font-ui text-sm text-primary/60">
                  Indique d&apos;où vient ce prénom et à quelle
                  communauté il est associé.
                </p>
              </div>

              {/* Pays */}
              <div className="space-y-2">
                <label
                  htmlFor="country"
                  className="font-ui text-xs font-semibold uppercase tracking-wide"
                >
                  Pays
                </label>

                <input
                  id="country"
                  type="text"
                  value={form.country.join(", ")}
                  onChange={(e) =>
                    updateArrayField(
                      "country",
                      e.target.value
                    )
                  }
                  placeholder="Ex : Togo, Ghana"
                  className="h-12 w-full border border-primary bg-background px-3 font-ui text-sm text-primary outline-none placeholder:text-primary/30 focus:border-2"
                />

                <p className="font-ui text-[10px] text-primary/40">
                  Sépare plusieurs pays avec une virgule.
                </p>
              </div>

              {/* Groupe ethnique */}
              <div className="space-y-2">
                <label
                  htmlFor="ethnicGroup"
                  className="font-ui text-xs font-semibold uppercase tracking-wide"
                >
                  Groupe ethnique
                </label>

                <input
                  id="ethnicGroup"
                  type="text"
                  value={form.ethnicGroup.join(", ")}
                  onChange={(e) =>
                    updateArrayField(
                      "ethnicGroup",
                      e.target.value
                    )
                  }
                  placeholder="Ex : Éwé"
                  className="h-12 w-full border border-primary bg-background px-3 font-ui text-sm text-primary outline-none placeholder:text-primary/30 focus:border-2"
                />

                <p className="font-ui text-[10px] text-primary/40">
                  Tu peux indiquer plusieurs groupes.
                </p>
              </div>
            </div>
          )}

          {/* ================= STEP 3 ================= */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <p className="font-ui text-sm text-primary/60">
                  Ajoute la signification et classe le prénom
                  pour aider les autres utilisateurs.
                </p>
              </div>

              {/* Français */}
              <div className="space-y-2">
                <label
                  htmlFor="description-fr"
                  className="font-ui text-xs font-semibold uppercase tracking-wide"
                >
                  Signification · Français
                </label>

                <textarea
                  id="description-fr"
                  value={form.description.fr}
                  onChange={(e) =>
                    updateDescription(
                      "fr",
                      e.target.value
                    )
                  }
                  placeholder="Ex : Née un vendredi"
                  rows={3}
                  required
                  className="w-full resize-none border border-primary bg-background px-3 py-3 font-ui text-sm text-primary outline-none placeholder:text-primary/30 focus:border-2"
                />
              </div>

              {/* English */}
              <div className="space-y-2">
                <label
                  htmlFor="description-en"
                  className="font-ui text-xs font-semibold uppercase tracking-wide"
                >
                  Signification · English
                </label>

                <textarea
                  id="description-en"
                  value={form.description.en}
                  onChange={(e) =>
                    updateDescription(
                      "en",
                      e.target.value
                    )
                  }
                  placeholder="Ex : Born on Friday"
                  rows={3}
                  required
                  className="w-full resize-none border border-primary bg-background px-3 py-3 font-ui text-sm text-primary outline-none placeholder:text-primary/30 focus:border-2"
                />
              </div>

              {/* Catégories */}
              <div className="space-y-3">
                <label className="font-ui text-xs font-semibold uppercase tracking-wide">
                  Catégories
                </label>

                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => {
                    const selected =
                      form.category.includes(category);

                    return (
                      <button
                        key={category}
                        type="button"
                        onClick={() =>
                          toggleCategory(category)
                        }
                        className={`border px-3 py-2 font-ui text-xs transition-colors ${selected
                          ? "border-primary bg-primary text-background"
                          : "border-primary bg-background text-primary"
                          }`}
                      >
                        {category}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* NAVIGATION */}
        <div className="flex shrink-0 items-center justify-between border-t border-primary/10 pt-4">
          {/* Retour */}
          <button
            type="button"
            onClick={previousStep}
            disabled={step === 1}
            className={`flex h-11 items-center gap-2 border border-primary px-4 font-ui text-xs font-semibold ${step === 1
              ? "cursor-not-allowed opacity-30"
              : "text-primary"
              }`}
          >
            <IconlyArrowLeft
              size={16}
              color="currentColor"
            />

            Retour
          </button>

          {/* Suivant / Envoyer */}
          {step < 3 ? (
            <button type="button" onClick={nextStep} className="flex h-11 items-center gap-2 bg-primary px-5 font-ui text-xs font-semibold text-background">
              Continuer <IconlyArrowRight size={16} color="currentColor"/>
            </button>
          ) : (
            <button type="submit" disabled={loading} className="flex h-11 justify-center items-center gap-2 bg-primary px-5 font-ui text-xs font-semibold text-background disabled:opacity-50">
              {loading ? ( <IconlyLoader size={16} color="currentColor" /> ) : (<> Proposer <IconlyPlus size={16} color="currentColor" /></>)}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default NewContributionsCard;