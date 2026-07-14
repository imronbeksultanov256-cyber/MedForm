"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { buildGeneralMessage, buildWhatsAppLink } from "@/lib/whatsapp";

const NAV = [
  { href: "#catalog", label: "Каталог" },
  { href: "#about", label: "О нас" },
  { href: "#faq", label: "Вопросы" },
  { href: "#contacts", label: "Контакты" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-soft" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src="/brand/logo.png"
            alt="Uniform Medical Wear"
            width={132}
            height={40}
            priority
            className="h-8 sm:h-9 w-auto object-contain"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-navy-500 hover:text-sky-600 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={buildWhatsAppLink(buildGeneralMessage())}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-navy text-white text-sm font-semibold px-4 py-2 shadow-soft hover:bg-navy-600 transition-colors"
          >
            <MessageCircle size={16} />
            Написать
          </a>
          <button
            aria-label="Меню"
            onClick={() => setOpen(true)}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/70 text-navy shadow-card active:scale-95 transition-transform"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-navy-900/40 backdrop-blur-sm md:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="absolute right-0 top-0 h-full w-[78%] max-w-xs bg-white shadow-2xl p-6 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-8">
                <Image
                  src="/brand/logo.png"
                  alt="Uniform Medical Wear"
                  width={120}
                  height={36}
                  className="h-8 w-auto object-contain"
                />
                <button
                  aria-label="Закрыть"
                  onClick={() => setOpen(false)}
                  className="h-9 w-9 inline-flex items-center justify-center rounded-full bg-ice text-navy"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="flex flex-col gap-1">
                {NAV.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="py-3.5 px-3 rounded-xl text-base font-medium text-navy-500 active:bg-ice transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
              <div className="mt-auto pt-6">
                <a
                  href={buildWhatsAppLink(buildGeneralMessage())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full rounded-full bg-gradient-to-r from-sky-500 to-navy text-white font-semibold py-3.5 shadow-soft"
                >
                  <MessageCircle size={18} />
                  Написать в WhatsApp
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
