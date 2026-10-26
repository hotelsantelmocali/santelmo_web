export const siteConfig = {
  name: "Hotel Santelmo",
  tagline: "Un hotel para grupos, equipos y viajeros en Cali",
  description:
    "Hotel Santelmo recibe grupos deportivos, familiares, escolares y empresariales en el sur de Cali. Disfruta habitaciones cómodas, restaurante, terraza con vista y atención 24 horas.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://hotelsantelmo.com",
  phone: "318 735 1317",
  contactPhones: [
    { display: "+57 318 735 13 17", href: "+573187351317" },
    { display: "+57 319 451 84 83", href: "+573194518483" },
    { display: "+57 319 734 29 24", href: "+573197342924" },
  ],
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+573187351317",
  email: "hotelsantelmocali@gmail.com",
  address: "Calle 9 No. 65-14, barrio Gran Limonar, zona rosa del sur de Cali",
  priceRange: "$70.000–$350.000 COP",
  socialLinks: {
    instagram: "https://instagram.com/hotelsantelmocali",
    whatsapp: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\+/g, "") || "573187351317"}`,
  },
  navLinks: [
    { label: "Inicio", href: "#inicio" },
    { label: "Nosotros", href: "#nosotros" },
    { label: "Habitaciones", href: "#habitaciones" },
    { label: "Servicios", href: "#servicios" },
    { label: "Reservar", href: "#reserva" },
  ],
  rooms: [
    {
      id: "habitacion-sencilla",
      name: "Habitación sencilla",
      subtitle: "Comodidad para descansar",
      description:
        "Un espacio cómodo y acogedor con camas individuales, ideal para descansar después de un día en Cali. Cuenta con aire acondicionado, baño privado, televisión nacional e internacional y wifi ilimitado.",
      capacity: "1–2 personas",
      startingPrice: "Desde $160.000",
      priceLabel: "Tarifas según ocupación",
      rates: [
        { label: "1 persona", price: "$160.000" },
        { label: "2 personas", price: "$180.000" },
      ],
      image: "/images/habitacion-doble.jpg",
      amenities: ["Camas individuales", "Aire acondicionado", "Baño privado", "TV nacional e internacional", "Wifi ilimitado"],
    },
    {
      id: "habitacion-parejas",
      name: "Habitación parejas",
      subtitle: "Más espacio para compartir",
      description:
        "Una habitación amplia y privada, con cama matrimonial y opción de una cama individual adicional. Incluye aire acondicionado, baño privado, nevera y televisión nacional e internacional.",
      capacity: "1–3 personas",
      startingPrice: "Desde $180.000",
      priceLabel: "Tarifas según ocupación",
      rates: [
        { label: "1 persona", price: "$180.000" },
        { label: "2 personas", price: "$200.000" },
        { label: "3 personas", price: "$270.000" },
      ],
      image: "/images/suite-principal.jpg",
      amenities: ["Cama matrimonial", "Cama individual adicional", "Aire acondicionado", "Baño privado", "Nevera", "TV nacional e internacional"],
    },
    {
      id: "acomodacion-multiple",
      name: "Acomodación múltiple",
      subtitle: "Práctica para grupos",
      description:
        "Pensada para alojar grupos con comodidad, en habitaciones con tres camas o más. Disfruta aire acondicionado, baño privado, nevera, wifi ilimitado y televisión nacional e internacional.",
      capacity: "3 personas en adelante",
      startingPrice: "$70.000 por persona",
      priceLabel: "Tarifas de referencia",
      rates: [
        { label: "Por persona", price: "$70.000" },
        { label: "3 personas", price: "$210.000" },
        { label: "4 personas", price: "$280.000" },
        { label: "5 personas", price: "$350.000" },
      ],
      image: "/images/suite-doble.jpg",
      amenities: ["3 camas o más", "Aire acondicionado", "Baño privado", "Nevera", "Wifi ilimitado", "TV nacional e internacional"],
    },
  ],
  services: [
    { icon: "Utensils", label: "Restaurante", description: "Desayuno americano; almuerzo y cena opcionales con costo adicional" },
    { icon: "Clock", label: "Recepción 24/7", description: "Atención y acompañamiento durante todo el día" },
    { icon: "Wifi", label: "Internet inalámbrico", description: "Conexión wifi de banda ancha" },
    { icon: "Shirt", label: "Lavandería", description: "Servicio opcional con costo adicional" },
    { icon: "Plane", label: "Transporte al aeropuerto", description: "Servicio opcional con costo adicional" },
    { icon: "Sparkles", label: "Servicio de camarería", description: "Orden, aseo y comodidad durante la estadía" },
    { icon: "Percent", label: "Beneficio en Gastrobar", description: "10% de descuento en el consumo de En Las Nubes" },
    { icon: "Heart", label: "Decoración especial", description: "Opciones para noches románticas y fechas especiales" },
    { icon: "MapPin", label: "Terraza rooftop", description: "Disfruta de la vista de la ciudad" },
  ],
  seo: {
    title: "Hotel en Cali para grupos | Hotel Santelmo",
    description:
      "Hotel en Cali para grupos deportivos, familias y empresas. 14 habitaciones en Gran Limonar, recepción 24 horas, desayuno americano y tarifas con IVA incluido.",
    keywords:
      "hotel en Cali, hotel para grupos Cali, hotel equipos deportivos Cali, alojamiento sur de Cali, Hotel Santelmo, habitaciones Cali",
    ogImage: "/images/social-share.jpg",
  },
};

export type Room = (typeof siteConfig.rooms)[number];
