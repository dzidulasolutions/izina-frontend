"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";

export function AuthRequiredModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/30"
          />
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            className="fixed left-1/2 top-1/2 z-50 w-[90%] max-w-sm -translate-x-1/2 -translate-y-1/2 bg-background p-6 text-center border border-primary/10"
          >
            <h3 className="font-righteous text-xl text-primary">Connecte-toi</h3>
            <p className="mt-2 font-ui text-sm text-gray-500">
              Crée un compte ou connecte-toi pour interagir avec les prénoms.
            </p>
            <div className="mt-5 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => router.push("/login")}
                className="h-11 bg-primary font-ui text-sm font-semibold text-background"
              >
                Se connecter
              </button>
              <button
                type="button"
                onClick={onClose}
                className="h-11 font-ui text-sm font-medium text-gray-500"
              >
                Plus tard
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}