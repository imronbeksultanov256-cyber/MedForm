"use client";

import { useProducts } from "@/lib/store";
import ProductDetail from "@/components/ProductDetail";
import WhatsAppFab from "@/components/WhatsAppFab";
import Link from "next/link";

export default function ProductPage({ params }: { params: { slug: string } }) {
  const { products, ready } = useProducts();
  const product = products.find((p) => p.slug === params.slug);

  if (ready && !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="font-display font-bold text-xl text-navy">Товар не найден</p>
        <Link href="/" className="text-sky-600 font-semibold text-sm">
          Вернуться в каталог
        </Link>
      </div>
    );
  }

  if (!product) return null;

  return (
    <>
      <ProductDetail product={product} />
      <WhatsAppFab />
    </>
  );
}
