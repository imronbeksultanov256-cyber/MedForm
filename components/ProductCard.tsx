"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { Product, CATEGORY_LABEL, GENDER_LABEL } from "@/lib/types";

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: (index % 8) * 0.04 }}
      whileTap={{ scale: 0.98 }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-soft transition-shadow duration-300"
    >
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-ice">
          <Image
            src={product.images?.[0] ?? "/products/med-w-teal.jpg"}
            alt={product.name}
            fill
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.06]"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 22vw"
          />
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
            {product.isNew && (
              <span className="text-[10px] font-bold uppercase tracking-wide bg-sky-500 text-white px-2 py-1 rounded-full">
                Новинка
              </span>
            )}
            {product.isBestseller && (
              <span className="text-[10px] font-bold uppercase tracking-wide bg-gold text-navy px-2 py-1 rounded-full">
                Хит продаж
              </span>
            )}
          </div>
        </div>
        <div className="p-3.5 pb-3">
          <p className="text-[11px] font-medium text-navy-400 mb-1">
            {CATEGORY_LABEL[product.category]} · {GENDER_LABEL[product.gender]}
          </p>
          <h3 className="font-display font-semibold text-graphite text-sm sm:text-base leading-snug mb-1.5 line-clamp-2">
            {product.name}
          </h3>
          <p className="font-display font-bold text-navy text-base sm:text-lg">
            {product.price} сом
          </p>
          {(product.colors?.length ?? 0) > 0 && (
            <div className="flex gap-1 mt-2">
              {product.colors.slice(0, 5).map((c) => (
                <span
                  key={c.name}
                  title={c.name}
                  className="h-3.5 w-3.5 rounded-full border border-navy-100"
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          )}
        </div>
      </Link>
      <div className="px-3.5 pb-3.5">
        <Link
          href={`/product/${product.slug}`}
          className="flex items-center justify-center gap-1.5 w-full text-xs sm:text-sm font-semibold rounded-full bg-navy text-white py-2.5 active:bg-navy-600 transition-colors"
        >
          <ShoppingBag size={14} />
          Купить
        </Link>
      </div>
    </motion.div>
  );
}
