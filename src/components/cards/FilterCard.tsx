"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import {
  IconlySearch,
  IconlyFilter,
  FiXCircle,
  IconlyCheck,
} from "../ui/icons";

const genders = [
  "Tous",
  "Féminin",
  "Masculin",
  "Mixte",
];

const categories = [
  "Traditionnel",
  "Moderne",
  "Rare",
  "Populaire",
  "Original",
];

const countries = [
  "Togo",
  "Ghana",
  "Bénin",
  "Nigeria",
  "Côte d'Ivoire",
  "Sénégal",
];

const origins = [
  "Éwé",
  "Akan",
  "Yoruba",
  "Fon",
  "Mina",
  "Kabiyè",
];

const FilterCard = () => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [gender, setGender] = useState("Tous");
  const [selectedCategories, setSelectedCategories] =
    useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] =
    useState<string[]>([]);
  const [selectedOrigins, setSelectedOrigins] =
    useState<string[]>([]);

  const toggleItem = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const resetFilters = () => {
    setGender("Tous");
    setSelectedCategories([]);
    setSelectedCountries([]);
    setSelectedOrigins([]);
  };

  const activeFilters =
    (gender !== "Tous" ? 1 : 0) +
    selectedCategories.length +
    selectedCountries.length +
    selectedOrigins.length;

  return (
    <section className="relative mt-5 w-full">
      {/* SEARCH + FILTER */}
      <div className="flex w-full items-center gap-2">
        {/* SEARCH */}
        <div className="flex h-11 flex-1 items-center border border-primary/20 bg-background px-2 text-primary">
          <IconlySearch
            size={17}
            color="currentColor"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un prénom..."
            className="h-full w-full bg-transparent px-3 font-ui text-xs text-primary outline-none placeholder:text-gray-400"
          />
        </div>

        {/* FILTER BUTTON */}
        <motion.button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          whileTap={{ scale: 0.9 }}
          className={`relative flex h-11 w-11 shrink-0 items-center justify-center ${
            isOpen
              ? "bg-primary text-background"
              : "bg-primary text-background"
          }`}
        >
          <motion.span
            animate={{
              rotate: isOpen ? 90 : 0,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 20,
            }}
          >
            {isOpen ? (
              <FiXCircle
                size={18}
                color="currentColor"
              />
            ) : (
              <IconlyFilter
                size={18}
                color="currentColor"
              />
            )}
          </motion.span>

          {activeFilters > 0 && (
            <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 font-ui text-[9px] font-bold text-white">
              {activeFilters}
            </span>
          )}
        </motion.button>
      </div>

      {/* FILTER PANEL */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
              y: -5,
            }}
            animate={{
              opacity: 1,
              height: "auto",
              y: 0,
            }}
            exit={{
              opacity: 0,
              height: 0,
              y: -5,
            }}
            transition={{
              duration: 0.25,
            }}
            className="overflow-hidden"
          >
            <div className="mt-2 border border-primary/10 bg-background p-4">
              {/* HEADER */}
              <div className="flex items-center justify-between border-b border-primary/10 pb-3">
                <div>
                  <h3 className="font-righteous text-lg text-primary">
                    Filtres
                  </h3>

                  <p className="mt-0.5 font-ui text-[10px] text-primary/40">
                    Affinez votre recherche
                  </p>
                </div>

                {activeFilters > 0 && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="font-ui text-[10px] text-primary underline underline-offset-2"
                  >
                    Réinitialiser
                  </button>
                )}
              </div>

              {/* GENDER */}
              <FilterGroup title="Genre">
                <div className="grid grid-cols-4 gap-2">
                  {genders.map((item) => {
                    const selected = gender === item;

                    return (
                      <FilterButton
                        key={item}
                        selected={selected}
                        onClick={() => setGender(item)}
                      >
                        {item}
                      </FilterButton>
                    );
                  })}
                </div>
              </FilterGroup>

              {/* CATEGORY */}
              <FilterGroup title="Catégorie">
                <div className="flex flex-wrap gap-2">
                  {categories.map((item) => {
                    const selected =
                      selectedCategories.includes(item);

                    return (
                      <FilterButton
                        key={item}
                        selected={selected}
                        onClick={() =>
                          toggleItem(
                            item,
                            setSelectedCategories
                          )
                        }
                      >
                        {item}
                      </FilterButton>
                    );
                  })}
                </div>
              </FilterGroup>

              {/* COUNTRY */}
              <FilterGroup title="Pays">
                <div className="flex flex-wrap gap-2">
                  {countries.map((item) => {
                    const selected =
                      selectedCountries.includes(item);

                    return (
                      <FilterButton
                        key={item}
                        selected={selected}
                        onClick={() =>
                          toggleItem(
                            item,
                            setSelectedCountries
                          )
                        }
                      >
                        {item}
                      </FilterButton>
                    );
                  })}
                </div>
              </FilterGroup>

              {/* ORIGIN */}
              <FilterGroup title="Origine / ethnie">
                <div className="flex flex-wrap gap-2">
                  {origins.map((item) => {
                    const selected =
                      selectedOrigins.includes(item);

                    return (
                      <FilterButton
                        key={item}
                        selected={selected}
                        onClick={() =>
                          toggleItem(
                            item,
                            setSelectedOrigins
                          )
                        }
                      >
                        {item}
                      </FilterButton>
                    );
                  })}
                </div>
              </FilterGroup>

              {/* APPLY */}
              <motion.button
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsOpen(false)}
                className="mt-5 flex h-11 w-full items-center justify-center gap-2 bg-primary font-ui text-xs font-semibold text-background"
              >
                <IconlyCheck
                  size={15}
                  color="currentColor"
                />

                Appliquer les filtres

                {activeFilters > 0 && (
                  <span>
                    ({activeFilters})
                  </span>
                )}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

/* ---------------------------------- */
/* FILTER GROUP                       */
/* ---------------------------------- */

type FilterGroupProps = {
  title: string;
  children: React.ReactNode;
};

const FilterGroup = ({
  title,
  children,
}: FilterGroupProps) => {
  return (
    <div className="mt-5">
      <p className="mb-2 font-ui text-[10px] font-semibold uppercase tracking-wide text-primary/50">
        {title}
      </p>

      {children}
    </div>
  );
};

/* ---------------------------------- */
/* FILTER BUTTON                      */
/* ---------------------------------- */

type FilterButtonProps = {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

const FilterButton = ({
  selected,
  onClick,
  children,
}: FilterButtonProps) => {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      className={`border px-3 py-2 font-ui text-[10px] transition-colors ${
        selected
          ? "border-primary bg-primary text-background"
          : "border-primary/10 bg-background text-primary"
      }`}
    >
      {children}
    </motion.button>
  );
};

export default FilterCard;