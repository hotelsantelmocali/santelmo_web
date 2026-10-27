"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Rooms from "@/components/Rooms";
import Experience from "@/components/Experience";
import BookingSection from "@/components/BookingSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CookieNotice from "@/components/CookieNotice";
import { LanguageProvider } from "@/i18n/LanguageProvider";

export default function Home() {
  const [selectedRoom, setSelectedRoom] = useState<string | undefined>();

  return (
    <LanguageProvider>
      <main>
        <Navbar />
        <Hero />
        <About />
        <Gallery />
        <Rooms onSelectRoom={setSelectedRoom} />
        <Experience />
        <BookingSection preselectedRoom={selectedRoom} />
        <Footer />
        <WhatsAppButton />
        <CookieNotice />
      </main>
    </LanguageProvider>
  );
}
