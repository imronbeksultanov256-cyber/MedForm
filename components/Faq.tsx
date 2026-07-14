"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ITEMS = [
  {
    q: "Как подобрать размер?",
    a: "На странице каждого товара указана таблица размеров от 46 до 56. Если сомневаетесь — напишите нам замеры (обхват груди, талии и рост) в WhatsApp, и мы подскажем подходящий размер.",
  },
  {
    q: "Как оформить заказ?",
    a: "Выберите модель, нажмите «Подробнее», укажите размер и нажмите «Заказать через WhatsApp» — сообщение с деталями сформируется автоматически, останется его отправить.",
  },
  {
    q: "Как осуществляется доставка?",
    a: "Доставляем по всему Кыргызстану курьером или транспортной компанией. Сроки и стоимость уточняет менеджер после оформления заказа в WhatsApp.",
  },
  {
    q: "Как оплатить?",
    a: "Принимаем оплату переводом на карту, наличными при получении и через мобильные банковские приложения. Способ оплаты обсуждается индивидуально в переписке.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="px-4 sm:px-6 py-14 sm:py-20 bg-ice/60">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <p className="text-sky-600 text-sm font-semibold tracking-[0.14em] uppercase mb-2">FAQ</p>
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-navy">
            Частые вопросы
          </h2>
        </div>
        <div className="flex flex-col gap-3">
          {ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="bg-white rounded-2xl shadow-card overflow-hidden">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-display font-semibold text-navy text-[15px] sm:text-base">
                    {item.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="shrink-0 text-navy-400"
                  >
                    <ChevronDown size={18} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <p className="px-5 pb-4.5 text-navy-400 text-sm leading-relaxed">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
