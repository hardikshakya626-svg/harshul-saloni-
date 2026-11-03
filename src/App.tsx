/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { testConnection } from './firebase';
import { FilmEditorialHeroSection } from './components/FilmEditorialHeroSection';
import { SaveTheDateSection } from './components/SaveTheDateSection';
import { HeroSection } from './components/HeroSection';
import { EventsSection } from './components/EventsSection';
import { FamiliesSection } from './components/FamiliesSection';
import { VenueLocationMapSection } from './components/VenueLocationMapSection';
import { FooterSection } from './components/FooterSection';
import { AudioPlayer } from './components/AudioPlayer';
import { IntroAnimation } from './components/IntroAnimation';
import { GuestPortal } from './components/GuestPortal';
import { pauseWeddingMusic } from './utils/weddingAudio';
import { Sparkles } from 'lucide-react';

const getInitialIsPortal = (): boolean => {
  if (typeof window === 'undefined') return false;
  const search = window.location.search.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  const path = window.location.pathname.toLowerCase();

  return (
    search.includes('guests') ||
    search.includes('portal') ||
    search.includes('admin') ||
    search.includes('rsvp') ||
    hash.includes('guests') ||
    hash.includes('portal') ||
    hash.includes('admin') ||
    hash.includes('rsvp') ||
    path.includes('guests') ||
    path.includes('portal') ||
    path.includes('admin') ||
    path.includes('rsvp')
  );
};

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [isGuestPortal, setIsGuestPortal] = useState(getInitialIsPortal);

  useEffect(() => {
    testConnection();

    // Check secret route params
    const checkRoute = () => {
      const isPortal = getInitialIsPortal();
      setIsGuestPortal(isPortal);

      if (isPortal) {
        // Automatically pause background audio when entering guest portal
        pauseWeddingMusic();
      }
    };

    checkRoute();
    window.addEventListener('popstate', checkRoute);
    window.addEventListener('hashchange', checkRoute);

    return () => {
      window.removeEventListener('popstate', checkRoute);
      window.removeEventListener('hashchange', checkRoute);
    };
  }, []);

  // RENDER SECRET GUEST PORTAL
  if (isGuestPortal) {
    return <GuestPortal onBackToSite={() => setIsGuestPortal(false)} />;
  }

  return (
    <div className="min-h-screen w-full bg-maroon-canvas text-[#5A0F2C] flex flex-col items-center justify-start pt-0 pb-8 sm:pb-12 selection:bg-[#FFE8B5] selection:text-[#5A0F2C]">
      
      {/* Optional Royal Intro Animation Replay */}
      {showIntro && <IntroAnimation onOpen={() => setShowIntro(false)} />}

      {/* 1. EDITORIAL POSTCARD HERO SECTION */}
      <FilmEditorialHeroSection />

      {/* Main Wedding Invitation Card Container */}
      <main className="w-full max-w-[620px] bg-[#4A0E2E] shadow-[0_20px_60px_rgba(0,0,0,0.65)] rounded-none overflow-hidden flex flex-col">
        
        {/* 2. SAVE THE DATE EDITORIAL SECTION */}
        <SaveTheDateSection />

        {/* 3. INVITATION SCROLL SECTION */}
        <HeroSection />

        {/* 3. EVENTS BAND */}
        <EventsSection />

        {/* 4. FAMILIES SECTION */}
        <FamiliesSection />

        {/* 5. FOOTER & RSVP */}
        <FooterSection />

        {/* 6. WEDDING VENUE MAP */}
        <VenueLocationMapSection />

      </main>

      {/* Bottom Luxury Footer & Replay Animation Control */}
      <footer className="w-full max-w-[620px] py-8 px-4 text-center flex flex-col items-center justify-center space-y-3 select-none">
        {/* Delicate hairline flourish */}
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#E8D3B9]/40 to-transparent mx-auto mb-1" />

        <p className="font-serif tracking-[0.28em] pl-[0.28em] uppercase text-[11px] sm:text-xs text-[#F2E5D5]/90 font-light">
          The Wedding Celebration of Harshul &amp; Saloni
        </p>
        <p className="font-serif text-[10px] tracking-[0.32em] pl-[0.32em] uppercase text-[#D8BA9B]/75">
          Gwalior &bull; Madhya Pradesh
        </p>

        {/* Replay Intro Action */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => setShowIntro(true)}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-[#F2E5D5] hover:text-white border border-[#E8D3B9]/25 hover:border-[#E8D3B9]/50 text-[10px] font-serif tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer shadow-xs backdrop-blur-xs"
          >
            <Sparkles className="w-3 h-3 text-[#E8D3B9]" />
            <span>Replay Intro</span>
          </button>
        </div>
      </footer>

      {/* Floating Auspicious Music Player */}
      <AudioPlayer />
    </div>
  );
}
