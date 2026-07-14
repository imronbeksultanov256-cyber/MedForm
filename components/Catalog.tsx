"use client";

import { useMemo, useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Product, Category, Gender } from "@/lib/types";
import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
  initialCategory?: Category | "all";
}

type CategoryFilter = Category | "all";
type GenderFilter = Gender | "all";

const CATEGORY_TABS: { key: CategoryFilter; label: string }[] = [
  { key: "all", label: "Все" },
  { key: "medical", label: "Медицинская" },
  { key: "chef", label: "Поварская" },
];

const GENDER_TABS: { key: GenderFilter; label: string }[] = [
  { key: "all", label: "Все" },
  { key: "male", label: "Мужская" },
  { key: "female", label: "Женская" },
];

export default function Catalog({ products, initialCategory = "all" }: Props) {
  const [category, setCategory] = useState<CategoryFilter>(initialCategory);
  const [gender, setGender] = useState<GenderFilter>("all");
  const [query, setQuery] = useState("");

  useEffect(() => setCategory(initialCategory), [initialCategory]);

  const visible = useMemo(() => {
    return products
      .filter((p) => !p.hidden)
      .filter((p) => (category === "all" ? true : p.category === category))
      .filter((p) => (gender === "all" ? true : p.gender === gender))
      .filter((p) => p.name.toLowerCase().includes(query.trim().toLowerCase()));
  }, [products, category, gender, query]);

  return (
    <section id="catalog" className="px-4 sm:px-6 py-12 sm:py-16 bg-ice/60">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <p className="text-sky-600 text-sm font-semibold tracking-[0.14em] uppercase mb-2">
            Каталог
          </p>
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-navy">
            Найдите свою форму за пару касаний
          </h2>
        </div>

        {/* search */}
        <div className="relative mb-4">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-navy-400"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск по названию..."
            className="w-full rounded-full bg-white border border-navy-100 pl-11 pr-10 py-3 text-sm shadow-card focus:outline-none focus:ring-2 focus:ring-sky-300"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="Очистить поиск"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-navy-400"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* filters */}
        <div className="sticky top-16 z-30 -mx-4 px-4 sm:mx-0 sm:px-0 py-2.5 mb-6 glass rounded-2xl shadow-glass">
          <div className="flex gap-2 overflow-x-auto no-scrollbar px-1">
            {CATEGORY_TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setCategory(tab.key)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                  category === tab.key
                    ? "bg-navy text-white"
                    : "bg-white text-navy-500 border border-navy-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
            <span className="w-px bg-navy-100 mx-1 shrink-0" />
            {GENDER_TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setGender(tab.key)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                  gender === tab.key
                    ? "bg-sky-500 text-white"
                    : "bg-white text-navy-500 border border-navy-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {visible.length === 0 ? (
          <div className="text-center py-16 text-navy-400">
            <p className="font-display font-semibold text-lg mb-1">Ничего не нашлось</p>
            <p className="text-sm">Попробуйте изменить фильтры или запрос поиска.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
            {visible.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
