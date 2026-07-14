"use client";

import { MessageCircle } from "lucide-react";
import { buildGeneralMessage, buildWhatsAppLink } from "@/lib/whatsapp";

export default function WhatsAppFab() {
  return (
    <a
      href={buildWhatsAppLink(buildGeneralMessage())}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Написать в WhatsApp"
      className="fixed z-40 bottom-5 right-5 sm:hidden h-14 w-14 rounded-full bg-gradient-to-br from-sky-500 to-navy text-white shadow-soft flex items-center justify-center active:scale-95 transition-transform"
    >
      <MessageCircle size={24} />
    </a>
  );
}
