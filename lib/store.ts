"use client";

import { useCallback, useEffect, useState } from "react";
import { Product, DEFAULT_COLORS } from "./types";
import { SEED_PRODUCTS } from "./products";

// Bumped whenever the seed catalog changes meaningfully (new/renamed models,
// shape changes) so browsers with older cached data get the fresh catalog
// instead of silently keeping stale products forever.
const STORAGE_KEY = "medchef_products_v3";
const EVENT_NAME = "medchef-products-changed";

const DEFAULT_SIZES = [46, 48, 50, 52, 54, 56];

/** Fills in any fields missing from older/cached product records. */
function normalize(raw: Partial<Product>): Product {
  return {
    id: raw.id ?? `p_${Math.random().toString(36).slice(2)}`,
    slug: raw.slug ?? "",
    name: raw.name ?? "Без названия",
    price: typeof raw.price === "number" ? raw.price : 1700,
    category: raw.category ?? "medical",
    gender: raw.gender ?? "female",
    description: raw.description ?? "",
    material: raw.material ?? "",
    sizes: Array.isArray(raw.sizes) && raw.sizes.length ? raw.sizes : DEFAULT_SIZES,
    colors: Array.isArray(raw.colors) && raw.colors.length ? raw.colors : DEFAULT_COLORS,
    images: Array.isArray(raw.images) && raw.images.length ? raw.images : ["/products/med-w-teal.jpg"],
    isNew: Boolean(raw.isNew),
    isBestseller: Boolean(raw.isBestseller),
    hidden: Boolean(raw.hidden),
    createdAt: typeof raw.createdAt === "number" ? raw.createdAt : Date.now(),
  };
}

function readAll(): Product[] {
  if (typeof window === "undefined") return SEED_PRODUCTS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<Product>[];
      return parsed.map(normalize);
    }
    // no v3 data yet — seed fresh from the current catalog (intentionally
    // not migrating older v1/v2 data forward, since the product lineup itself changed)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_PRODUCTS));
    return SEED_PRODUCTS;
  } catch {
    return SEED_PRODUCTS;
  }
}

function writeAll(products: Product[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  window.dispatchEvent(new Event(EVENT_NAME));
}

/**
 * Hook that exposes the product catalog and CRUD helpers.
 * Data lives in localStorage so the admin panel works with zero backend.
 * For a production deployment, swap the implementation of these functions
 * for calls to a real API / database — the component layer won't need to change.
 */
export function useProducts() {
  const [products, setProducts] = useState<Product[]>(SEED_PRODUCTS);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setProducts(readAll());
    setReady(true);
    const onChange = () => setProducts(readAll());
    window.addEventListener(EVENT_NAME, onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener(EVENT_NAME, onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  const upsert = useCallback((product: Product) => {
    const all = readAll();
    const idx = all.findIndex((p) => p.id === product.id);
    if (idx >= 0) {
      all[idx] = product;
    } else {
      all.unshift(product);
    }
    writeAll(all);
  }, []);

  const remove = useCallback((id: string) => {
    const all = readAll().filter((p) => p.id !== id);
    writeAll(all);
  }, []);

  const toggleHidden = useCallback((id: string) => {
    const all = readAll().map((p) => (p.id === id ? { ...p, hidden: !p.hidden } : p));
    writeAll(all);
  }, []);

  const toggleFlag = useCallback((id: string, flag: "isNew" | "isBestseller") => {
    const all = readAll().map((p) => (p.id === id ? { ...p, [flag]: !p[flag] } : p));
    writeAll(all);
  }, []);

  const resetToSeed = useCallback(() => {
    writeAll(SEED_PRODUCTS);
  }, []);

  return { products, ready, upsert, remove, toggleHidden, toggleFlag, resetToSeed };
}
