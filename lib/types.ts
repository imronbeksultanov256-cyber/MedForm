export type Category = "medical" | "chef";
export type Gender = "male" | "female";

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  category: Category;
  gender: Gender;
  description: string;
  material: string;
  sizes: number[];
  colors: ProductColor[];
  images: string[];
  isNew: boolean;
  isBestseller: boolean;
  hidden: boolean;
  createdAt: number;
}

export const CATEGORY_LABEL: Record<Category, string> = {
  medical: "Медицинская форма",
  chef: "Поварская форма",
};

export const GENDER_LABEL: Record<Gender, string> = {
  male: "Мужская",
  female: "Женская",
};

export const DEFAULT_COLORS: ProductColor[] = [
  { name: "Белый", hex: "#FFFFFF" },
  { name: "Тёмно-синий", hex: "#0B1E3D" },
  { name: "Хаки", hex: "#8A8B6C" },
  { name: "Чёрный", hex: "#1A1A1A" },
];
