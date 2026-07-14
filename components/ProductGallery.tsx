"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const SWIPE_THRESHOLD = 40;
const MOVE_THRESHOLD = 10;

export default function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + images.length) % images.length);

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
  const onPointerUp = (e: React.PointerEvent, openOnTap: () => void) => {
    if (!active.current) return;
    active.current = false;
    const dx = e.clientX - startX.current;
    const dy = e.clientY - startY.current;
    if (images.length > 1 && Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
      go(dx < 0 ? 1 : -1);
    } else if (!moved.current) {
      openOnTap();
    }
  };

  return (
    <div>
      <div
        className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-ice shadow-card"
        style={{ touchAction: "pan-y" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={(e) => onPointerUp(e, () => setLightbox(true))}
        onPointerCancel={() => (active.current = false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0"
          >
            <Image
              src={images[index]}
              alt={`${name} — фото ${index + 1}`}
              fill
              priority
              className="object-cover object-top pointer-events-none select-none"
              sizes="(max-width: 640px) 100vw, 50vw"
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>

        {images.length > 1 && (
          <div className="absolute bottom-3 inset-x-0 flex justify-center gap-1.5 z-10">
            {images.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-6 bg-white" : "w-1.5 bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>

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
              onPointerUp={(e) => onPointerUp(e, () => {})}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[index]}
                alt={name}
                fill
                className="object-contain pointer-events-none select-none"
                sizes="100vw"
                draggable={false}
              />
            </div>
            {images.length > 1 && (
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
    </div>
  );
}
