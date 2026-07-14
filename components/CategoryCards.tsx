"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface Props {
  onSelect: (category: "medical" | "chef") => void;
}

const CARDS = [
  {
    key: "medical" as const,
    title: "Медицинская форма",
    emoji: "🩺",
    image: "/products/viktoriya/1.jpg",
    count: "13 моделей",
  },
  {
    key: "chef" as const,
    title: "Поварская форма",
    emoji: "👨‍🍳",
    image: "/products/chef-w-jacket.jpg",
    count: "2 модели",
  },
];

export default function CategoryCards({ onSelect }: Props) {
  return (
    <section className="px-4 sm:px-6 py-14 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 sm:mb-10">
          <p className="text-sky-600 text-sm font-semibold tracking-[0.14em] uppercase mb-2">
            Категории
          </p>
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-navy">
            Выберите направление
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {CARDS.map((card, i) => (
            <motion.button
              key={card.key}
              onClick={() => onSelect(card.key)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileTap={{ scale: 0.98 }}
              className="group relative h-64 sm:h-80 rounded-xl2 overflow-hidden text-left shadow-card"
            >
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/85 via-navy-900/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="text-3xl mb-2 inline-block">{card.emoji}</span>
                <h3 className="text-white font-display font-bold text-xl sm:text-2xl mb-1">
                  {card.title}
                </h3>
                <p className="text-white/70 text-sm">{card.count}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
