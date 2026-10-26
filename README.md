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

Las solicitudes se validan en el servidor y se envían directamente por correo
con Resend; no se guardan en una base de datos. Si falta `RESEND_API_KEY`, el
formulario informa del error y no muestra una confirmación falsa.

## Configuración del hotel

Los datos visibles, habitaciones, navegación, contacto y SEO se centralizan en
[`config/site.ts`](./config/site.ts). Las imágenes optimizadas se encuentran en
`public/images/`; reemplázalas manteniendo los nombres o actualiza sus rutas.

## Comprobaciones

- `npm run lint`
- `npx tsc --noEmit`
- `npm run build`
