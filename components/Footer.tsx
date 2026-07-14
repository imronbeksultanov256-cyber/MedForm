import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Phone, MapPin } from "lucide-react";
import { buildGeneralMessage, buildWhatsAppLink } from "@/lib/whatsapp";

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white/70 px-4 sm:px-6 pt-12 pb-28 sm:pb-12">
      <div className="mx-auto max-w-7xl grid sm:grid-cols-3 gap-8 mb-10">
        <div>
          <Image
            src="/brand/logo.png"
            alt="Uniform Medical Wear"
            width={140}
            height={42}
            className="h-9 w-auto object-contain brightness-0 invert opacity-90 mb-1"
          />
          <p className="text-sm mt-3 leading-relaxed max-w-xs">
            Профессиональная униформа для медицинских работников и поваров. Премиальное
            качество по доступной цене.
          </p>
        </div>
        <div>
          <p className="text-white font-semibold text-sm mb-3">Категории</p>
          <div className="flex flex-col gap-2 text-sm">
            <a href="#catalog" className="hover:text-white transition-colors">
              🩺 Медицинская форма
            </a>
            <a href="#catalog" className="hover:text-white transition-colors">
              👨‍🍳 Поварская форма
            </a>
          </div>
        </div>
        <div>
          <p className="text-white font-semibold text-sm mb-3">Контакты</p>
          <div className="flex flex-col gap-2 text-sm">
            <span className="inline-flex items-center gap-2">
              <Phone size={14} /> +996 559 949 995
            </span>
            <span className="inline-flex items-start gap-2">
              <MapPin size={14} className="mt-0.5 shrink-0" /> Ош, просп. Абсамата Масалиева, 9
            </span>
            <a
              href={buildWhatsAppLink(buildGeneralMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-white transition-colors"
            >
              <MessageCircle size={14} /> Написать в WhatsApp
            </a>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl border-t border-white/10 pt-5 flex flex-col sm:flex-row justify-between gap-2 text-xs text-white/40">
        <span>© {new Date().getFullYear()} UNIFORM. Все права защищены.</span>
        <Link href="/admin" className="hover:text-white/70 transition-colors">
          Админ-панель
        </Link>
      </div>
    </footer>
  );
}
