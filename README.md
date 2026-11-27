# Hotel Santelmo

Landing page responsive para Hotel Santelmo, construida con Next.js App Router,
TypeScript, Tailwind CSS y componentes interactivos en React.

## Desarrollo local

1. Instala las dependencias con `npm install`.
2. Copia `.env.example` a `.env.local`.
3. Configura `RESEND_API_KEY` con una clave válida de Resend y usa un remitente
   verificado en `RESEND_FROM_EMAIL`. Define también el correo administrador,
   el WhatsApp internacional y la URL pública del sitio.
4. Ejecuta `npm run dev` y abre <http://localhost:3000>.

Para producción, configura `NEXT_PUBLIC_SITE_URL` como
`https://hotelsantelmocali.com` y usa un remitente del dominio, por ejemplo
`reservas@hotelsantelmocali.com`. Antes de enviar correos, agrega y verifica
`hotelsantelmocali.com` en Resend y publica en el DNS del dominio los registros
que Resend indique. Configura estas variables en el entorno de despliegue.

Las solicitudes se validan en el servidor y se envían directamente por correo
con Resend; no se guardan en una base de datos. Si falta `RESEND_API_KEY`, el
formulario informa del error y no muestra una confirmación falsa.

## Configuración del hotel

Los datos visibles, habitaciones, navegación, contacto y SEO se centralizan en
[`config/site.ts`](./config/site.ts). Las imágenes optimizadas se encuentran en
`public/images/`; reemplázalas manteniendo los nombres o actualiza sus rutas.

## Eventos con Prismic

La sección de eventos usa sus propias rutas y locales: `/eventos` (español) y
`/events` (inglés), independientemente del selector de idioma del hotel. Configura
`PRISMIC_REPOSITORY_NAME`, `PRISMIC_LOCALE_ES` y `PRISMIC_LOCALE_EN` en `.env.local`
y en las variables de entorno de Vercel. Los códigos de idioma deben coincidir
exactamente con los de **Settings → Translations & Locales** en Prismic. El
contenido publicado debe ser accesible desde la API pública; si el repositorio
es privado, agrega `PRISMIC_ACCESS_TOKEN` como variable secreta.

En Prismic crea un tipo repetible con API ID `event` y estos campos:

- `uid` (UID), `title` (Key Text), `summary` (Key Text), `start_date` (Date), `start_time`
  (Key Text), `end_date` (Date), `end_time` (Key Text).
- `venue`, `address`, `city`, `region`, `organizer` (Key Text).
- `hero_image`, `seo_image` (Image), `description` (Rich Text),
  `ticket_url` (Link).
- `meta_title`, `meta_description` (Key Text).

Publica una traducción por idioma para que el selector de eventos enlace el
detalle equivalente cuando exista. Cada evento publicado aparece en su idioma;
los pasados dejan de mostrarse en el listado y el sitemap.

Para reflejar publicaciones y despublicaciones sin desplegar de nuevo, define
`PRISMIC_WEBHOOK_SECRET` en Vercel y configura en **Settings → Webhooks** una
notificación para **Documents published** y **Documents unpublished**, apuntando
a `https://hotelsantelmocali.com/api/revalidate`. Usa el mismo secreto en la
configuración del webhook. El endpoint invalida la caché de eventos; no crea un
deploy de Vercel.

Las páginas de detalle incluyen metadatos propios, enlaces canónicos/hreflang y
datos estructurados `Event` para eventos futuros. Google decide cuándo rastrear
e indexar las páginas; el marcado no garantiza aparecer en resultados
enriquecidos.

## Idiomas y calendario

El sitio ofrece español, inglés y portugués. Las traducciones están en
[`i18n/translations.ts`](./i18n/translations.ts) y la selección se conserva en
el navegador. Actualmente los idiomas cambian el contenido en la misma URL;
para posicionar páginas independientes por idioma habrá que añadir rutas y
metadatos localizados.

El selector de fechas utiliza React DayPicker v10. Su tema está en
[`app/globals.css`](./app/globals.css), bajo `.rdp-root.rdp-santelmo`; allí se
pueden ajustar las variables `--rdp-*` y las reglas de color, tamaño, bordes y
estados de las fechas.

El aviso de cookies informa que el sitio guarda en el navegador el idioma y el
estado del aviso. Su componente está en
[`components/CookieNotice.tsx`](./components/CookieNotice.tsx) y sus textos
localizados están en [`i18n/translations.ts`](./i18n/translations.ts).

La sección de Instagram muestra tarjetas que enlazan a las historias destacadas
del perfil configuradas en
[`components/InstagramHighlights.tsx`](./components/InstagramHighlights.tsx).
Las historias se abren en Instagram; para mostrar videos directamente en el
sitio se necesitarían archivos multimedia o una integración oficial compatible.

## Comprobaciones

- `npm run lint`
- `npx tsc --noEmit`
- `npm run build`
