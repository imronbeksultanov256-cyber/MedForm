"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Product, CATEGORY_LABEL } from "@/lib/types";

interface Slide {
  image: string;
  eyebrow: string;
  title: string;
  text: string;
}

const AUTOPLAY_MS = 4500;
const SWIPE_THRESHOLD = 40;
const MOVE_THRESHOLD = 10;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildSlides(products: Product[]): Slide[] {
  return products
    .filter((p) => !p.hidden && p.images.length > 0)
    .map((p) => ({
      image: p.images[0],
      eyebrow: CATEGORY_LABEL[p.category],
      title: p.name,
      text: p.description,
    }));
}

export default function Hero({ products }: { products: Product[] }) {
  const initialSlides = useMemo(() => buildSlides(products).slice(0, 5), [products]);
  const [slides, setSlides] = useState<Slide[]>(initialSlides);
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  // Reshuffle once after mount (client-only) so every visit shows a different lineup,
  // without breaking server/client hydration.
  useEffect(() => {
    setSlides((prev) => (prev.length > 1 ? shuffle(prev) : prev));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const restart = () => {
    if (timer.current) clearInterval(timer.current);
    if (slides.length < 2) return;
    timer.current = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, AUTOPLAY_MS);
  };

  useEffect(() => {
    restart();
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slides.length]);

  const go = (dir: 1 | -1) => {
    if (slides.length < 2) return;
    setIndex((i) => (i + dir + slides.length) % slides.length);
    restart();
  };

  // Pointer-based swipe (works reliably for touch + mouse, unlike drag-in-AnimatePresence)
  const startX = useRef(0);
  const startY = useRef(0);
  const moved = useRef(false);
  const active = useRef(false);

  const onPointerDown = (e: React.PointerEvent) => {
    active.current = true;
    moved.current = false;
    startX.current = e.clientX;
    startY.current = e.clientY;
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!active.current) return;
    if (
      Math.abs(e.clientX - startX.current) > MOVE_THRESHOLD ||
      Math.abs(e.clientY - startY.current) > MOVE_THRESHOLD
    ) {
      moved.current = true;
    }
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (!active.current) return;
    active.current = false;
    const dx = e.clientX - startX.current;
    const dy = e.clientY - startY.current;
    if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
      go(dx < 0 ? 1 : -1);
    } else if (!moved.current) {
      setLightbox(true);
    }
  };

  if (slides.length === 0) return null;
  const slide = slides[index];

  return (
    <section className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-navy-900">
      <div
        className="absolute inset-0"
        style={{ touchAction: "pan-y" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (active.current = false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              className="object-cover object-top pointer-events-none select-none"
              sizes="100vw"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/20 to-navy-900/40" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* content */}
      <div className="relative z-10 h-full flex flex-col justify-end px-5 sm:px-10 pb-28 sm:pb-32 max-w-3xl pointer-events-none">
        <motion.p
          key={`eyebrow-${index}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-sky-300 text-sm font-semibold tracking-[0.18em] uppercase mb-3"
        >
          {slide.eyebrow}
        </motion.p>
        <motion.h1
          key={`title-${index}`}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22 }}
          className="text-white font-display font-extrabold text-3xl sm:text-5xl leading-[1.08] mb-3"
        >
          {slide.title}
        </motion.h1>
        <motion.p
          key={`text-${index}`}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28 }}
          className="text-white/80 text-base sm:text-lg mb-6 max-w-lg line-clamp-2"
        >
          {slide.text}
        </motion.p>
        <motion.a
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.34 }}
          href="#catalog"
          className="pointer-events-auto inline-flex w-fit items-center gap-2 rounded-full bg-white text-navy font-semibold px-6 py-3.5 shadow-soft active:scale-95 transition-transform"
        >
          Перейти в каталог
        </motion.a>
      </div>

      {/* dots */}
      {slides.length > 1 && (
        <div className="absolute z-10 bottom-6 inset-x-0 flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Слайд ${i + 1}`}
              onClick={() => {
                setIndex(i);
                restart();
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? "w-7 bg-white" : "w-1.5 bg-white/40"
              }`}
            />
          ))}
        </div>
      )}

      {/* arrows (desktop) */}
      {slides.length > 1 && (
        <>
          <button
            aria-label="Предыдущий слайд"
            onClick={() => go(-1)}
            className="hidden sm:flex absolute z-10 left-4 top-1/2 -translate-y-1/2 h-11 w-11 items-center justify-center rounded-full glass text-navy shadow-soft"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            aria-label="Следующий слайд"
            onClick={() => go(1)}
            className="hidden sm:flex absolute z-10 right-4 top-1/2 -translate-y-1/2 h-11 w-11 items-center justify-center rounded-full glass text-navy shadow-soft"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
            onClick={() => setLightbox(false)}
          >
            <button
              aria-label="Закрыть"
              className="absolute top-5 right-5 h-10 w-10 rounded-full bg-white/10 text-white flex items-center justify-center"
              onClick={() => setLightbox(false)}
            >
              <X size={20} />
            </button>
            <div
              className="relative w-full h-full"
              style={{ touchAction: "pan-y" }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-contain pointer-events-none select-none"
                sizes="100vw"
                draggable={false}
              />
            </div>
            {slides.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    go(-1);
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-white/10 text-white flex items-center justify-center"
                  aria-label="Предыдущее фото"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    go(1);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-white/10 text-white flex items-center justify-center"
                  aria-label="Следующее фото"
                >
                  <ChevronRight size={22} />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
