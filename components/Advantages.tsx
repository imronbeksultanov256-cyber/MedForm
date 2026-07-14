"use client";

import { motion } from "framer-motion";
import { Tag, Shirt, Users, Ruler, MessageCircle, Truck } from "lucide-react";

const ITEMS = [
  { icon: Tag, text: "Цена всего 1700 сом" },
  { icon: Shirt, text: "Качественные ткани" },
  { icon: Users, text: "Мужские и женские модели" },
  { icon: Ruler, text: "Размеры от 46 до 56" },
  { icon: MessageCircle, text: "Консультация в WhatsApp" },
  { icon: Truck, text: "Доставка по Кыргызстану" },
];

export default function Advantages() {
  return (
    <section className="relative -mt-10 z-20 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {ITEMS.map((item, i) => (
            <motion.div
              key={item.text}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.05, duration: 0.45 }}
              className="glass rounded-2xl shadow-glass px-3.5 py-4 flex flex-col items-start gap-2.5"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-navy text-sky-300">
                <item.icon size={17} />
              </span>
              <span className="text-[13px] sm:text-sm font-medium text-navy-500 leading-snug">
                {item.text}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
