"use client";

import { useState, ViewTransition } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Rooms from "@/components/Rooms";
import Experience from "@/components/Experience";
import BookingSection from "@/components/BookingSection";
import InstagramHighlights from "@/components/InstagramHighlights";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CookieNotice from "@/components/CookieNotice";
import { LanguageProvider } from "@/i18n/LanguageProvider";

export default function Home() {
  const [selectedRoom, setSelectedRoom] = useState<string | undefined>();

  return (
    <LanguageProvider>
      <ViewTransition
        enter={{
          "en-las-nubes-forward": "en-las-nubes-route-enter",
          "santelmo-home-return": "santelmo-route-enter",
          default: "none",
        }}
        exit={{
          "en-las-nubes-forward": "en-las-nubes-route-exit",
          "santelmo-home-return": "santelmo-route-exit",
          default: "none",
        }}
      >
        <main>
          <Navbar />
          <Hero />
          <About />
          <Gallery />
          <Rooms onSelectRoom={setSelectedRoom} />
          <Experience />
          <BookingSection preselectedRoom={selectedRoom} />
          <InstagramHighlights />
          <Footer />
          <WhatsAppButton />
          <CookieNotice />
        </main>
      </ViewTransition>
    </LanguageProvider>
  );
}
