"use client";

import Image from "next/image";
import { Phone, MessageCircle, MapPin, Navigation } from "lucide-react";
import { buildGeneralMessage, buildWhatsAppLink } from "@/lib/whatsapp";

const STORE_ADDRESS = "Ош, просп. Абсамата Масалиева, 9";
const YANDEX_MAPS_URL =
  "https://yandex.com/maps/10310/osh/?ll=72.801900%2C40.546051&mode=poi&poi%5Bpoint%5D=72.801818%2C40.546087&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D11719040953&z=21";
const YANDEX_MAP_EMBED =
  "https://yandex.ru/map-widget/v1/?ll=72.801818%2C40.546087&z=17&pt=72.801818,40.546087,pm2rdm";

export default function Contacts() {
  return (
    <section id="contacts" className="px-4 sm:px-6 py-14 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-xl2 bg-navy px-6 sm:px-12 py-12 sm:py-16">
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" />
          <div className="relative grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-sky-300 text-sm font-semibold tracking-[0.14em] uppercase mb-2">
                Контакты
              </p>
              <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white mb-4">
                Остались вопросы? Напишите нам
              </h2>
              <p className="text-white/70 text-[15px] leading-relaxed mb-6">
                Ответим в течение нескольких минут, поможем подобрать размер и оформим заказ.
              </p>
              <div className="flex flex-col gap-3 mb-7">
                <div className="flex items-center gap-3 text-white/90 text-sm">
                  <Phone size={16} className="text-sky-300 shrink-0" />
                  +996 559 949 995
                </div>
                <div className="flex items-center gap-3 text-white/90 text-sm">
                  <MapPin size={16} className="text-sky-300 shrink-0" />
                  {STORE_ADDRESS}
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={buildWhatsAppLink(buildGeneralMessage())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-full bg-white text-navy font-semibold px-7 py-4 shadow-soft active:scale-95 transition-transform"
                >
                  <MessageCircle size={19} />
                  Написать в WhatsApp
                </a>
                <a
                  href={YANDEX_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-full border border-white/25 text-white font-semibold px-7 py-4 active:scale-95 transition-transform"
                >
                  <Navigation size={18} />
                  Маршрут в Яндекс Картах
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="relative h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-soft">
                <a
                  href={YANDEX_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Открыть магазин на Яндекс Картах"
                  className="absolute inset-0 z-10"
                  style={{ background: "transparent" }}
                />
                <iframe
                  src={YANDEX_MAP_EMBED}
                  title="Магазин UNIFORM на карте"
                  className="absolute inset-0 w-full h-full border-0 pointer-events-none"
                  loading="lazy"
                />
                {/* branded pin overlay, anchored at map center */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full z-20 pointer-events-none">
                  <Image
                    src="/brand/map-pin.svg"
                    alt="Наш магазин"
                    width={40}
                    height={52}
                    className="drop-shadow-lg animate-fadeUp"
                  />
                </div>
              </div>
              <p className="text-white/50 text-xs mt-3 text-center lg:text-left">
                Нажмите на карту, чтобы открыть маршрут в приложении Яндекс Карт
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
