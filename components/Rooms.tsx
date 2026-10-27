"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { siteConfig, type Room } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { TranslationKey } from "@/i18n/translations";

interface RoomsProps {
  onSelectRoom?: (roomId: string) => void;
}

interface RoomTranslationKeys {
  name: TranslationKey;
  subtitle: TranslationKey;
  description: TranslationKey;
  capacity: TranslationKey;
  priceLabel: TranslationKey;
  startingPrice: TranslationKey;
  rates: TranslationKey[];
  amenities: TranslationKey[];
}

const roomTranslationKeys: Record<Room["id"], RoomTranslationKeys> = {
  "habitacion-sencilla": {
    name: "rooms.single.name",
    subtitle: "rooms.single.subtitle",
    description: "rooms.single.description",
    capacity: "rooms.single.capacity",
    priceLabel: "rooms.priceLabel.occupancy",
    startingPrice: "rooms.single.startingPrice",
    rates: ["rooms.single.rate.one", "rooms.single.rate.two"],
    amenities: [
      "rooms.single.amenity.beds",
      "rooms.single.amenity.ac",
      "rooms.single.amenity.bathroom",
      "rooms.single.amenity.tv",
      "rooms.single.amenity.wifi",
    ],
  },
  "habitacion-parejas": {
    name: "rooms.couple.name",
    subtitle: "rooms.couple.subtitle",
    description: "rooms.couple.description",
    capacity: "rooms.couple.capacity",
    priceLabel: "rooms.priceLabel.occupancy",
    startingPrice: "rooms.couple.startingPrice",
    rates: ["rooms.couple.rate.one", "rooms.couple.rate.two", "rooms.couple.rate.three"],
    amenities: [
      "rooms.couple.amenity.bed",
      "rooms.couple.amenity.extraBed",
      "rooms.couple.amenity.ac",
      "rooms.couple.amenity.bathroom",
      "rooms.couple.amenity.fridge",
      "rooms.couple.amenity.tv",
    ],
  },
  "acomodacion-multiple": {
    name: "rooms.multiple.name",
    subtitle: "rooms.multiple.subtitle",
    description: "rooms.multiple.description",
    capacity: "rooms.multiple.capacity",
    priceLabel: "rooms.priceLabel.reference",
    startingPrice: "rooms.multiple.startingPrice",
    rates: [
      "rooms.multiple.rate.person",
      "rooms.multiple.rate.three",
      "rooms.multiple.rate.four",
      "rooms.multiple.rate.five",
    ],
    amenities: [
      "rooms.multiple.amenity.beds",
      "rooms.multiple.amenity.ac",
      "rooms.multiple.amenity.bathroom",
      "rooms.multiple.amenity.fridge",
      "rooms.multiple.amenity.wifi",
      "rooms.multiple.amenity.tv",
    ],
  },
};

function RoomCard({ room, index, onSelectRoom }: { room: Room; index: number; onSelectRoom?: (id: string) => void }) {
  const { t } = useLanguage();
  const roomText = roomTranslationKeys[room.id];

  const handleConsult = () => {
    if (onSelectRoom) onSelectRoom(room.id);
    const el = document.getElementById("reserva");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative bg-[var(--dark-card)] border border-[var(--dark-border)] hover:border-[var(--gold)]/50 transition-all duration-500 overflow-hidden"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={room.image}
          alt={`${t(roomText.name)} — Hotel Santelmo`}
          fill
          unoptimized={process.env.NODE_ENV === "development"}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--dark-card)] via-transparent to-transparent" />

        {/* Price badge */}
        <div className="absolute top-4 right-4 glass-dark px-3 py-1.5 border border-[var(--gold)]/30">
          <span className="text-[var(--gold)] text-xs font-semibold tracking-wide">{t(roomText.startingPrice)} COP</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-1">
          <span className="text-[10px] tracking-[0.35em] uppercase text-[var(--gold)]">{t(roomText.subtitle)}</span>
        </div>
        <h3 className="font-display text-xl font-bold text-white mb-2">{t(roomText.name)}</h3>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">{t(roomText.description)}</p>

        {/* Room specs */}
        <div className="flex items-center gap-2 mb-4 text-xs text-[var(--text-muted)]">
          <span className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" style={{ color: "var(--gold)" }} />
            {t(roomText.capacity)}
          </span>
        </div>

        <div className="mb-4 border-y border-[var(--dark-border)] py-3">
          <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--text-muted)] mb-2">
            {t(roomText.priceLabel)}
          </p>
          <ul className="space-y-1.5">
            {room.rates.map((rate, rateIndex) => (
              <li key={rate.label} className="flex justify-between gap-3 text-xs">
                <span className="text-[var(--text-secondary)]">{t(roomText.rates[rateIndex])}</span>
                <span className="font-semibold text-white">{rate.price} COP</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-5">
          {room.amenities.slice(0, 4).map((_, amenityIndex) => (
            <span
              key={roomText.amenities[amenityIndex]}
              className="text-[10px] tracking-wide px-2 py-1 border border-[var(--dark-border)] text-[var(--text-muted)]"
            >
              {t(roomText.amenities[amenityIndex])}
            </span>
          ))}
          {room.amenities.length > 4 && (
            <span className="text-[10px] tracking-wide px-2 py-1 border border-[var(--dark-border)] text-[var(--text-muted)]">
              {t("rooms.more", { count: room.amenities.length - 4 })}
            </span>
          )}
        </div>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleConsult}
          className="w-full py-3 border border-[var(--gold)] text-[var(--gold)] text-xs font-semibold tracking-widest uppercase hover:bg-[var(--gold)] hover:text-[var(--dark-bg)] transition-all duration-300"
        >
          {t("rooms.consult")}
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function Rooms({ onSelectRoom }: RoomsProps) {
  const { t } = useLanguage();

  return (
    <section id="habitaciones" className="section-padding bg-[var(--dark-bg)] relative overflow-x-clip">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--gold)]/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs tracking-[0.5em] uppercase text-[var(--gold)] font-semibold block mb-4"
          >
            {t("rooms.eyebrow")}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-display text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            {t("rooms.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-[var(--text-secondary)] tracking-widest uppercase text-sm"
          >
            {t("rooms.intro")}
          </motion.p>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-px bg-[var(--gold)] mx-auto mt-6"
          />
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteConfig.rooms.map((room, i) => (
            <RoomCard key={room.id} room={room} index={i} onSelectRoom={onSelectRoom} />
          ))}
        </div>
        <p className="mt-8 text-center text-xs text-[var(--text-muted)]">
          {t("rooms.priceNote")}
        </p>
      </div>
    </section>
  );
}
