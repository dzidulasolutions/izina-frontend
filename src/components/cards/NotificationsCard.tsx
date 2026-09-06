// dans NotificationsCard.tsx
"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  FiHeart,
  FiBookmark,
  FiMessageCircle,
  FiUserPlus,
  FiCheck,
} from "react-icons/fi";
import { IconlyNotification, FiXCircle } from "../ui/icons";
import { useNotifications } from "@/src/hooks/useNotifications";
import { useState } from "react";
import { NotificationType } from "@/src/lib/api/notifications";

const notificationIcons: Record<NotificationType, typeof FiHeart> = {
  commentaire_recu: FiMessageCircle,
  contribution_approuvee: FiUserPlus,
  contribution_rejetee: FiUserPlus,
  anniversaire: FiHeart,
};

const NotificationsCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();

  return (
    <div className="relative">
      <motion.button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        whileTap={{ scale: 0.9 }}
        className="relative flex h-10 w-10 items-center justify-center bg-primary text-background"
      >
        <motion.span
          animate={{ rotate: unreadCount > 0 ? [0, -10, 10, -10, 10, 0] : 0 }}
          transition={{ duration: 0.5, repeat: unreadCount > 0 ? Infinity : 0, repeatDelay: 4 }}
        >
          {isOpen ? <FiXCircle size={18} color="currentColor" /> : <IconlyNotification size={18} color="currentColor" />}
        </motion.span>

        <AnimatePresence>
          {unreadCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 font-ui text-[9px] font-bold text-white"
            >
              {unreadCount}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40"
            />

            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="absolute right-0 top-12 z-50 w-85 border border-primary/10 bg-background shadow-xl"
            >
              <div className="flex items-center justify-between border-b border-primary/10 p-4">
                <div>
                  <h3 className="font-righteous text-lg text-primary">Notifications</h3>
                  <p className="mt-0.5 font-ui text-[10px] text-primary/40">
                    {unreadCount > 0 ? `${unreadCount} notification${unreadCount > 1 ? "s" : ""} non lue${unreadCount > 1 ? "s" : ""}` : "Tout est lu"}
                  </p>
                </div>

                {unreadCount > 0 && (
                  <button type="button" onClick={markAllAsRead} className="flex items-center gap-1 font-ui text-[10px] text-primary">
                    <FiCheck size={13} />
                    Tout lire
                  </button>
                )}
              </div>

              <div className="max-h-90 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center">
                    <p className="font-ui text-xs text-primary/40">Aucune notification</p>
                  </div>
                ) : (
                  notifications.map((notification) => {
                    const Icon = notificationIcons[notification.type];
                    return (
                      <motion.button
                        key={notification.id}
                        type="button"
                        onClick={() => markAsRead(notification.id)}
                        whileTap={{ scale: 0.98 }}
                        className={`flex w-full gap-3 border-b border-primary/5 p-4 text-left transition-colors ${
                          notification.read ? "bg-background" : "bg-primary/4"
                        }`}
                      >
                        <div className="relative flex h-9 w-9 shrink-0 items-center justify-center bg-primary text-background">
                          <Icon size={15} />
                          {!notification.read && <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-500" />}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="font-ui text-xs font-semibold text-primary">{notification.title}</p>
                          <p className="mt-1 font-ui text-[11px] leading-4 text-primary/50">{notification.description}</p>
                          <p className="mt-2 font-ui text-[9px] text-primary/30">{notification.time}</p>
                        </div>
                      </motion.button>
                    );
                  })
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationsCard;