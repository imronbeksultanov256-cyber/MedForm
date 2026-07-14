import { Product, CATEGORY_LABEL, GENDER_LABEL } from "./types";

export const WHATSAPP_PHONE = "996559949995";

export function buildOrderMessage(
  product: Product,
  size: number | null,
  color: string | null,
  quantity: number = 1
) {
  const lines = [
    "Здравствуйте! 👋",
    "Хочу оформить заказ на форму.",
    "",
    "📋 Информация о товаре:",
    `• Модель: ${product.name}`,
    `• Категория: ${CATEGORY_LABEL[product.category]}`,
    `• Пол: ${GENDER_LABEL[product.gender]}`,
    `• Размер: ${size ?? "не выбран"}`,
    `• Цвет: ${color ?? "не выбран"}`,
    `• Количество: ${quantity}`,
    `• Цена: ${product.price} сом`,
  ];
  return lines.join("\n");
}

export function buildWhatsAppLink(message: string, phone: string = WHATSAPP_PHONE) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function buildGeneralMessage() {
  return "Здравствуйте!";
}
