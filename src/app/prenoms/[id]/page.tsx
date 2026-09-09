"use client";

import { useParams, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { IconlyArrowLeft, IconlyShare } from "@/src/components/ui/icons";
import {
    FiCopy, FiCheck, FiMail, FiUsers, FiX,
} from "react-icons/fi";
import { FaWhatsapp, FaFacebookF, FaTelegramPlane } from "react-icons/fa";

import { usePrenomDetail, popularityLabel } from "@/src/hooks/usePrenomDetail";
import { PrenomHero } from "@/src/components/prenom-detail/PrenomHero";
import { PrenomActions } from "@/src/components/prenom-detail/PrenomActions";
import { PrenomStats } from "@/src/components/prenom-detail/PrenomStats";
import { PrenomComments } from "@/src/components/prenom-detail/PrenomComments";
import { AuthRequiredModal } from "@/src/components/auth/AuthRequiredModal";
import { useCurrentUser } from "@/src/hooks/useCurrentUser";
import { useRef, useState } from "react";
import { toJpeg } from "html-to-image";


export default function NameDetailsPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;
    const { user } = useCurrentUser();
    const { prenom, comments, loading, liked, saved, needsAuth, setNeedsAuth, handleLike, handleSave, handleDownload, handleShare, addComment } = usePrenomDetail(id);

    const [isShareOpen, setIsShareOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    const shareUrl = typeof window !== "undefined" ? `${window.location.origin}/prenoms/${id}` : "";
    const cardRef = useRef<HTMLDivElement>(null);
    const [bgColor, setBgColor] = useState("#171717"); // noir par défaut
    const [lang, setLang] = useState<"fr" | "en">("fr");

    const handleDownloadCard = async () => {
        if (!prenom || !cardRef.current) return;

        const dataUrl = await toJpeg(cardRef.current, { quality: 0.95, pixelRatio: 3 });
        const link = document.createElement("a");
        link.download = `izina-${prenom.label.toLowerCase()}-${lang}.jpg`;
        link.href = dataUrl;
        link.click();

        handleDownload();
    };

    const handleOpenShare = () => {
        setIsShareOpen(true);
        handleShare();
    };

    const handleCopy = async () => {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
    };

    const platforms = [
        { name: "WhatsApp", icon: FaWhatsapp, action: () => window.open(`https://wa.me/?text=${encodeURIComponent(shareUrl)}`, "_blank") },
        { name: "Facebook", icon: FaFacebookF, action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank") },
        { name: "Telegram", icon: FaTelegramPlane, action: () => window.open(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}`, "_blank") },
        { name: "X", icon: FiX, action: () => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`, "_blank") },
        { name: "Email", icon: FiMail, action: () => { window.location.href = `mailto:?body=${encodeURIComponent(shareUrl)}`; } },
        {
            name: "Contacts", icon: FiUsers, action: async () => {
                if (navigator.share) await navigator.share({ title: "Izina", text: "Découvre ce prénom sur Izina", url: shareUrl });
            },
        },
    ];

    if (loading) {
        return (
            <div className="h-screen w-full overflow-hidden scrollbar-none bg-background">
                <main className="relative mx-auto h-full w-full overflow-y-auto scrollbar-none md:w-[80%] lg:w-180">
                    <div className="px-4 pb-10 pt-4">
                        {/* HEADER */}
                        <header className="flex items-center justify-between">
                            <button onClick={() => router.back()} className="flex h-10 w-10 items-center justify-center border border-primary/10">
                                <IconlyArrowLeft size={17} />
                            </button>
                            <p className="font-ui text-xs uppercase tracking-widest text-gray-400">Détail</p>
                            <div className="h-10 w-16 animate-pulse bg-primary/10" />
                        </header>

                        {/* HERO (carré) */}
                        <div className="relative my-5">
                            <div className="w-full h-75 animate-pulse bg-primary/10" />
                        </div>

                        {/* ACTIONS */}
                        <div className="grid grid-cols-3 gap-2">
                            {[0, 1, 2].map((i) => (
                                <div key={i} className="h-12 animate-pulse border border-primary/10 bg-primary/5" />
                            ))}
                        </div>

                        {/* STATS */}
                        <div className="mt-7 grid grid-cols-2 gap-2">
                            {[0, 1, 2, 3].map((i) => (
                                <div key={i} className="animate-pulse border border-primary/10 p-4">
                                    <div className="h-2 w-10 bg-primary/10" />
                                    <div className="mt-2 h-4 w-16 bg-primary/10" />
                                </div>
                            ))}
                        </div>

                        {/* COMMENTS */}
                        <div className="mt-8">
                            <div className="h-4 w-28 animate-pulse bg-primary/10" />
                            <div className="mt-4 flex flex-col gap-4">
                                {[0, 1].map((i) => (
                                    <div key={i} className="flex animate-pulse items-center gap-2 border-b border-primary/10 pb-4">
                                        <div className="h-8 w-8 shrink-0 bg-primary/10" />
                                        <div className="flex-1">
                                            <div className="h-2 w-16 bg-primary/10" />
                                            <div className="mt-2 h-2 w-full bg-primary/10" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    if (!prenom) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-background">
                <p className="font-ui text-sm text-gray-500">Prénom introuvable</p>
            </div>
        );
    }

    return (
        <div className="h-screen w-full overflow-hidden scrollbar-none bg-background">
            <main className="relative mx-auto h-full w-full overflow-y-auto scrollbar-none md:w-[80%] lg:w-180">
                <div className="px-4 pb-10 pt-4">
                    <header className="flex items-center justify-between">
                        <button onClick={() => router.back()} className="flex h-10 w-10 items-center justify-center border border-primary/10">
                            <IconlyArrowLeft size={17} />
                        </button>

                        <p className="font-ui text-xs uppercase tracking-widest text-gray-400">Détail</p>

                        <motion.button
                            type="button"
                            onClick={handleOpenShare}
                            whileTap={{ scale: 0.9 }}
                            className="flex h-10 w-16 items-center justify-center gap-2 bg-primary text-xs text-background"
                        >
                            <IconlyShare size={17} color="currentColor" />
                            {prenom.sharesCount}
                        </motion.button>
                    </header>

                    <PrenomHero
                        ref={cardRef}
                        label={prenom.label}
                        gender={prenom.gender}
                        origin={`${prenom.ethnicGroup.join(", ")} · ${prenom.country.join(", ")}`}
                        meaningFr={prenom.description.fr}
                        meaningEn={prenom.description.en}
                        bgColor={bgColor}
                        onColorChange={setBgColor}
                        lang={lang}
                        onLangChange={setLang}
                    />

                    <PrenomActions
                        liked={liked}
                        saved={saved}
                        likesCount={prenom.likesCount}
                        savesCount={prenom.savesCount}
                        downloadsCount={prenom.downloadsCount}
                        onLike={handleLike}
                        onSave={handleSave}
                        onDownload={handleDownloadCard} // remplace handleDownload par ce wrapper
                    />


                    <section className="mt-7">
                        <p className="font-ui text-[10px] uppercase tracking-widest text-gray-400">Origine</p>
                        <h2 className="mt-1 font-righteous text-xl text-primary">L&apos;histoire du prénom</h2>
                        <p className="mt-4 font-ui text-sm leading-6 text-gray-500">{prenom.description.fr}</p>
                    </section>

                    <PrenomStats
                        origin={prenom.ethnicGroup.join(", ") || "—"}
                        country={prenom.country.join(", ") || "—"}
                        popularity={popularityLabel(prenom.likesCount)}
                        views={prenom.viewsCount}
                    />

                    <PrenomComments
                        comments={comments}
                        commentsCount={prenom.commentsCount}
                        onAddComment={addComment}
                    />
                </div>

                <AnimatePresence>
                    {isShareOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                onClick={() => setIsShareOpen(false)}
                                className="fixed inset-0 z-40 bg-black/20"
                            />
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.96 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.96 }}
                                className="absolute bottom-0 left-0 right-0 z-50 border border-primary/10 bg-background p-4 shadow-xl md:w-[80%] lg:w-180"
                            >
                                <div className="mb-4">
                                    <p className="font-ui text-sm font-semibold text-primary">Partager</p>
                                    <p className="mt-1 font-ui text-xs text-primary/50">Partage ce prénom avec tes proches</p>
                                </div>

                                <div className="grid grid-cols-6 gap-2">
                                    {platforms.map((platform) => {
                                        const Icon = platform.icon;
                                        return (
                                            <motion.button
                                                key={platform.name}
                                                type="button"
                                                onClick={platform.action}
                                                whileTap={{ scale: 0.9 }}
                                                className="flex flex-col items-center gap-1.5"
                                            >
                                                <span className="flex h-10 w-10 items-center justify-center bg-primary text-background">
                                                    <Icon size={16} />
                                                </span>
                                                <span className="font-ui text-[9px] text-primary/60">{platform.name}</span>
                                            </motion.button>
                                        );
                                    })}
                                </div>

                                <div className="my-4 h-px bg-primary/10" />

                                <div>
                                    <p className="mb-2 font-ui text-[10px] font-semibold uppercase tracking-wide text-primary/50">Lien</p>
                                    <div className="flex h-10 border border-primary/10">
                                        <input type="text" value={shareUrl} readOnly className="min-w-0 flex-1 bg-background px-3 font-ui text-xs text-primary outline-none" />
                                        <button
                                            type="button"
                                            onClick={handleCopy}
                                            className={`flex w-12 shrink-0 items-center justify-center transition-colors ${copied ? "bg-primary text-background" : "bg-primary/5 text-primary"}`}
                                        >
                                            {copied ? <FiCheck size={16} /> : <FiCopy size={16} />}
                                        </button>
                                    </div>
                                    {copied && <p className="mt-2 font-ui text-[10px] text-primary">Lien copié ✓</p>}
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

                <AuthRequiredModal open={needsAuth} onClose={() => setNeedsAuth(false)} />
            </main>
        </div>
    );
}