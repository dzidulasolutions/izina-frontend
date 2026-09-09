import { motion, AnimatePresence } from "motion/react";
import { IconlyHeart, IconlyBookmark, IconlyDownload } from "@/src/components/ui/icons";

type ActionType = "like" | "save" | "download";

export function PrenomActions({
  liked, saved, likesCount, savesCount, downloadsCount,
  onLike, onSave, onDownload,
}: {
  liked: boolean; saved: boolean;
  likesCount: number; savesCount: number; downloadsCount: number;
  onLike: () => void; onSave: () => void; onDownload: () => void;
}) {
  const actions: { type: ActionType; icon: typeof IconlyHeart; active: boolean; count: number; onClick: () => void }[] = [
    { type: "like", icon: IconlyHeart, active: liked, count: likesCount, onClick: onLike },
    { type: "save", icon: IconlyBookmark, active: saved, count: savesCount, onClick: onSave },
    { type: "download", icon: IconlyDownload, active: false, count: downloadsCount, onClick: onDownload },
  ];

  return (
    <div className="grid grid-cols-3 gap-2">
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <motion.button
            key={action.type}
            type="button"
            onClick={action.onClick}
            whileTap={{ scale: 0.92 }}
            animate={{ scale: action.active ? [1, 1.08, 1] : 1 }}
            transition={{ duration: 0.2 }}
            className={`relative flex h-12 items-center justify-center gap-2 border font-ui text-xs transition-colors ${
              action.active ? "border-primary bg-primary text-background" : "border-primary/10 bg-background text-primary"
            }`}
          >
            <Icon size={16} color="currentColor" />
            <span>{action.count}</span>
          </motion.button>
        );
      })}
    </div>
  );
}