"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { siteConfig, type Room } from "@/config/site";

interface RoomsProps {
  onSelectRoom?: (roomId: string) => void;
}

function RoomCard({ room, index, onSelectRoom }: { room: Room; index: number; onSelectRoom?: (id: string) => void }) {
  const handleConsult = () => {
    if (onSelectRoom) onSelectRoom(room.name);
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
          alt={`${room.name} — Hotel Santelmo`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--dark-card)] via-transparent to-transparent" />

        {/* Price badge */}
        <div className="absolute top-4 right-4 glass-dark px-3 py-1.5 border border-[var(--gold)]/30">
          <span className="text-[var(--gold)] text-xs font-semibold tracking-wide">{room.startingPrice} COP</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-1">
          <span className="text-[10px] tracking-[0.35em] uppercase text-[var(--gold)]">{room.subtitle}</span>
        </div>
        <h3 className="font-display text-xl font-bold text-white mb-2">{room.name}</h3>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">{room.description}</p>

        {/* Room specs */}
        <div className="flex items-center gap-2 mb-4 text-xs text-[var(--text-muted)]">
          <span className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" style={{ color: "var(--gold)" }} />
            {room.capacity}
          </span>
        </div>

        <div className="mb-4 border-y border-[var(--dark-border)] py-3">
          <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--text-muted)] mb-2">
            {room.priceLabel}
          </p>
          <ul className="space-y-1.5">
            {room.rates.map((rate) => (
              <li key={rate.label} className="flex justify-between gap-3 text-xs">
                <span className="text-[var(--text-secondary)]">{rate.label}</span>
                <span className="font-semibold text-white">{rate.price} COP</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-5">
          {room.amenities.slice(0, 4).map((a) => (
            <span
              key={a}
              className="text-[10px] tracking-wide px-2 py-1 border border-[var(--dark-border)] text-[var(--text-muted)]"
            >
              {a}
            </span>
          ))}
          {room.amenities.length > 4 && (
            <span className="text-[10px] tracking-wide px-2 py-1 border border-[var(--dark-border)] text-[var(--text-muted)]">
              +{room.amenities.length - 4} más
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
          Consultar esta habitación
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function Rooms({ onSelectRoom }: RoomsProps) {
  return (
    <section id="habitaciones" className="section-padding bg-[var(--dark-bg)] relative">
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
            Nuestras Estancias
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-display text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            HABITACIONES
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-[var(--text-secondary)] tracking-widest uppercase text-sm"
          >
            14 habitaciones para descansar y compartir
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
          Tarifas en pesos colombianos con IVA incluido. Consulta disponibilidad y condiciones para tu estadía.
        </p>
      </div>
    </section>
  );
}
