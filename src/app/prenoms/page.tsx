"use client";

import { useRouter } from "next/navigation";
import Navbar from "@/src/components/ui/navbar";
import { IconlyArrowLeft, IconlyChevronRight, IconlyLoader } from "@/src/components/ui/icons";
import { usePrenomsList } from "@/src/hooks/usePrenomsList";
import { useInfiniteScroll } from "@/src/hooks/useInfiniteScroll";

export default function PrenomsListPage() {
  const router = useRouter();
  const { items, loading, loadingMore, hasMore, loadMore } = usePrenomsList();
  const sentinelRef = useInfiniteScroll(loadMore, hasMore);

  return (
    <div className="h-screen w-full overflow-hidden bg-background">
      <main className="relative mx-auto h-full w-full md:w-[80%] lg:w-180">
        <div className="h-full overflow-y-auto overflow-x-hidden scrollbar-none px-4 pb-28 pt-4">
          <header className="flex h-14 items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex h-10 w-10 items-center justify-center border border-primary/10"
            >
              <IconlyArrowLeft size={17} />
            </button>
            <h1 className="font-righteous text-xl text-primary">Tous les prénoms</h1>
            <span className="w-10" />
          </header>

          <div className="mt-5 flex flex-col">
            {loading ? (
              [0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="flex animate-pulse items-center gap-3 border-b border-primary/10 py-4">
                  <div className="h-11 w-11 shrink-0 bg-primary/10" />
                  <div className="flex-1">
                    <div className="h-3 w-20 bg-primary/10" />
                    <div className="mt-2 h-2 w-32 bg-primary/10" />
                  </div>
                </div>
              ))
            ) : items.length === 0 ? (
              <p className="py-10 text-center font-ui text-sm text-gray-400">Aucun prénom trouvé</p>
            ) : (
              items.map((item) => (
                <button
                  key={item._id}
                  onClick={() => router.push(`/prenoms/${item._id}`)}
                  className="flex items-center justify-between border-b border-primary/10 py-4 text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center bg-primary font-righteous text-lg text-background">
                      {item.label[0]}
                    </span>
                    <div>
                      <h3 className="font-righteous text-base text-primary">{item.label}</h3>
                      <p className="mt-1 font-ui text-xs text-gray-500">{item.description.fr}</p>
                    </div>
                  </div>
                  <IconlyChevronRight size={15} color="currentColor" />
                </button>
              ))
            )}

            {/* Sentinelle invisible pour déclencher le chargement suivant */}
            <div ref={sentinelRef} className="h-1" />

            {loadingMore && (
              <div className="flex justify-center py-4">
                <IconlyLoader size={20} color="currentColor" />
              </div>
            )}
          </div>
        </div>

        <div className="absolute bottom-3 left-0 right-0 z-50 px-4">
          <Navbar />
        </div>
      </main>
    </div>
  );
}