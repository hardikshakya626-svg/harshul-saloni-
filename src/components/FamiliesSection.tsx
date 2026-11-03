import React from 'react';
import { Heart } from 'lucide-react';
import { WEDDING_CONFIG } from '../weddingConfig';
import { SwastikMotif, BaraatProcessionBanner } from './OrnamentalIcons';

export const FamiliesSection: React.FC = () => {
  const { families } = WEDDING_CONFIG;

  return (
    <section className="relative w-full bg-rose-damask py-9 sm:py-12 px-4 sm:px-6">
      <div className="max-w-xl mx-auto">
        {/* Section Heading with Grand Luxury Cursive Heading */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center gap-2.5 mb-2">
            <span className="w-6 sm:w-8 h-[1px] bg-gradient-to-r from-transparent to-[#F0CE7A]" />
            <SwastikMotif className="w-4 h-4 text-[#F0CE7A]" />
            <span className="font-serif tracking-[0.3em] pl-[0.3em] text-xs sm:text-sm text-[#FFE8B5] uppercase font-bold">
              With Love &amp; Respect
            </span>
            <SwastikMotif className="w-4 h-4 text-[#F0CE7A]" />
            <span className="w-6 sm:w-8 h-[1px] bg-gradient-to-l from-transparent to-[#F0CE7A]" />
          </div>

          <h2 className="font-script text-5xl sm:text-6xl md:text-7xl text-[#FFF8EB] drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)] leading-tight py-1">
            Our Families
          </h2>

          <p className="font-serif italic text-sm sm:text-base text-[#FFE8B5]/90 tracking-wide mt-1 font-medium">
            United in love and tradition to celebrate this sacred union
          </p>
        </div>

        {/* Redesigned Luxury Family Division */}
        <div
          className="relative rounded-2xl bg-gradient-to-b from-[#FFFDF9] via-[#FCF9F3] to-[#F7F1E6] 
                     shadow-[0_16px_45px_rgba(61,12,30,0.24)] p-5 sm:p-7 overflow-hidden border border-[#E7D6B8]"
        >
          {/* Delicate Inset Gold Accent Border */}
          <div className="absolute inset-1.5 sm:inset-2 rounded-xl border border-[#D4AF37]/25 pointer-events-none" />

          <div className="relative space-y-6 sm:space-y-7">
            
            {/* GROOM'S FAMILY CARD */}
            <div className="relative rounded-xl bg-white/70 backdrop-blur-xs p-4.5 sm:p-6 border border-[#E7D6B8]/80 shadow-[0_4px_16px_rgba(122,12,46,0.06)] text-center">
              {/* Family Side Badge */}
              <div className="inline-block px-3.5 py-1 rounded-full bg-[#881337]/[0.08] border border-[#881337]/20 mb-2">
                <span className="font-serif text-xs sm:text-sm font-bold text-[#881337] tracking-[0.16em] uppercase">
                  {families.groomSide.sideLabel}
                </span>
              </div>

              {/* Groom's Name in Grand Luxury Cursive */}
              <h3 className="font-script text-4xl sm:text-5xl text-[#7A0C2E] leading-tight drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] font-bold">
                {families.groomSide.childTitleAndName}
              </h3>

              {/* Delicate Gold Flourish Divider */}
              <div className="flex items-center justify-center gap-2 my-2.5">
                <span className="w-8 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent" />
                <span className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37] rounded-[0.5px]" />
                <span className="w-8 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent" />
              </div>

              {/* Details in Luxury Serif */}
              <div className="space-y-2 text-sm sm:text-base font-serif text-[#4A3B32]">
                <p className="leading-snug">
                  <span className="font-bold text-[#72102E]">{families.groomSide.grandparentsLabel}: </span>
                  <span className="text-[#3A2A2E] font-medium">{families.groomSide.grandparents}</span>
                </p>
                <p className="leading-snug">
                  <span className="font-bold text-[#72102E]">{families.groomSide.parentsLabel}: </span>
                  <span className="text-[#3A2A2E] font-medium">{families.groomSide.parents}</span>
                </p>
                <p className="leading-snug text-xs sm:text-sm text-[#6E5D61] pt-0.5">
                  <span className="font-bold text-[#72102E]">{families.groomSide.residenceLabel}: </span>
                  <span className="font-medium">{families.groomSide.residence}</span>
                </p>
              </div>
            </div>

            {/* Elegant Golden Union Motif Divider */}
            <div className="flex items-center justify-center gap-3 my-1">
              <span className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
              <div className="w-8 h-8 rounded-full bg-[#881337]/[0.08] border border-[#D4AF37]/40 flex items-center justify-center shadow-xs">
                <Heart className="w-4 h-4 text-[#9B1235] fill-[#9B1235]/60" />
              </div>
              <span className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-[#D4AF37]/50 to-transparent" />
            </div>

            {/* BRIDE'S FAMILY CARD */}
            <div className="relative rounded-xl bg-white/70 backdrop-blur-xs p-4.5 sm:p-6 border border-[#E7D6B8]/80 shadow-[0_4px_16px_rgba(122,12,46,0.06)] text-center">
              {/* Family Side Badge */}
              <div className="inline-block px-3.5 py-1 rounded-full bg-[#881337]/[0.08] border border-[#881337]/20 mb-2">
                <span className="font-serif text-xs sm:text-sm font-bold text-[#881337] tracking-[0.16em] uppercase">
                  {families.brideSide.sideLabel}
                </span>
              </div>

              {/* Bride's Name in Grand Luxury Cursive */}
              <h3 className="font-script text-4xl sm:text-5xl text-[#7A0C2E] leading-tight drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] font-bold">
                {families.brideSide.childTitleAndName}
              </h3>

              {/* Delicate Gold Flourish Divider */}
              <div className="flex items-center justify-center gap-2 my-2.5">
                <span className="w-8 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent" />
                <span className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37] rounded-[0.5px]" />
                <span className="w-8 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent" />
              </div>

              {/* Details in Luxury Serif */}
              <div className="space-y-2 text-sm sm:text-base font-serif text-[#4A3B32]">
                <p className="leading-snug">
                  <span className="font-bold text-[#72102E]">{families.brideSide.grandparentsLabel}: </span>
                  <span className="text-[#3A2A2E] font-medium">{families.brideSide.grandparents}</span>
                </p>
                <p className="leading-snug">
                  <span className="font-bold text-[#72102E]">{families.brideSide.parentsLabel}: </span>
                  <span className="text-[#3A2A2E] font-medium">{families.brideSide.parents}</span>
                </p>
                <p className="leading-snug text-xs sm:text-sm text-[#6E5D61] pt-0.5">
                  <span className="font-bold text-[#72102E]">{families.brideSide.residenceLabel}: </span>
                  <span className="font-medium">{families.brideSide.residence}</span>
                </p>
              </div>
            </div>

            {/* Traditional Festive Baraat Banner */}
            <div className="pt-2">
              <BaraatProcessionBanner className="w-full max-w-sm mx-auto opacity-90" />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
