import React from 'react';
import { ChevronDown } from 'lucide-react';
import { WEDDING_CONFIG } from '../weddingConfig';

export const SaveTheDateSection: React.FC = () => {
  const { couple } = WEDDING_CONFIG;

  const scrollToInvitation = () => {
    const el = document.getElementById('invitation-hero');
    if (el) {
      el.scrollIntoView({ behavior: 'auto' });
    }
  };

  return (
    <section
      id="save-the-date"
      className="relative w-full min-h-[92vh] sm:min-h-screen bg-white text-[#111827] flex flex-col justify-between items-center py-16 sm:py-24 px-6 sm:px-12 overflow-hidden select-none border-b border-gray-100"
    >
      {/* Subtle modern micro-dot texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:20px_20px]" />

      {/* 
        1. TOP: Couple Names in small, letter-spaced uppercase
        Matching "MICHAEL & CAITLIN" in the attached template
      */}
      <div className="relative z-10 text-center pt-2 sm:pt-4">
        <p className="font-serif text-[11px] sm:text-xs tracking-[0.36em] pl-[0.36em] uppercase text-gray-500 font-medium">
          {couple.groom.nameEnglish} &amp; {couple.bride.nameEnglish}
        </p>
      </div>

      {/* 
        2. CENTER: "SAVE THE DATE"
        Stacked luxury typography, kept small & refined as requested
      */}
      <div className="relative z-10 my-auto py-8 sm:py-12 flex flex-col items-center justify-center text-center">
        <div className="flex flex-col items-center justify-center space-y-2 sm:space-y-3">
          {/* SAVE */}
          <span className="font-serif text-4xl sm:text-5xl md:text-6xl font-light tracking-[0.28em] pl-[0.28em] text-gray-900 leading-none">
            SAVE
          </span>

          {/* THE */}
          <span className="font-serif text-4xl sm:text-5xl md:text-6xl font-light tracking-[0.28em] pl-[0.28em] text-gray-900 leading-none">
            THE
          </span>

          {/* DATE */}
          <span className="font-serif text-4xl sm:text-5xl md:text-6xl font-light tracking-[0.28em] pl-[0.28em] text-gray-900 leading-none">
            DATE
          </span>
        </div>
      </div>

      {/* 
        3. BOTTOM: Date, Location & Invitation To Follow
        Matching "JANUARY 20, 2024 | STURBRIDGE, MA / INVITATION TO COME"
      */}
      <div className="relative z-10 text-center pb-2 sm:pb-4 flex flex-col items-center space-y-2">
        {/* Date & Location - Clean, Pure & Positioned */}
        <p 
          style={{ marginLeft: '42px', marginTop: '-22px', marginBottom: '50px' }}
          className="font-serif text-base sm:text-lg md:text-xl tracking-[0.32em] pl-[0.32em] uppercase text-gray-950 font-black py-1 ml-[42px] -mt-[22px] mb-[50px]"
        >
          DECEMBER 2, 2026 &nbsp;|&nbsp; GWALIOR, MP
        </p>

        {/* Invitation to Follow - Darkened & Highly Legible */}
        <p className="font-serif text-sm sm:text-base md:text-lg tracking-[0.36em] pl-[0.36em] uppercase text-gray-950 font-black">
          INVITATION TO FOLLOW
        </p>

        {/* Subtle scroll cue to continue to Indian wedding card */}
        <button
          type="button"
          onClick={scrollToInvitation}
          className="pt-6 inline-flex flex-col items-center gap-1 text-[9px] uppercase font-serif tracking-[0.25em] pl-[0.25em] text-gray-500 hover:text-[#5A0F2C] transition-colors cursor-pointer group"
          title="Continue to Wedding Invitation & Events"
        >
          <span>View Invitation</span>
          <ChevronDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
        </button>
      </div>
    </section>
  );
};
