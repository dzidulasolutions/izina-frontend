"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FiXCircle, IconlyLoader, IconlyBirthCake } from "@/src/components/ui/icons";

interface BirthdayModalProps {
  open: boolean;
  date: { year: number; monthIndex: number; day: number } | null;
  onClose: () => void;
  onSubmit: (data: { label: string; relationship: string; note: string }) => Promise<void>;
  loading: boolean;
}

const MONTHS_FR = [
  "janvier", "février", "mars", "avril", "mai", "juin",
  "juillet", "août", "septembre", "octobre", "novembre", "décembre",
];

const DEFAULT_NOTE = "Ne pas oublier de lui souhaiter un joyeux anniversaire 🎉";

export function BirthdayModal({ open, date, onClose, onSubmit, loading }: BirthdayModalProps) {
  const [label, setLabel] = useState("");
  const [relationship, setRelationship] = useState("");
  const [note, setNote] = useState(DEFAULT_NOTE);
  const [justAdded, setJustAdded] = useState(false);

  const resetAndClose = () => {
    setLabel("");
    setRelationship("");
    setNote(DEFAULT_NOTE);
    setJustAdded(false);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!label.trim()) return;
    await onSubmit({ label: label.trim(), relationship: relationship.trim(), note: note.trim() });
    setJustAdded(true);
    setTimeout(() => {
      resetAndClose();
    }, 1200);
  };

  return (
    <AnimatePresence>
      {open && date && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={resetAndClose}
            className="fixed inset-0 z-40 bg-primary/20"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            onClick={(e) => e.stopPropagation()}
            className="fixed left-1/2 top-1/2 z-50 w-[90%] max-w-sm -translate-x-1/2 -translate-y-1/2 bg-background p-5"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-ui text-[10px] uppercase tracking-widest text-gray-400">Ajouter un événement</p>
                <h3 className="mt-1 font-righteous text-xl text-primary">
                  {date.day} {MONTHS_FR[date.monthIndex]} {date.year}
                </h3>
              </div>
              <button type="button" onClick={resetAndClose} className="flex h-8 w-8 items-center justify-center bg-primary text-background">
                <FiXCircle size={16} color="currentColor" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
              <div className="space-y-2">
                <label className="font-ui text-xs font-semibold uppercase tracking-wide text-primary/70">
                  C&apos;est l&apos;anniversaire de
                </label>
                <input
                  type="text"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  placeholder="Ex : Maman"
                  required
                  disabled={justAdded}
                  className="h-11 w-full border border-primary/30 px-3 font-ui text-sm text-primary outline-none focus:border-primary disabled:opacity-50"
                />
              </div>

              <div className="space-y-2">
                <label className="font-ui text-xs font-semibold uppercase tracking-wide text-primary/70">
                  Relation (optionnel)
                </label>
                <input
                  type="text"
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  placeholder="Ex : Mère, ami, conjoint..."
                  disabled={justAdded}
                  className="h-11 w-full border border-primary/30 px-3 font-ui text-sm text-primary outline-none focus:border-primary disabled:opacity-50"
                />
              </div>

              <div className="space-y-2">
                <label className="font-ui text-xs font-semibold uppercase tracking-wide text-primary/70">
                  Note (optionnel)
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={2}
                  disabled={justAdded}
                  className="w-full resize-none border border-primary/30 px-3 py-2 font-ui text-sm text-primary outline-none focus:border-primary disabled:opacity-50"
                />
              </div>

              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  onClick={resetAndClose}
                  disabled={justAdded}
                  className="h-11 flex-1 border border-primary/30 font-ui text-sm font-medium text-primary disabled:opacity-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={loading || justAdded || !label.trim()}
                  className={`flex h-11 flex-1 items-center justify-center gap-2 font-ui text-sm font-semibold transition-colors disabled:cursor-not-allowed ${
                    justAdded
                      ? "bg-green-600 text-white"
                      : "bg-primary text-background disabled:opacity-50"
                  }`}
                >
                  {loading ? (
                    <IconlyLoader size={18} color="currentColor" />
                  ) : justAdded ? (
                    <>
                      <IconlyBirthCake size={16} color="currentColor" />
                      Ajouté
                    </>
                  ) : (
                    "Ajouter"
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}