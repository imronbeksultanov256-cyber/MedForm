"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Advantages from "@/components/Advantages";
import CategoryCards from "@/components/CategoryCards";
import Catalog from "@/components/Catalog";
import About from "@/components/About";
import Faq from "@/components/Faq";
import Contacts from "@/components/Contacts";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";
import { useProducts } from "@/lib/store";
import { Category } from "@/lib/types";

export default function HomePage() {
  const { products } = useProducts();
  const [category, setCategory] = useState<Category | "all">("all");

  const handleSelectCategory = (c: Category) => {
    setCategory(c);
    document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="overflow-x-hidden">
      <Header />
      <Hero products={products} />
      <Advantages />
      <CategoryCards onSelect={handleSelectCategory} />
      <Catalog products={products} initialCategory={category} />
      <About />
      <Faq />
      <Contacts />
      <Footer />
      <WhatsAppFab />
    </main>
  );
}
