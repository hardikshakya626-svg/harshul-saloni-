import React from 'react';
import { WEDDING_CONFIG } from '../weddingConfig';
import {
  GaneshMotif,
  GranthiBandhanIcon,
  SwastikMotif,
} from './OrnamentalIcons';

export const HeroSection: React.FC = () => {
  const { couple, religiousInvocations } = WEDDING_CONFIG;

  return (
    <section id="invitation-hero" className="relative w-full bg-rose-damask py-8 sm:py-12 px-4 sm:px-6 overflow-hidden">
      
      {/* Outer ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(240,206,122,0.15)_0%,transparent_70%)] pointer-events-none" />

      {/* Main Invitation Card Container */}
      <div className="relative max-w-lg mx-auto">
        
        {/* Sacred Ganesha Invocation Top Crest */}
        <div className="relative z-10 flex flex-col items-center justify-center -mb-3 sm:-mb-4">
          <div className="relative px-5 py-1.5 rounded-full bg-gradient-to-r from-[#800D2A] via-[#9B1235] to-[#800D2A] shadow-[0_4px_16px_rgba(0,0,0,0.35)] flex items-center gap-2 border border-[#F0CE7A]/30">
            <SwastikMotif className="w-3 h-3 text-[#F0CE7A]" />
            <h2 className="font-hindi text-[11px] sm:text-xs font-bold tracking-widest text-[#FFE8B5] uppercase">
              {religiousInvocations.ganeshHeading}
            </h2>
            <SwastikMotif className="w-3 h-3 text-[#F0CE7A]" />
          </div>
        </div>

        {/* EDITORIAL ROYAL BODY (Crisp White Cardstock, Soft Rounded Corners, Lineless) */}
        <div
          className="relative rounded-2xl sm:rounded-3xl bg-white 
                     shadow-[0_16px_50px_rgba(0,0,0,0.32)] p-5 sm:p-8 pt-7 sm:pt-9 overflow-hidden border border-gray-100"
        >
          {/* Subtle paper grain texture */}
          <div className="absolute inset-0 opacity-[0.025] bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          <div className="relative flex flex-col items-center text-center">
            
            {/* Sacred Lord Ganesha Motif */}
            <div className="my-1 relative">
              <div className="absolute inset-0 bg-[#F0CE7A]/20 rounded-full blur-sm" />
              <GaneshMotif size={48} className="relative w-11 h-11 sm:w-12 sm:h-12 mx-auto gold-glow" />
            </div>


            {/* Invitation Preamble (Easy, Warm English) */}
            <div className="my-3 max-w-sm">
              <p className="font-serif text-xs uppercase tracking-[0.22em] text-[#9B1235] font-semibold">
                {religiousInvocations.invitationPreamble[0]}
              </p>
              <p className="font-serif text-sm sm:text-base text-[#5A0F2C] mt-1 leading-relaxed">
                {religiousInvocations.invitationPreamble[1]}
              </p>
            </div>

            {/* COUPLE SHOWCASE (Lineless Clean Backplate) */}
            <div className="w-full my-3 py-4 sm:py-5 px-4 rounded-xl bg-[#F9FAFB]">
              
              {/* GROOM (Harshul) */}
              <div className="flex flex-col items-center justify-center text-center">
                <h3 className="font-script text-4xl sm:text-5xl text-[#9B1235] leading-none drop-shadow-xs">
                  {couple.groom.nameEnglish}
                </h3>
                
                <div className="mt-1.5">
                  <p className="font-serif text-xs sm:text-sm text-[#5A0F2C]">
                    {couple.groom.relationEnglish}{' '}
                    <span className="font-semibold text-[#9B1235]">{couple.groom.parentsEnglish}</span>
                  </p>
                </div>
              </div>

              {/* AMPERSAND */}
              <div className="flex items-center justify-center my-2">
                <span className="font-script text-2xl sm:text-3xl text-[#C9962B] italic leading-none px-2">
                  &amp;
                </span>
              </div>

              {/* BRIDE (Saloni) */}
              <div className="flex flex-col items-center justify-center text-center">
                <h3 className="font-script text-4xl sm:text-5xl text-[#9B1235] leading-none drop-shadow-xs">
                  {couple.bride.nameEnglish}
                </h3>

                <div className="mt-1.5">
                  <p className="font-serif text-xs sm:text-sm text-[#5A0F2C]">
                    {couple.bride.relationEnglish}{' '}
                    <span className="font-semibold text-[#9B1235]">{couple.bride.parentsEnglish}</span>
                  </p>
                </div>
              </div>

            </div>


            {/* Blessing Sentence (Matching font-serif with preamble) */}
            <p className="font-serif text-[#5A0F2C] text-sm sm:text-base leading-relaxed max-w-sm my-2">
              {religiousInvocations.blessingText}
            </p>

            {/* Date & Venue Tag */}
            <div className="mt-4 pt-3.5 w-full border-t border-gray-100 flex items-center justify-center gap-2">
              <GranthiBandhanIcon className="w-5 h-5 text-[#9B1235]" />
              <span className="font-serif text-base sm:text-lg md:text-xl font-black text-[#800D2A] tracking-wide">
                Wednesday, 2 December 2026 • Imperial Golf Resort, Gwalior
              </span>
              <GranthiBandhanIcon className="w-5 h-5 text-[#9B1235]" />
            </div>

          </div>
        </div>

      </div>

    </section>
  );
};
