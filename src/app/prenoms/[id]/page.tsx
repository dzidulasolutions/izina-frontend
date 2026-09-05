"use client";

import {
    IconlyArrowLeft,
    IconlyHeart,
    IconlyShare,
    IconlyBookmark,
    IconlyDownload
} from "@/src/components/ui/icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
    FiCopy,
    FiCheck,
    FiMail,
    FiUsers,
    FiX,
} from "react-icons/fi";
import {
    FaWhatsapp,
    FaFacebookF,
    FaTelegramPlane,
} from "react-icons/fa";


const comments = [
    {
        id: "1",
        user: "Mawuli",
        comment: "J'aime beaucoup ce prénom. Sa signification est magnifique.",
        likes: 12,
        date: "Il y a 2 h",
    },
    {
        id: "2",
        user: "Akoss",
        comment: "C'est le prénom de mon frère.",
        likes: 7,
        date: "Il y a 5 h",
    },
];

export default function NameDetailsPage() {
    const router = useRouter();
    type ActionType = "like" | "save" | "download";
    const [isOpen, setIsOpen] = useState(false);
    const actions = [
        {
            type: "like" as ActionType,
            icon: IconlyHeart,
            count: 248,
            activeLabel: "J'aime",
        },
        {
            type: "save" as ActionType,
            icon: IconlyBookmark,
            count: 23,
            activeLabel: "Enregistré",
        },
        {
            type: "download" as ActionType,
            icon: IconlyDownload,
            count: 12,
            activeLabel: "Téléchargé",
        },
    ];
    const [active, setActive] = useState<Record<ActionType, boolean>>({
        like: false,
        save: false,
        download: false,
    });

    const [counts, setCounts] = useState<Record<ActionType, number>>({
        like: 248,
        save: 23,
        download: 12,
    });

    const [shareCount, setShareCount] = useState(12);

const handleShare = () => {
  setShareCount((prev) => prev + 1);
  setIsOpen(true);
};

    const [showPlusOne, setShowPlusOne] = useState<ActionType | null>(null);

    const handleAction = (type: ActionType) => {
        const isActive = active[type];

        setActive((prev) => ({
            ...prev,
            [type]: !isActive,
        }));

        setCounts((prev) => ({
            ...prev,
            [type]: isActive ? prev[type] - 1 : prev[type] + 1,
        }));

        // Afficher +1 uniquement lorsqu'on active
        if (!isActive) {
            setShowPlusOne(type);

            setTimeout(() => {
                setShowPlusOne((current) =>
                    current === type ? null : current
                );
            }, 1000);
        }
    };

    const [copied, setCopied] = useState(false);
    const shareUrl = "https://izina.app/prenoms/afia";
    const handleCopy = async () => {
        await navigator.clipboard.writeText(shareUrl);

        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 1000);
    };
    const platforms = [
        {
            name: "WhatsApp",
            icon: FaWhatsapp,
            className: "bg-primary text-background",
            action: () => {
                window.open(
                    `https://wa.me/?text=${encodeURIComponent(shareUrl)}`,
                    "_blank"
                );
            },
        },
        {
            name: "Facebook",
            icon: FaFacebookF,
            className: "bg-primary text-background",
            action: () => {
                window.open(
                    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                        shareUrl
                    )}`,
                    "_blank"
                );
            },
        },
        {
            name: "Telegram",
            icon: FaTelegramPlane,
            className: "bg-primary text-background",
            action: () => {
                window.open(
                    `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}`,
                    "_blank"
                );
            },
        },
        {
            name: "X",
            icon: FiX,
            className: "bg-primary text-background",
            action: () => {
                window.open(
                    `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                        shareUrl
                    )}`,
                    "_blank"
                );
            },
        },
        {
            name: "Email",
            icon: FiMail,
            className: "bg-primary text-background",
            action: () => {
                window.location.href = `mailto:?body=${encodeURIComponent(shareUrl)}`;
            },
        },
        {
            name: "Contacts",
            icon: FiUsers,
            className: "bg-primary text-background",
            action: async () => {
                if (navigator.share) {
                    await navigator.share({
                        title: "Izina",
                        text: "Découvre ce prénom sur Izina",
                        url: shareUrl,
                    });
                }
            },
        },
    ];

    return (
        <div className="h-screen w-full overflow-hidden scrollbar-none bg-background">

            <main className="relative mx-auto h-full w-full overflow-y-auto scrollbar-none md:w-[80%] lg:w-180">

                <div className="px-4 pb-10 pt-4">

                    {/* HEADER */}
                    <header className="flex items-center justify-between">

                        <button
                            onClick={() => router.back()}
                            className="flex h-10 w-10 items-center justify-center border border-primary/10"
                        >
                            <IconlyArrowLeft size={17} />
                        </button>

                        <p className="font-ui text-xs uppercase tracking-widest text-gray-400">
                            Détail
                        </p>

<motion.button
  type="button"
  onClick={handleShare}
  whileTap={{ scale: 0.9 }}
  animate={{
    scale: isOpen ? 1.05 : 1,
  }}
  className="flex h-10 w-16 items-center justify-center gap-2 bg-primary text-xs text-background"
>
  <motion.span
    animate={{
      rotate: isOpen ? 180 : 0,
      scale: [1, 1.15, 1],
    }}
    transition={{
      rotate: {
        type: "spring",
        stiffness: 400,
        damping: 20,
      },
      scale: {
        duration: 0.25,
      },
    }}
  >
    <IconlyShare size={17} color="currentColor" />
  </motion.span>

  {shareCount}
</motion.button>

                    </header>

                    {/* HERO */}
                    <section className="my-5 bg-primary p-6 text-background">

                        <p className="font-ui text-[10px] uppercase tracking-[0.2em] text-background/40">
                            Prénom africain · Masculin
                        </p>

                        <h1 className="mt-8 font-righteous text-6xl">
                            Kossi
                        </h1>

                        <p className="mt-2 font-ui text-sm text-background/60">
                            Ewe · Togo
                        </p>

                        <div className="mt-8 border-t border-background/10 pt-5">

                            <p className="font-ui text-[10px] uppercase tracking-widest text-background/40">
                                Signification
                            </p>

                            <p className="mt-2 font-righteous text-2xl">
                                Né un dimanche
                            </p>

                        </div>

                    </section>

                    {/* ACTIONS */}
                    <div className="grid grid-cols-3 gap-2">
                        {actions.map((action) => {
                            const Icon = action.icon;
                            const isActive = active[action.type];

                            return (
                                <motion.button
                                    key={action.type}
                                    type="button"
                                    onClick={() => handleAction(action.type)}
                                    whileTap={{ scale: 0.92 }}
                                    animate={{
                                        scale: isActive ? [1, 1.08, 1] : 1,
                                    }}
                                    transition={{
                                        duration: 0.2,
                                    }}
                                    className={`relative flex h-12 items-center justify-center gap-2 border font-ui text-xs transition-colors ${isActive
                                        ? "border-primary bg-primary text-background"
                                        : "border-primary/10 bg-background text-primary"
                                        }`}
                                >
                                    <motion.span
                                        animate={{
                                            scale: isActive ? [1, 1.25, 1] : 1,
                                        }}
                                        transition={{
                                            duration: 0.25,
                                        }}
                                    >
                                        <Icon size={16} color="currentColor" />
                                    </motion.span>

                                    <span>{counts[action.type]}</span>

                                    <AnimatePresence>
                                        {showPlusOne === action.type && (
                                            <motion.span
                                                initial={{
                                                    opacity: 0,
                                                    y: 4,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    y: -8,
                                                }}
                                                exit={{
                                                    opacity: 0,
                                                    y: -18,
                                                }}
                                                transition={{
                                                    duration: 0.3,
                                                }}
                                                className="absolute top-2 right-2 font-ui text-xs font-bold"
                                            >
                                                +1
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </motion.button>
                            );
                        })}
                    </div>

                    {/* INFORMATION */}
                    <section className="mt-7">

                        <p className="font-ui text-[10px] uppercase tracking-widest text-gray-400">
                            Origine
                        </p>

                        <h2 className="mt-1 font-righteous text-xl text-primary">
                            L&apos;histoire du prénom
                        </h2>

                        <p className="mt-4 font-ui text-sm leading-6 text-gray-500">
                            Kossi est un prénom traditionnel Ewe utilisé
                            principalement au Togo et dans certaines régions
                            voisines. Dans la tradition, il fait référence à
                            l&apos;enfant né un dimanche.
                        </p>

                    </section>

                    {/* DETAILS */}
                    <section className="mt-7 grid grid-cols-2 gap-2">

                        <div className="border border-primary/10 p-4">
                            <p className="font-ui text-[10px] uppercase text-gray-400">
                                Origine
                            </p>

                            <p className="mt-2 font-righteous text-lg">
                                Ewe
                            </p>
                        </div>

                        <div className="border border-primary/10 p-4">
                            <p className="font-ui text-[10px] uppercase text-gray-400">
                                Pays
                            </p>

                            <p className="mt-2 font-righteous text-lg">
                                Togo
                            </p>
                        </div>

                        <div className="border border-primary/10 p-4">
                            <p className="font-ui text-[10px] uppercase text-gray-400">
                                Popularité
                            </p>

                            <p className="mt-2 font-righteous text-lg">
                                Élevée
                            </p>
                        </div>

                        <div className="border border-primary/10 p-4">
                            <p className="font-ui text-[10px] uppercase text-gray-400">
                                Vues
                            </p>

                            <p className="mt-2 font-righteous text-lg">
                                2.4K
                            </p>
                        </div>

                    </section>

                    {/* COMMENTS */}
                    <section className="mt-8">

                        <div className="flex items-center justify-between">

                            <div>
                                <p className="font-ui text-[10px] uppercase tracking-widest text-gray-400">
                                    Communauté
                                </p>

                                <h2 className="mt-1 font-righteous text-xl">
                                    Commentaires
                                </h2>
                            </div>

                            <span className="font-ui text-xs text-gray-400">
                                24
                            </span>

                        </div>

                        <div className="mt-4 flex flex-col">

                            {comments.map((comment) => (

                                <article
                                    key={comment.id}
                                    className="border-b border-primary/10 py-4"
                                >

                                    <div className="flex items-center justify-between">

                                        <div className="flex items-center gap-2">

                                            <span className="flex h-8 w-8 items-center justify-center bg-primary font-righteous text-xs text-background">
                                                {comment.user[0]}
                                            </span>

                                            <div>
                                                <p className="font-ui text-xs font-semibold">
                                                    {comment.user}
                                                </p>

                                                <p className="font-ui text-[10px] text-gray-400">
                                                    {comment.date}
                                                </p>
                                            </div>

                                        </div>

                                        <span className="font-ui text-[10px] text-gray-400">
                                            ♡ {comment.likes}
                                        </span>

                                    </div>

                                    <p className="mt-3 font-ui text-sm leading-5 text-gray-500">
                                        {comment.comment}
                                    </p>

                                </article>

                            ))}

                        </div>

                    </section>

                    <section className="">
                        <AnimatePresence>
                            {isOpen && (
                                <>
                                    {/* OVERLAY */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        onClick={() => setIsOpen(false)}
                                        className="w-full fixed inset-0 z-40 bg-black/20"
                                    />

                                    {/* PANEL */}
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            y: 10,
                                            scale: 0.96,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                            scale: 1,
                                        }}
                                        exit={{
                                            opacity: 0,
                                            y: 10,
                                            scale: 0.96,
                                        }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 30,
                                        }}
                                        className="absolute right-0 left-0 bottom-0 z-50 md:w-[80%] lg:w-180 border border-primary/10 bg-background p-4 shadow-xl"
                                    >
                                        {/* HEADER */}
                                        <div className="mb-4">
                                            <p className="font-ui text-sm font-semibold text-primary">
                                                Partager
                                            </p>

                                            <p className="mt-1 font-ui text-xs text-primary/50">
                                                Partage ce prénom avec tes proches
                                            </p>
                                        </div>

                                        {/* PLATFORMS */}
                                        <div className="grid grid-cols-6 gap-2">
                                            {platforms.map((platform) => {
                                                const Icon = platform.icon;

                                                return (
                                                    <motion.button
                                                        key={platform.name}
                                                        type="button"
                                                        onClick={platform.action}
                                                        whileHover={{ y: -3 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        className="flex flex-col items-center gap-1.5"
                                                    >
                                                        <span
                                                            className={`flex h-10 w-10 items-center justify-center ${platform.className}`}
                                                        >
                                                            <Icon size={16} />
                                                        </span>

                                                        <span className="font-ui text-[9px] text-primary/60">
                                                            {platform.name}
                                                        </span>
                                                    </motion.button>
                                                );
                                            })}
                                        </div>

                                        {/* DIVIDER */}
                                        <div className="my-4 h-px bg-primary/10" />

                                        {/* LINK */}
                                        <div>
                                            <p className="mb-2 font-ui text-[10px] font-semibold uppercase tracking-wide text-primary/50">
                                                Lien
                                            </p>

                                            <div className="flex h-10 border border-primary/10">
                                                <input
                                                    type="text"
                                                    value={shareUrl}
                                                    readOnly
                                                    className="min-w-0 flex-1 bg-background px-3 font-ui text-xs text-primary outline-none"
                                                />

                                                <motion.button
                                                    type="button"
                                                    onClick={handleCopy}
                                                    whileTap={{ scale: 0.9 }}
                                                    className={`flex w-12 shrink-0 items-center justify-center transition-colors ${copied
                                                            ? "bg-primary text-background"
                                                            : "bg-primary/5 text-primary"
                                                        }`}
                                                >
                                                    <AnimatePresence mode="wait">
                                                        {copied ? (
                                                            <motion.span
                                                                key="check"
                                                                initial={{ scale: 0, rotate: -45 }}
                                                                animate={{ scale: 1, rotate: 0 }}
                                                                exit={{ scale: 0 }}
                                                            >
                                                                <FiCheck size={16} />
                                                            </motion.span>
                                                        ) : (
                                                            <motion.span
                                                                key="copy"
                                                                initial={{ scale: 0 }}
                                                                animate={{ scale: 1 }}
                                                                exit={{ scale: 0 }}
                                                            >
                                                                <FiCopy size={16} />
                                                            </motion.span>
                                                        )}
                                                    </AnimatePresence>
                                                </motion.button>
                                            </div>

                                            <AnimatePresence>
                                                {copied && (
                                                    <motion.p
                                                        initial={{ opacity: 0, y: -3 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -3 }}
                                                        className="mt-2 font-ui text-[10px] text-primary"
                                                    >
                                                        Lien copié ✓
                                                    </motion.p>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </section>

                </div>

            </main>

        </div>
    );
}
