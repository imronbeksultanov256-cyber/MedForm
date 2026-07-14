"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Gem, Clock } from "lucide-react";

const POINTS = [
  {
    icon: Gem,
    title: "Премиальные ткани",
    text: "Отбираем плотные смесовые ткани, которые держат форму и цвет после десятков стирок.",
  },
  {
    icon: Clock,
    title: "Быстрый заказ",
    text: "От выбора модели до подтверждения заказа в WhatsApp — 2–3 нажатия и меньше 15 секунд.",
  },
  {
    icon: ShieldCheck,
    title: "Проверенная посадка",
    text: "Лекала адаптированы под мужские и женские фигуры — размеры от 46 до 56.",
  },
];

export default function About() {
  return (
    <section id="about" className="px-4 sm:px-6 py-14 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-9">
          <p className="text-sky-600 text-sm font-semibold tracking-[0.14em] uppercase mb-2">
            О нас
          </p>
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-navy mb-4">
            Униформа, которая работает так же усердно, как и вы
          </h2>
          <p className="text-navy-400 max-w-2xl text-[15px] sm:text-base leading-relaxed">
            Мы шьём и подбираем профессиональную форму для медицинских работников и поваров
            по всему Кыргызстану. Наша цель — чтобы вы выглядели безупречно и чувствовали себя
            комфортно на самой длинной смене.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {POINTS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="rounded-2xl bg-white shadow-card p-6"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-navy text-sky-300 mb-4">
                <p.icon size={20} />
              </span>
              <h3 className="font-display font-semibold text-navy text-lg mb-1.5">{p.title}</h3>
              <p className="text-navy-400 text-sm leading-relaxed">{p.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
