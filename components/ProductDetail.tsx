"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, MessageCircle, Check, Minus, Plus } from "lucide-react";
import { Product, CATEGORY_LABEL, GENDER_LABEL } from "@/lib/types";
import { buildOrderMessage, buildWhatsAppLink } from "@/lib/whatsapp";
import { COLOR_ICONS } from "@/lib/colorIcons";
import ProductGallery from "./ProductGallery";

export default function ProductDetail({ product }: { product: Product }) {
  const [size, setSize] = useState<number | null>(null);
  const [color, setColor] = useState<string | null>(product.colors[0]?.name ?? null);
  const [quantity, setQuantity] = useState(1);

  const ready = Boolean(size && color);
  const link = buildWhatsAppLink(buildOrderMessage(product, size, color, quantity));

  return (
    <div className="min-h-screen bg-white pb-28">
      <div className="sticky top-0 z-40 glass shadow-soft">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 h-14 flex items-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy"
          >
            <ChevronLeft size={18} />
            Назад в каталог
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-5 sm:pt-8 grid sm:grid-cols-2 gap-8">
        <ProductGallery images={product.images} name={product.name} />

        <div>
          <p className="text-sky-600 text-sm font-semibold mb-2">
            {CATEGORY_LABEL[product.category]} · {GENDER_LABEL[product.gender]}
          </p>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-navy mb-2 leading-snug">
            {product.name}
          </h1>
          <p className="font-display font-bold text-2xl text-navy mb-5">{product.price} сом</p>

          <p className="text-navy-400 text-[15px] leading-relaxed mb-5">{product.description}</p>

          <div className="rounded-2xl bg-ice p-4 mb-6 text-sm text-navy-500">
            <span className="font-semibold text-navy">Материал: </span>
            {product.material}
          </div>

          {product.colors.length > 0 && (
            <div className="mb-6">
              <p className="font-display font-semibold text-navy mb-3">
                Цвет{color ? `: ${color}` : ""}
              </p>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((c) => {
                  const icon = COLOR_ICONS[c.name];
                  return (
                    <button
                      key={c.name}
                      onClick={() => setColor(c.name)}
                      title={c.name}
                      aria-label={c.name}
                      className={`h-14 w-14 rounded-2xl border-2 transition-all flex items-center justify-center bg-ice ${
                        color === c.name
                          ? "border-navy scale-105 shadow-soft"
                          : "border-navy-100"
                      }`}
                    >
                      {icon ? (
                        <Image src={icon} alt={c.name} width={28} height={28} />
                      ) : (
                        <span
                          className="h-7 w-7 rounded-full border border-navy-100/60"
                          style={{ backgroundColor: c.hex }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mb-4">
            <p className="font-display font-semibold text-navy mb-3">Выберите размер</p>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`h-12 rounded-xl font-semibold text-sm border transition-colors ${
                    size === s
                      ? "bg-navy text-white border-navy"
                      : "bg-white text-navy-500 border-navy-100 active:bg-ice"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            {!size && (
              <p className="text-xs text-navy-400 mt-2">
                Выберите размер, чтобы оформить заказ
              </p>
            )}
          </div>

          <div className="mb-6">
            <p className="font-display font-semibold text-navy mb-3">Количество</p>
            <div className="inline-flex items-center gap-4 rounded-full border border-navy-100 px-4 py-2">
              <button
                aria-label="Уменьшить количество"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="h-8 w-8 rounded-full bg-ice text-navy flex items-center justify-center active:scale-95 transition-transform"
              >
                <Minus size={15} />
              </button>
              <span className="w-6 text-center font-display font-bold text-navy">{quantity}</span>
              <button
                aria-label="Увеличить количество"
                onClick={() => setQuantity((q) => Math.min(20, q + 1))}
                className="h-8 w-8 rounded-full bg-ice text-navy flex items-center justify-center active:scale-95 transition-transform"
              >
                <Plus size={15} />
              </button>
            </div>
          </div>

          {/* desktop CTA */}
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              if (!ready) e.preventDefault();
            }}
            className={`hidden sm:inline-flex w-full items-center justify-center gap-2 rounded-full font-semibold py-4 shadow-soft transition-all ${
              ready
                ? "bg-navy text-white active:scale-[0.98]"
                : "bg-navy-100 text-navy-400 cursor-not-allowed"
            }`}
          >
            {ready ? <Check size={18} /> : <MessageCircle size={18} />}
            Заказать через WhatsApp
          </a>
        </div>
      </div>

      {/* mobile sticky one-hand CTA */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 glass shadow-soft px-4 py-3">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            if (!ready) e.preventDefault();
          }}
          className={`flex items-center justify-center gap-2 w-full rounded-full font-semibold py-3.5 transition-all ${
            ready ? "bg-navy text-white active:scale-[0.98]" : "bg-navy-100 text-navy-400"
          }`}
        >
          {ready ? <Check size={18} /> : <MessageCircle size={18} />}
          {ready ? `Заказать · ${size} · ${color}` : "Выберите размер и цвет"}
        </a>
      </div>
    </div>
  );
}
