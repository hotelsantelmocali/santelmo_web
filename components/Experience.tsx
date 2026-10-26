"use client";

import { motion } from "framer-motion";
import {
  Wifi,
  Utensils,
  Clock,
  Shirt,
  Plane,
  Sparkles,
  Percent,
  Heart,
  MapPin,
  Users,
} from "lucide-react";
import { siteConfig } from "@/config/site";

const iconMap: Record<string, React.ElementType> = {
  Wifi,
  Utensils,
  Clock,
  Shirt,
  Plane,
  Sparkles,
  Percent,
  Heart,
  MapPin,
  Users,
};

const experienceItems = [
  {
    icon: "Users",
    title: "Grupos",
    subtitle: "Espacio para compartir",
    description: "Recibimos equipos deportivos, empresas, familias, grupos escolares y agrupaciones musicales.",
  },
  {
    icon: "MapPin",
    title: "Ubicación",
    subtitle: "Zona rosa del sur de Cali",
    description: "Hospédate en el barrio Gran Limonar, con conexión a espacios deportivos y comerciales de la ciudad.",
  },
  {
    icon: "Utensils",
    title: "Restaurante",
    subtitle: "Y terraza rooftop",
    description: "Disfruta desayuno americano y la vista de Cali desde nuestra terraza. Almuerzo y cena disponibles con costo adicional.",
  },
];

export default function Experience() {
  return (
    <>
      {/* Experience Section */}
      <section id="experiencia" className="section-padding bg-[var(--dark-surface)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, var(--gold) 0, var(--gold) 1px, transparent 0, transparent 50%)",
              backgroundSize: "30px 30px",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs tracking-[0.5em] uppercase text-[var(--gold)] font-semibold block mb-4"
            >
              Atención pensada para tu estadía
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="font-display text-4xl lg:text-5xl font-bold text-white mb-3"
            >
              UN HOTEL PARA GRUPOS
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-[var(--text-secondary)] tracking-widest uppercase text-sm"
            >
              18 años recibiendo visitantes en Cali
            </motion.p>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-px bg-[var(--gold)] mx-auto mt-6"
            />
          </div>

          {/* Experience Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {experienceItems.map((item, i) => {
              const Icon = iconMap[item.icon] || Users;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  whileHover={{ y: -4 }}
                  className="relative bg-[var(--dark-card)] border border-[var(--dark-border)] hover:border-[var(--gold)]/40 p-8 text-center transition-all duration-400 group"
                >
                  <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center border border-[var(--gold)]/30 group-hover:border-[var(--gold)] transition-colors">
                    <Icon className="w-6 h-6" style={{ color: "var(--gold)" }} />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-[var(--gold)] tracking-widest uppercase mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-white font-semibold tracking-wide mb-3 uppercase">{item.subtitle}</p>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services & Amenities Section */}
      <section id="servicios" className="section-padding bg-[var(--dark-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs tracking-[0.5em] uppercase text-[var(--gold)] font-semibold block mb-4"
            >
              Servicios del hotel
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-4xl lg:text-5xl font-bold text-white mb-4"
            >
              Servicios y experiencias
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-px bg-[var(--gold)] mx-auto mt-6"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {siteConfig.services.map((s, i) => {
              const Icon = iconMap[s.icon];
              return (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  whileHover={{ scale: 1.03, borderColor: "var(--gold)" }}
                  className="flex flex-col items-center text-center p-6 border border-[var(--dark-border)] hover:border-[var(--gold)]/50 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 flex items-center justify-center mb-3 border border-[var(--dark-border)] group-hover:border-[var(--gold)]/50 transition-colors">
                    <Icon className="w-5 h-5 transition-colors group-hover:text-[var(--gold)]" style={{ color: "var(--text-muted)" }} />
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1">{s.label}</h3>
                  <p className="text-xs text-[var(--text-muted)]">{s.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
