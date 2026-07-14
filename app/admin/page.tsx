"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  Plus,
  Trash2,
  Eye,
  EyeOff,
  Star,
  Sparkles,
  Save,
  ChevronLeft,
  RotateCcw,
  Upload,
  X,
  Link as LinkIcon,
  Loader2,
} from "lucide-react";
import { useProducts } from "@/lib/store";
import { Product, Category, Gender, CATEGORY_LABEL, GENDER_LABEL, DEFAULT_COLORS } from "@/lib/types";
import { filesToOptimizedDataUrls } from "@/lib/image";

const EMPTY: Product = {
  id: "",
  slug: "",
  name: "",
  price: 1700,
  category: "medical",
  gender: "female",
  description: "",
  material: "",
  sizes: [46, 48, 50, 52, 54, 56],
  colors: DEFAULT_COLORS,
  images: [],
  isNew: false,
  isBestseller: false,
  hidden: false,
  createdAt: 0,
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-zа-я0-9\s-]/gi, "")
    .replace(/\s+/g, "-");
}

function colorsToText(colors: Product["colors"]) {
  return colors.map((c) => `${c.name}:${c.hex}`).join(", ");
}

function textToColors(text: string): Product["colors"] {
  return text
    .split(",")
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => {
      const [name, hex] = chunk.split(":").map((s) => s.trim());
      return { name: name || "Цвет", hex: hex && hex.startsWith("#") ? hex : "#0B1E3D" };
    });
}

export default function AdminPage() {
  const { products, upsert, remove, toggleHidden, toggleFlag, resetToSeed } = useProducts();
  const [editing, setEditing] = useState<Product | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [urlInput, setUrlInput] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [colorsText, setColorsText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startNew = () => {
    setEditing({ ...EMPTY, id: `p_${Date.now()}` });
    setImages([]);
    setColorsText(colorsToText(DEFAULT_COLORS));
    setUploadError(null);
  };

  const startEdit = (p: Product) => {
    setEditing(p);
    setImages(p.images);
    setColorsText(colorsToText(p.colors));
    setUploadError(null);
  };

  const handleFiles = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    setUploading(true);
    setUploadError(null);
    try {
      const urls = await filesToOptimizedDataUrls(fileList);
      setImages((prev) => [...prev, ...urls]);
    } catch {
      setUploadError("Не удалось загрузить одно из фото. Попробуйте другой файл.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const addUrl = () => {
    const url = urlInput.trim();
    if (!url) return;
    setImages((prev) => [...prev, url]);
    setUrlInput("");
  };

  const removeImage = (idx: number) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const save = () => {
    if (!editing) return;
    const colors = textToColors(colorsText);
    const slug = editing.slug || slugify(editing.name) || editing.id;
    upsert({
      ...editing,
      slug,
      images: images.length ? images : ["/products/med-w-teal.jpg"],
      colors: colors.length ? colors : DEFAULT_COLORS,
      createdAt: editing.createdAt || Date.now(),
    });
    setEditing(null);
  };

  return (
    <div className="min-h-screen bg-ice/60">
      <div className="glass sticky top-0 z-30 shadow-soft">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy">
            <ChevronLeft size={18} />
            На сайт
          </Link>
          <span className="font-display font-bold text-navy">Админ-панель</span>
          <button
            onClick={() => {
              if (confirm("Сбросить каталог к исходным товарам?")) resetToSeed();
            }}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy-400"
          >
            <RotateCcw size={14} />
            Сбросить
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-6">
        <div className="flex items-center justify-between mb-5">
          <h1 className="font-display font-extrabold text-xl text-navy">
            Товары ({products.length})
          </h1>
          <button
            onClick={startNew}
            className="inline-flex items-center gap-1.5 rounded-full bg-navy text-white text-sm font-semibold px-4 py-2.5 shadow-soft"
          >
            <Plus size={16} />
            Добавить товар
          </button>
        </div>

        <div className="grid gap-3">
          {products.map((p) => (
            <div
              key={p.id}
              className={`bg-white rounded-2xl shadow-card p-4 flex items-center gap-4 ${
                p.hidden ? "opacity-50" : ""
              }`}
            >
              <div className="h-16 w-14 shrink-0 rounded-lg bg-ice overflow-hidden">
                {p.images[0] && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.images[0]} alt={p.name} className="h-full w-full object-cover object-top" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-navy text-sm truncate">{p.name}</p>
                <p className="text-xs text-navy-400">
                  {CATEGORY_LABEL[p.category]} · {GENDER_LABEL[p.gender]} · {p.price} сом
                </p>
                {p.colors.length > 0 && (
                  <div className="flex gap-1 mt-1.5">
                    {p.colors.map((c) => (
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
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => toggleFlag(p.id, "isNew")}
                  title="Новинка"
                  className={`h-8 w-8 rounded-full flex items-center justify-center ${
                    p.isNew ? "bg-sky-500 text-white" : "bg-ice text-navy-400"
                  }`}
                >
                  <Sparkles size={14} />
                </button>
                <button
                  onClick={() => toggleFlag(p.id, "isBestseller")}
                  title="Хит продаж"
                  className={`h-8 w-8 rounded-full flex items-center justify-center ${
                    p.isBestseller ? "bg-gold text-navy" : "bg-ice text-navy-400"
                  }`}
                >
                  <Star size={14} />
                </button>
                <button
                  onClick={() => toggleHidden(p.id)}
                  title={p.hidden ? "Показать" : "Скрыть"}
                  className="h-8 w-8 rounded-full bg-ice text-navy-400 flex items-center justify-center"
                >
                  {p.hidden ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
                <button
                  onClick={() => startEdit(p)}
                  className="h-8 px-3 rounded-full bg-navy-50 text-navy text-xs font-semibold"
                >
                  Изменить
                </button>
                <button
                  onClick={() => {
                    if (confirm("Удалить товар?")) remove(p.id);
                  }}
                  className="h-8 w-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {editing && (
        <div
          className="fixed inset-0 z-50 bg-navy-900/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={() => setEditing(null)}
        >
          <div
            className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-lg max-h-[92vh] overflow-y-auto p-5 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-display font-bold text-lg text-navy mb-4">
              {products.some((p) => p.id === editing.id) ? "Изменить товар" : "Новый товар"}
            </h2>
            <div className="flex flex-col gap-3.5">
              <Field label="Название">
                <input
                  className="input"
                  value={editing.name}
                  onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                />
              </Field>
              <Field label="Цена (сом)">
                <input
                  type="number"
                  className="input"
                  value={editing.price}
                  onChange={(e) => setEditing({ ...editing, price: Number(e.target.value) })}
                />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Категория">
                  <select
                    className="input"
                    value={editing.category}
                    onChange={(e) => setEditing({ ...editing, category: e.target.value as Category })}
                  >
                    <option value="medical">Медицинская</option>
                    <option value="chef">Поварская</option>
                  </select>
                </Field>
                <Field label="Пол">
                  <select
                    className="input"
                    value={editing.gender}
                    onChange={(e) => setEditing({ ...editing, gender: e.target.value as Gender })}
                  >
                    <option value="female">Женская</option>
                    <option value="male">Мужская</option>
                    <option value="unisex">Унисекс</option>
                  </select>
                </Field>
              </div>
              <Field label="Описание">
                <textarea
                  className="input min-h-[80px]"
                  value={editing.description}
                  onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                />
              </Field>
              <Field label="Материал">
                <input
                  className="input"
                  value={editing.material}
                  onChange={(e) => setEditing({ ...editing, material: e.target.value })}
                />
              </Field>
              <Field label="Размеры (через запятую)">
                <input
                  className="input"
                  value={editing.sizes.join(", ")}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      sizes: e.target.value
                        .split(",")
                        .map((s) => Number(s.trim()))
                        .filter((n) => !Number.isNaN(n)),
                    })
                  }
                />
              </Field>
              <Field label={`Фото товара (${images.length})`}>
                <div className="flex flex-wrap gap-2 mb-2.5">
                  {images.map((src, i) => (
                    <div
                      key={i}
                      className="relative h-16 w-14 rounded-lg overflow-hidden bg-ice shrink-0 group"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={src} alt="" className="h-full w-full object-cover object-top" />
                      <button
                        type="button"
                        onClick={() => removeImage(i)}
                        aria-label="Удалить фото"
                        className="absolute top-0.5 right-0.5 h-5 w-5 rounded-full bg-navy-900/70 text-white flex items-center justify-center"
                      >
                        <X size={11} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="h-16 w-14 rounded-lg border-2 border-dashed border-navy-100 text-navy-400 flex flex-col items-center justify-center gap-0.5 shrink-0"
                  >
                    {uploading ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Upload size={15} />
                    )}
                    <span className="text-[9px] font-semibold">
                      {uploading ? "Грузим…" : "Добавить"}
                    </span>
                  </button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => handleFiles(e.target.files)}
                />
                {uploadError && <p className="text-xs text-red-500 mb-2">{uploadError}</p>}
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <LinkIcon
                      size={14}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-400"
                    />
                    <input
                      className="input pl-8"
                      placeholder="или вставьте ссылку/путь на фото"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addUrl();
                        }
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={addUrl}
                    className="rounded-xl bg-navy-50 text-navy text-xs font-semibold px-3.5"
                  >
                    Добавить
                  </button>
                </div>
                <p className="text-[11px] text-navy-400 mt-1.5">
                  Можно выбрать сразу несколько фото — они автоматически сожмутся и приведутся к
                  единому формату (JPEG, до 1400px).
                </p>
              </Field>
              <Field label="Цвета (формат Название:#HEX через запятую)">
                <input
                  className="input"
                  value={colorsText}
                  onChange={(e) => setColorsText(e.target.value)}
                  placeholder="Белый:#FFFFFF, Тёмно-синий:#0B1E3D, Хаки:#8A8B6C, Чёрный:#1A1A1A"
                />
                <div className="flex gap-1.5 mt-2">
                  {textToColors(colorsText).map((c, i) => (
                    <span
                      key={i}
                      title={c.name}
                      className="h-5 w-5 rounded-full border border-navy-100"
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
              </Field>
            </div>
            <div className="flex gap-2 mt-5">
              <button
                onClick={() => setEditing(null)}
                className="flex-1 rounded-full border border-navy-100 text-navy font-semibold py-3 text-sm"
              >
                Отмена
              </button>
              <button
                onClick={save}
                className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-navy text-white font-semibold py-3 text-sm"
              >
                <Save size={15} />
                Сохранить
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .input {
          width: 100%;
          border: 1px solid #d7e0ee;
          border-radius: 0.75rem;
          padding: 0.65rem 0.9rem;
          font-size: 0.875rem;
          background: white;
        }
        .input:focus {
          outline: 2px solid #3fa9f5;
        }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-navy-400 mb-1">{label}</span>
      {children}
    </label>
  );
}
