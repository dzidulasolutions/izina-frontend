"use client";

import { useState } from "react";
import { IconlyShare, IconlyLoader } from "@/src/components/ui/icons";

interface DisplayComment {
  id: string;
  user: string;
  comment: string;
  date: string;
}

export function PrenomComments({
  comments, commentsCount, onAddComment,
}: {
  comments: DisplayComment[]; commentsCount: number;
  onAddComment: (message: string) => Promise<void>;
}) {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setError("");
    setSending(true);
    try {
      await onAddComment(message.trim());
      setMessage("");
    } catch {
      setError("Impossible d'ajouter le commentaire");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="mt-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-ui text-[10px] uppercase tracking-widest text-gray-400">Communauté</p>
          <h2 className="mt-1 font-righteous text-xl">Commentaires</h2>
        </div>
        <span className="font-ui text-xs text-gray-400">{commentsCount}</span>
      </div>

      <form onSubmit={handleSubmit} className="mt-4 flex items-center gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ajouter un commentaire..."
          className="h-11 flex-1 border border-primary/10 px-3 font-ui text-xs text-primary outline-none focus:border-primary"
        />
        <button
          type="submit"
          disabled={sending || !message.trim()}
          className="flex h-11 w-11 shrink-0 items-center justify-center bg-primary text-background disabled:opacity-50"
        >
          {sending ? <IconlyLoader size={16} color="currentColor" /> : <IconlyShare size={16} color="currentColor" />}
        </button>
      </form>
      {error && <p className="mt-2 font-ui text-xs text-red-600">{error}</p>}

      <div className="mt-4 flex flex-col">
        {comments.length === 0 ? (
          <p className="py-6 text-center font-ui text-xs text-gray-400">Aucun commentaire pour l&apos;instant</p>
        ) : (
          comments.map((comment) => (
            <article key={comment.id} className="border-b border-primary/10 py-4">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center bg-primary font-righteous text-xs text-background">
                  {comment.user[0]}
                </span>
                <div>
                  <p className="font-ui text-xs font-semibold">{comment.user}</p>
                  <p className="font-ui text-[10px] text-gray-400">{comment.date}</p>
                </div>
                {/* likes par commentaire — prévu pour la V2, non supporté par le backend actuellement */}
              </div>
              <p className="mt-3 font-ui text-sm leading-5 text-gray-500">{comment.comment}</p>
            </article>
          ))
        )}
      </div>
    </section>
  );
}