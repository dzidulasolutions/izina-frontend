"use client";

import { useState } from "react";
import { IconlyDownload } from "../ui/icons";
import { useInstallPrompt } from "@/src/hooks/use-install-prompt";
import Modal from "../ui/modal";

export default function InstallButton({ className = "" }: { className?: string }) {
  const { canShow, ios, promptInstall } = useInstallPrompt();
  const [iosModalOpen, setIosModalOpen] = useState(false);

  if (!canShow) return null;

  const handleClick = () => {
    if (ios) {
      setIosModalOpen(true);
    } else {
      promptInstall();
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className={`inline-flex items-center font-ui gap-1 h-10 px-4 bg-black text-white text-sm font-base rounded-control hover:bg-black/85 transition-colors ${className}`}
      >
        <IconlyDownload size={16} color="currentColor" />
        Installer l&apos;app
      </button>

      <Modal open={iosModalOpen} onClose={() => setIosModalOpen(false)} title="Installer AuTogo">
        <div className="flex flex-col gap-3 text-small text-muted font-ui">
          <p>Pour installer AuTogo sur votre iPhone :</p>
          <ol className="list-decimal list-inside flex flex-col gap-2">
            <li>
              Appuyez sur l&apos;icône <strong className="text-foreground">Partager</strong> en bas de l&apos;écran
              Safari.
            </li>
            <li>
              Faites défiler et appuyez sur{" "}
              <strong className="text-foreground">Sur l&apos;écran d&apos;accueil</strong>.
            </li>
            <li>
              Appuyez sur <strong className="text-foreground">Ajouter</strong>.
            </li>
          </ol>
        </div>
      </Modal>
    </>
  );
}