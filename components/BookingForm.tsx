"use client";

import { useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format, startOfToday } from "date-fns";
import { es } from "date-fns/locale";
import { DateRange } from "react-day-picker";
import { DayPicker } from "react-day-picker";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarIcon,
  Users,
  Plus,
  Minus,
  Send,
  CheckCircle,
  MessageCircle,
  Loader2,
  Phone,
  Mail,
  User,
  BedDouble,
  ChevronDown,
  X,
} from "lucide-react";
import { sendBooking } from "@/app/actions/sendBooking";
import { siteConfig } from "@/config/site";
import "react-day-picker/dist/style.css";

const bookingSchema = z.object({
  checkIn: z.date().optional(),
  checkOut: z.date().optional(),
  adults: z.number().min(1, "Al menos 1 adulto").max(10).default(2),
  children: z.number().min(0).max(10).default(0),
  roomType: z.string().optional().default("Indiferente"),
  name: z.string().min(3, "Nombre mínimo 3 caracteres").max(100),
  phone: z
    .string()
    .trim()
    .min(7, "Teléfono requerido")
    .max(20)
    .regex(/^\+\d[\d\s().-]{6,18}$/, "Incluye el código de país, por ejemplo +57"),
  email: z.string().email("Correo electrónico inválido"),
  comments: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  preselectedRoom?: string;
}

const roomOptions = ["Indiferente", ...siteConfig.rooms.map((room) => room.name)];

function Counter({
  label,
  value,
  onChange,
  min = 0,
  max = 10,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-[var(--text-secondary)]">{label}</span>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          aria-label={`Disminuir ${label.toLowerCase()}`}
          className="w-8 h-8 flex items-center justify-center border border-[var(--dark-border)] text-[var(--gold)] hover:border-[var(--gold)] disabled:opacity-30 transition-colors"
        >
          <Minus className="w-3 h-3" />
        </button>
        <span className="w-6 text-center text-white font-semibold">{value}</span>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          aria-label={`Aumentar ${label.toLowerCase()}`}
          className="w-8 h-8 flex items-center justify-center border border-[var(--dark-border)] text-[var(--gold)] hover:border-[var(--gold)] disabled:opacity-30 transition-colors"
        >
          <Plus className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

export default function BookingForm({ preselectedRoom }: BookingFormProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [isRoomOpen, setIsRoomOpen] = useState(false);
  const [today, setToday] = useState<Date | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<BookingFormData | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      adults: 2,
      children: 0,
      roomType: preselectedRoom ?? "Indiferente",
      name: "",
      phone: "",
      email: "",
      comments: "",
    },
  });

  const adults = useWatch({ control, name: "adults" }) ?? 2;
  const children = useWatch({ control, name: "children" }) ?? 0;
  const selectedRoom = useWatch({ control, name: "roomType" }) ?? "Indiferente";

  useEffect(() => {
    if (preselectedRoom) {
      setValue("roomType", preselectedRoom);
    }
  }, [preselectedRoom, setValue]);

  const handleDateSelect = (range: DateRange | undefined) => {
    setDateRange(range);
    setValue("checkIn", range?.from);
    setValue("checkOut", range?.to);
  };

  const formatDateRange = () => {
    if (!dateRange?.from) return "Seleccionar fechas";
    if (!dateRange.to) return format(dateRange.from, "d MMM yyyy", { locale: es });
    return `${format(dateRange.from, "d MMM yyyy", { locale: es })} — ${format(dateRange.to, "d MMM yyyy", { locale: es })}`;
  };

  const onSubmit = async (data: BookingFormData) => {
    if (!data.checkIn || !data.checkOut) {
      setSubmitError("Selecciona las fechas de llegada y salida.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const result = await sendBooking({
        ...data,
        checkIn: data.checkIn,
        checkOut: data.checkOut,
      });
      if (result.success) {
        setFormData({ ...data, checkIn: data.checkIn, checkOut: data.checkOut });
        setIsSuccess(true);
      } else {
        setSubmitError(result.error || "Error al enviar. Inténtalo de nuevo.");
      }
    } catch {
      setSubmitError("Error de conexión. Inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const buildWhatsAppUrl = (data: BookingFormData) => {
    const ci = data.checkIn ? format(data.checkIn, "d MMM yyyy", { locale: es }) : "N/A";
    const co = data.checkOut ? format(data.checkOut, "d MMM yyyy", { locale: es }) : "N/A";
    const msg = encodeURIComponent(
      `Hola Hotel Santelmo! 👋\n\n*Solicitud de Reserva*\n\n` +
        `📅 Llegada: ${ci}\n📅 Salida: ${co}\n` +
        `👥 Huéspedes: ${data.adults} adulto(s), ${data.children} niño(s)\n` +
        `🛏️ Habitación: ${data.roomType}\n\n` +
        `👤 Nombre: ${data.name}\n📧 Email: ${data.email}\n📱 Tel: ${data.phone}\n` +
        (data.comments ? `\n💬 Peticiones: ${data.comments}` : "")
    );
    const num = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+573187351317").replace(/[^0-9]/g, "");
    return `https://wa.me/${num}?text=${msg}`;
  };

  if (isSuccess && formData) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg mx-auto text-center py-12 px-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2, stiffness: 200 }}
          className="w-20 h-20 mx-auto mb-6 flex items-center justify-center border-2 border-[var(--gold)]"
        >
          <CheckCircle className="w-10 h-10" style={{ color: "var(--gold)" }} />
        </motion.div>
        <h3 className="font-display text-3xl font-bold text-white mb-3">¡Solicitud Enviada!</h3>
        <p className="text-[var(--text-secondary)] mb-2">
          Gracias, <span className="text-white font-semibold">{formData.name}</span>.
        </p>
        <p className="text-[var(--text-secondary)] text-sm mb-8">
          Hemos recibido tu solicitud y nos pondremos en contacto contigo a la brevedad posible al correo{" "}
          <span className="text-[var(--gold)]">{formData.email}</span>.
        </p>
        <div className="p-4 bg-[var(--dark-card)] border border-[var(--dark-border)] text-sm text-left mb-6 space-y-1">
          <p className="text-[var(--text-muted)]">
            📅 {formData.checkIn ? format(formData.checkIn, "d MMM yyyy", { locale: es }) : "N/A"} →{" "}
            {formData.checkOut ? format(formData.checkOut, "d MMM yyyy", { locale: es }) : "N/A"}
          </p>
          <p className="text-[var(--text-muted)]">
            👥 {formData.adults} adulto(s), {formData.children} niño(s)
          </p>
          <p className="text-[var(--text-muted)]">🛏️ {formData.roomType}</p>
        </div>
        <motion.a
          href={buildWhatsAppUrl(formData)}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center justify-center gap-3 w-full py-4 bg-[#25D366] text-white font-bold tracking-wide text-sm"
        >
          <MessageCircle className="w-5 h-5" />
          Confirmar más rápido por WhatsApp
        </motion.a>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Date Range Picker */}
      <div className="relative">
        <label className="text-xs tracking-widest uppercase text-[var(--text-muted)] block mb-2">
          Fechas de Estancia
        </label>
        <button
          type="button"
          onClick={() => {
            setToday(startOfToday());
            setIsCalendarOpen((v) => !v);
          }}
          aria-haspopup="dialog"
          aria-expanded={isCalendarOpen}
          aria-label={`Fechas de estancia: ${formatDateRange()}`}
          className={`w-full flex items-center justify-between px-4 py-3.5 border text-left transition-colors ${
            errors.checkIn || errors.checkOut
              ? "border-red-500/50"
              : isCalendarOpen
              ? "border-[var(--gold)]"
              : "border-[var(--dark-border)] hover:border-[var(--gold)]/50"
          } bg-[var(--dark-card)]`}
        >
          <span className={`text-sm ${dateRange?.from ? "text-white" : "text-[var(--text-muted)]"}`}>
            {formatDateRange()}
          </span>
          <CalendarIcon className="w-4 h-4" style={{ color: "var(--gold)" }} />
        </button>

        <AnimatePresence>
          {isCalendarOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 mt-2 z-50 glass-dark border border-[var(--gold)]/30 p-3 shadow-2xl"
              role="dialog"
              aria-label="Seleccionar fechas de estancia"
              onKeyDown={(event) => {
                if (event.key === "Escape") setIsCalendarOpen(false);
              }}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-[var(--gold)] tracking-widest uppercase">Seleccionar Rango</span>
                <button type="button" onClick={() => setIsCalendarOpen(false)}>
                  <X className="w-4 h-4 text-[var(--text-muted)] hover:text-white" />
                </button>
              </div>
              <DayPicker
                mode="range"
                selected={dateRange}
                onSelect={handleDateSelect}
                locale={es}
                disabled={today ? { before: today } : undefined}
                defaultMonth={today ?? undefined}
                numberOfMonths={1}
                classNames={{
                  root: "rdp-santelmo",
                  selected: "!bg-[var(--gold)] !text-[var(--dark-bg)]",
                  range_middle: "!bg-[var(--gold)]/20 !text-[var(--gold)]",
                  range_start: "!bg-[var(--gold)] !text-[var(--dark-bg)]",
                  range_end: "!bg-[var(--gold)] !text-[var(--dark-bg)]",
                  today: "!border !border-[var(--gold)]/60",
                  disabled: "!opacity-25 !cursor-not-allowed",
                }}
              />
              {dateRange?.from && dateRange?.to && (
                <motion.button
                  type="button"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={() => setIsCalendarOpen(false)}
                  className="w-full mt-2 py-2 bg-[var(--gold)] text-[var(--dark-bg)] text-xs font-bold tracking-widest uppercase"
                >
                  Confirmar Fechas
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        {(errors.checkIn || errors.checkOut) && (
          <p className="text-xs text-red-400 mt-1">Selecciona fechas de llegada y salida</p>
        )}
      </div>

      {/* Guests Counter */}
      <div>
        <label className="text-xs tracking-widest uppercase text-[var(--text-muted)] block mb-2 flex items-center gap-2">
          <Users className="w-3.5 h-3.5" style={{ color: "var(--gold)" }} />
          Huéspedes
        </label>
        <div className="border border-[var(--dark-border)] p-4 bg-[var(--dark-card)] space-y-3">
          <Counter
            label="Adultos"
            value={adults}
            onChange={(v) => setValue("adults", v)}
            min={1}
          />
          <div className="h-px bg-[var(--dark-border)]" />
          <Counter
            label="Niños"
            value={children}
            onChange={(v) => setValue("children", v)}
          />
        </div>
        {errors.adults && <p className="text-xs text-red-400 mt-1">{errors.adults.message}</p>}
      </div>

      {/* Room Type */}
      <div className="relative">
        <label className="text-xs tracking-widest uppercase text-[var(--text-muted)] block mb-2 flex items-center gap-2">
          <BedDouble className="w-3.5 h-3.5" style={{ color: "var(--gold)" }} />
          Tipo de Habitación (Opcional)
        </label>
        <button
          type="button"
          onClick={() => setIsRoomOpen((v) => !v)}
          className={`w-full flex items-center justify-between px-4 py-3.5 border bg-[var(--dark-card)] transition-colors ${
            isRoomOpen ? "border-[var(--gold)]" : "border-[var(--dark-border)] hover:border-[var(--gold)]/50"
          }`}
        >
          <span className="text-sm text-white">{selectedRoom}</span>
          <ChevronDown
            className="w-4 h-4 transition-transform"
            style={{ color: "var(--gold)", transform: isRoomOpen ? "rotate(180deg)" : "rotate(0deg)" }}
          />
        </button>
        <AnimatePresence>
          {isRoomOpen && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              className="absolute top-full left-0 right-0 mt-1 z-40 bg-[var(--dark-card)] border border-[var(--gold)]/30 overflow-hidden"
            >
              {roomOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    setValue("roomType", opt);
                    setIsRoomOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 text-sm transition-colors hover:bg-[var(--gold)]/10 ${
                    selectedRoom === opt ? "text-[var(--gold)]" : "text-[var(--text-secondary)]"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Personal Data */}
      <div className="space-y-4">
        <label className="text-xs tracking-widest uppercase text-[var(--text-muted)] block">
          Datos de Contacto
        </label>

        {/* Name */}
        <div>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: "var(--text-muted)" }} />
            <input
              {...register("name")}
              id="booking-name"
              autoComplete="name"
              aria-invalid={Boolean(errors.name)}
              placeholder="Nombre completo *"
              className={`w-full pl-11 pr-4 py-3.5 bg-[var(--dark-card)] border text-sm text-white placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--gold)] transition-colors ${
                errors.name ? "border-red-500/50" : "border-[var(--dark-border)]"
              }`}
            />
          </div>
          {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>}
        </div>

        {/* Phone */}
        <div>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: "var(--text-muted)" }} />
            <input
              {...register("phone")}
              id="booking-phone"
              autoComplete="tel"
              aria-invalid={Boolean(errors.phone)}
              placeholder="Teléfono / WhatsApp (ej. +57 318...) *"
              type="tel"
              className={`w-full pl-11 pr-4 py-3.5 bg-[var(--dark-card)] border text-sm text-white placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--gold)] transition-colors ${
                errors.phone ? "border-red-500/50" : "border-[var(--dark-border)]"
              }`}
            />
          </div>
          {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone.message}</p>}
        </div>

        {/* Email */}
        <div>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: "var(--text-muted)" }} />
            <input
              {...register("email")}
              id="booking-email"
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              placeholder="Correo electrónico *"
              type="email"
              className={`w-full pl-11 pr-4 py-3.5 bg-[var(--dark-card)] border text-sm text-white placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--gold)] transition-colors ${
                errors.email ? "border-red-500/50" : "border-[var(--dark-border)]"
              }`}
            />
          </div>
          {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
        </div>

        {/* Comments */}
        <textarea
          {...register("comments")}
          placeholder="Peticiones especiales, comentarios... (opcional)"
          rows={3}
          className="w-full px-4 py-3.5 bg-[var(--dark-card)] border border-[var(--dark-border)] text-sm text-white placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--gold)] transition-colors resize-none"
        />
      </div>

      {/* Error message */}
      {submitError && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-3 border border-red-500/30 bg-red-500/10 text-red-400 text-sm text-center"
        >
          {submitError}
        </motion.div>
      )}

      {/* Submit */}
      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: isSubmitting ? 1 : 1.02, boxShadow: "0 0 25px rgba(201,168,76,0.35)" }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-4 bg-[var(--gold)] text-[var(--dark-bg)] font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-3 disabled:opacity-70 transition-all"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Verificar Disponibilidad
          </>
        )}
      </motion.button>

      <p className="text-xs text-center text-[var(--text-muted)]">
        Sin cargos. Te contactaremos para confirmar tu reserva.
      </p>
    </form>
  );
}
