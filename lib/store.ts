"use client";

import { useCallback, useEffect, useState } from "react";
import { Product } from "./types";
import { SEED_PRODUCTS } from "./products";

const STORAGE_KEY = "medchef_products_v1";
const EVENT_NAME = "medchef-products-changed";

function readAll(): Product[] {
  if (typeof window === "undefined") return SEED_PRODUCTS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_PRODUCTS));
      return SEED_PRODUCTS;
    }
    return JSON.parse(raw) as Product[];
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
