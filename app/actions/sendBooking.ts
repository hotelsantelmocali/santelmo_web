"use server";

import { readFile } from "node:fs/promises";
import path from "node:path";
import { Resend } from "resend";
import { z } from "zod";
import { format, startOfDay } from "date-fns";
import { es } from "date-fns/locale";
import { siteConfig } from "@/config/site";

const bookingSchema = z.object({
  checkIn: z.coerce.date(),
  checkOut: z.coerce.date(),
  adults: z.number().min(1).max(10),
  children: z.number().min(0).max(10),
  roomType: z.string().max(100),
  name: z.string().min(3).max(100),
  phone: z.string().trim().min(7).max(20).regex(/^\+\d[\d\s().-]{6,18}$/),
  email: z.string().email(),
  comments: z.string().max(2000).optional(),
}).superRefine((booking, context) => {
  if (booking.checkIn < startOfDay(new Date())) {
    context.addIssue({
      code: "custom",
      path: ["checkIn"],
      message: "La fecha de llegada no puede estar en el pasado.",
    });
  }

  if (booking.checkOut <= booking.checkIn) {
    context.addIssue({
      code: "custom",
      path: ["checkOut"],
      message: "La fecha de salida debe ser posterior a la llegada.",
    });
  }
});

type BookingData = z.infer<typeof bookingSchema>;

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

function formatDate(date: Date): string {
  return format(date, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es });
}

function buildHtmlEmail(data: BookingData): string {
  const name = escapeHtml(data.name);
  const email = escapeHtml(data.email);
  const phone = escapeHtml(data.phone);
  const roomType = escapeHtml(data.roomType);
  const comments = data.comments ? escapeHtml(data.comments) : "";
  const whatsappNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+573187351317")
    .replace(/[^0-9]/g, "");
  const whatsappMessage = encodeURIComponent(
    `Hola ${data.name}! Gracias por contactar Hotel Santelmo. Hemos recibido tu solicitud de reserva del ${formatDate(data.checkIn)} al ${formatDate(data.checkOut)}.`
  );
  const nights =
    data.checkOut && data.checkIn
      ? Math.ceil(
          (new Date(data.checkOut).getTime() - new Date(data.checkIn).getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : "N/A";

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nueva Solicitud de Reserva — Hotel Santelmo</title>
</head>
<body style="margin:0;padding:0;background:#0d0b08;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0d0b08;padding:32px 0;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#1a1510;border:1px solid #2e2720;">

          <!-- Header -->
          <tr>
            <td style="background:#17120c;padding:28px 20px;text-align:center;border-bottom:2px solid #c9a84c;">
              <img src="cid:hotel-santelmo-logo" alt="Hotel Santelmo" width="220" style="display:block;width:220px;max-width:100%;height:auto;margin:0 auto 16px;">
              <p style="margin:0;font-size:11px;letter-spacing:0.3em;color:#d4c7ad;text-transform:uppercase;">Cali, Colombia</p>
            </td>
          </tr>

          <!-- Title -->
          <tr>
            <td style="padding:28px 32px 0;text-align:center;">
              <p style="margin:0;font-size:11px;letter-spacing:0.4em;color:#c9a84c;text-transform:uppercase;">Nueva Solicitud de Reserva</p>
              <h1 style="margin:8px 0 0;font-size:22px;color:#f5f0e8;font-weight:700;">Tienes un nuevo prospecto</h1>
            </td>
          </tr>

          <!-- Guest Info -->
          <tr>
            <td style="padding:24px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:#221d16;border-left:3px solid #c9a84c;padding:20px;margin-bottom:16px;">
                    <p style="margin:0 0 12px;font-size:11px;letter-spacing:0.3em;color:#c9a84c;text-transform:uppercase;">Datos del Huésped</p>
                          <p style="margin:0 0 8px;color:#f5f0e8;font-size:17px;font-weight:700;">${name}</p>
                          <p style="margin:0 0 6px;color:#a89880;font-size:13px;">Correo: <a href="mailto:${email}" style="color:#d4c7ad;text-decoration:none;">${email}</a></p>
                          <p style="margin:0;color:#a89880;font-size:13px;">Teléfono: <a href="tel:${phone}" style="color:#d4c7ad;text-decoration:none;">${phone}</a></p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Booking Details -->
          <tr>
            <td style="padding:0 32px 24px;">
              <p style="margin:0 0 12px;font-size:11px;letter-spacing:0.3em;color:#c9a84c;text-transform:uppercase;">Detalles de la Estancia</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                <tr>
                  <td style="background:#221d16;border:1px solid #2e2720;padding:14px 16px;width:50%;">
                    <p style="margin:0;font-size:10px;color:#6b5e4e;text-transform:uppercase;letter-spacing:0.2em;">Check-in</p>
                    <p style="margin:4px 0 0;color:#f5f0e8;font-size:13px;">${formatDate(new Date(data.checkIn))}</p>
                  </td>
                  <td style="background:#221d16;border:1px solid #2e2720;border-left:none;padding:14px 16px;">
                    <p style="margin:0;font-size:10px;color:#6b5e4e;text-transform:uppercase;letter-spacing:0.2em;">Check-out</p>
                    <p style="margin:4px 0 0;color:#f5f0e8;font-size:13px;">${formatDate(new Date(data.checkOut))}</p>
                  </td>
                </tr>
                <tr>
                  <td style="background:#221d16;border:1px solid #2e2720;border-top:none;padding:14px 16px;">
                    <p style="margin:0;font-size:10px;color:#6b5e4e;text-transform:uppercase;letter-spacing:0.2em;">Noches</p>
                    <p style="margin:4px 0 0;color:#c9a84c;font-size:20px;font-weight:700;">${nights}</p>
                  </td>
                  <td style="background:#221d16;border:1px solid #2e2720;border-top:none;border-left:none;padding:14px 16px;">
                    <p style="margin:0;font-size:10px;color:#6b5e4e;text-transform:uppercase;letter-spacing:0.2em;">Huéspedes</p>
                    <p style="margin:4px 0 0;color:#f5f0e8;font-size:13px;">${data.adults} adulto(s) · ${data.children} niño(s)</p>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="background:#221d16;border:1px solid #2e2720;border-top:none;padding:14px 16px;">
                    <p style="margin:0;font-size:10px;color:#6b5e4e;text-transform:uppercase;letter-spacing:0.2em;">Tipo de Habitación Preferida</p>
                    <p style="margin:4px 0 0;color:#f5f0e8;font-size:13px;">${roomType}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          ${
            data.comments
              ? `
          <!-- Comments -->
          <tr>
            <td style="padding:0 32px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#221d16;border-left:3px solid #c9a84c;">
                <tr><td style="padding:16px;">
                <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.3em;color:#c9a84c;text-transform:uppercase;">Peticiones Especiales</p>
                <p style="margin:0;color:#a89880;font-size:13px;line-height:1.6;white-space:pre-line;">${comments}</p>
                </td></tr>
              </table>
            </td>
          </tr>`
              : ""
          }

          <!-- CTA -->
          <tr>
            <td style="padding:0 32px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-right:8px;">
                    <a href="mailto:${email}" style="display:block;background:#c9a84c;color:#0d0b08;padding:14px;text-align:center;font-size:11px;font-weight:700;letter-spacing:0.25em;text-transform:uppercase;text-decoration:none;">Responder por Email</a>
                  </td>
                  <td style="padding-left:8px;">
                    <a href="https://wa.me/${whatsappNumber}?text=${whatsappMessage}" style="display:block;background:#25D366;color:white;padding:14px;text-align:center;font-size:11px;font-weight:700;letter-spacing:0.25em;text-transform:uppercase;text-decoration:none;">Responder WhatsApp</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#0d0b08;border-top:1px solid #2e2720;padding:16px 32px;text-align:center;">
              <p style="margin:0;font-size:11px;color:#a89880;">${siteConfig.name} · Cali, Colombia</p>
              <p style="margin:4px 0 0;font-size:11px;"><a href="mailto:${siteConfig.email}" style="color:#c9a84c;text-decoration:none;">${siteConfig.email}</a></p>
              <p style="margin:4px 0 0;font-size:10px;color:#6b5e4e;">${siteConfig.address}</p>
              <p style="margin:4px 0 0;font-size:10px;color:#3d3530;">Este correo fue generado automáticamente desde el formulario de reservas del sitio web.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

export async function sendBooking(
  data: BookingData
): Promise<{ success: boolean; error?: string }> {
  const validation = bookingSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, error: "Datos inválidos. Revisa el formulario." };
  }

  const validated = validation.data;

  const adminEmail = process.env.ADMIN_EMAIL || "hoteltelimocali@gmail.com";
  const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

  if (!process.env.RESEND_API_KEY) {
    console.error("[sendBooking] RESEND_API_KEY is not configured.");
    return {
      success: false,
      error: "No se pudo enviar la solicitud. Inténtalo de nuevo más tarde.",
    };
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const logo = await readFile(
      path.join(process.cwd(), "public", "images", "logo-on-dark-background.png")
    );
    const { error } = await resend.emails.send({
      from: `Hotel Santelmo <${fromEmail}>`,
      to: [adminEmail],
      replyTo: validated.email,
      subject: `🏨 Nueva Solicitud de Reserva — ${validated.name} | ${
        format(validated.checkIn, "d MMM yyyy", { locale: es })
      }`,
      html: buildHtmlEmail(validated),
      attachments: [
        {
          filename: "hotel-santelmo-logo.png",
          content: logo,
          contentType: "image/png",
          contentId: "hotel-santelmo-logo",
        },
      ],
    });

    if (error) {
      console.error("[sendBooking] Resend error:", error);
      return { success: false, error: "Error al enviar el correo. Inténtalo más tarde." };
    }

    return { success: true };
  } catch (err) {
    console.error("[sendBooking] Unexpected error:", err);
    return { success: false, error: "Error inesperado. Inténtalo más tarde." };
  }
}
