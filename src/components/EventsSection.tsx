import React from 'react';
import { Clock, MapPin } from 'lucide-react';
import { WEDDING_CONFIG } from '../weddingConfig';
import { SwastikMotif } from './OrnamentalIcons';

export const EventsSection: React.FC = () => {
  const { primaryEvents, footer } = WEDDING_CONFIG;

  return (
    <section className="relative w-full bg-rose-damask py-9 sm:py-12 px-4 sm:px-6">
      <div className="max-w-xl mx-auto">
        {/* Section Header with Grand Luxury Cursive Heading */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center gap-2.5 mb-2">
            <span className="w-6 sm:w-8 h-[1px] bg-gradient-to-r from-transparent to-[#F0CE7A]" />
            <SwastikMotif className="w-3.5 h-3.5 text-[#F0CE7A]" />
            <span className="font-serif tracking-[0.3em] pl-[0.3em] text-[10px] sm:text-xs text-[#FFE8B5] uppercase font-medium">
              Auspicious Occasions
            </span>
            <SwastikMotif className="w-3.5 h-3.5 text-[#F0CE7A]" />
            <span className="w-6 sm:w-8 h-[1px] bg-gradient-to-l from-transparent to-[#F0CE7A]" />
          </div>

          <h2 className="font-script text-4xl sm:text-5xl md:text-6xl text-[#FFF8EB] drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)] leading-tight py-1">
            Wedding Celebrations
          </h2>

          <p className="font-serif italic text-xs sm:text-sm text-[#FFE8B5]/85 tracking-wide mt-1">
            We warmly invite you to join us in these joyful festivities
          </p>
        </div>

        {/* Luxury Invitation Event Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4.5 sm:gap-6">
          {primaryEvents.map((ev) => (
            <div
              key={ev.id}
              className="relative rounded-2xl bg-gradient-to-b from-[#FFFDF9] via-[#FCF9F3] to-[#F7F1E6] 
                         shadow-[0_14px_35px_rgba(61,12,30,0.22)] p-5 sm:p-6 flex flex-col justify-between 
                         overflow-hidden border border-[#E7D6B8] hover:shadow-[0_18px_42px_rgba(61,12,30,0.32)] 
                         transition-all duration-300 [&:last-child:nth-child(odd)]:sm:col-span-2"
            >
              {/* Delicate Inset Gold Accent Border */}
              <div className="absolute inset-1.5 rounded-xl border border-[#D4AF37]/25 pointer-events-none" />

              <div className="relative">
                {/* Event Title in Grand Luxury Cursive Font */}
                <div className="text-center pt-1 pb-1">
                  <h3 className="font-script text-4xl sm:text-5xl text-[#7A0C2E] font-bold leading-tight drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
                    {ev.title}
                  </h3>

                  {/* Delicate Gold Flourish Divider */}
                  <div className="flex items-center justify-center gap-2 my-2.5">
                    <span className="w-8 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/80 to-transparent" />
                    <span className="w-2 h-2 rotate-45 bg-[#D4AF37] rounded-[0.5px]" />
                    <span className="w-8 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/80 to-transparent" />
                  </div>
                </div>

                {/* Date Highlight Badge (Ultra Legible & Large) */}
                <div className="flex justify-center mb-3.5">
                  <span className="inline-block px-5 py-1.5 rounded-full bg-[#881337]/[0.1] border border-[#881337]/30 font-serif text-base sm:text-lg font-black text-[#7A0C2E] tracking-wide shadow-xs">
                    {ev.date}
                  </span>
                </div>

                {/* Time & Venue Information (Large & High Contrast) */}
                <div className="space-y-3 text-center font-serif">
                  <div className="flex items-center justify-center gap-2 text-[#3A2B22]">
                    <Clock className="w-5 h-5 text-[#B45309] flex-shrink-0" />
                    <span className="font-black text-base sm:text-lg text-[#3A2B22]">{ev.time}</span>
                  </div>

                  <div className="pt-3 border-t border-[#E8DCC8] flex flex-col items-center">
                    <div className="flex items-center justify-center gap-2 text-[#72102E] mb-1">
                      <MapPin className="w-5 h-5 text-[#9B1235] flex-shrink-0" />
                      <p className="font-serif font-black text-lg sm:text-xl md:text-2xl leading-snug text-[#72102E]">
                        {ev.venue}
                      </p>
                    </div>
                    <p className="font-serif font-bold text-sm sm:text-base text-[#4A3B32] leading-relaxed px-1">
                      {ev.venueAddress}
                    </p>
                  </div>
                </div>

                {/* Event Description (Clear & Legible) */}
                <p className="font-serif italic text-sm sm:text-base text-[#3A2B22] font-medium mt-3.5 pt-3 border-t border-[#E8DCC8] leading-relaxed text-center px-1">
                  "{ev.description}"
                </p>
              </div>

              {/* Action Button */}
              <div className="mt-4 pt-3.5 border-t border-[#E8DCC8] relative z-10">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(ev.mapQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#7A0C2E] via-[#8E1438] to-[#7A0C2E] 
                             hover:from-[#660925] hover:to-[#7A0C2E] text-[#FFF9F0] 
                             text-sm sm:text-base font-serif tracking-[0.14em] uppercase font-bold flex items-center justify-center 
                             gap-2 shadow-[0_3px_10px_rgba(122,12,46,0.22)] border border-[#F0CE7A]/35 transition-all duration-200 group min-h-[42px]"
                >
                  <MapPin className="w-4.5 h-4.5 text-[#F0CE7A] group-hover:scale-110 transition-transform" />
                  <span>View Location</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Clean Venue Anchor Note in Luxury Styling */}
        <div className="mt-8 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 px-6 py-3.5 rounded-full bg-black/35 backdrop-blur-xs border border-[#F0CE7A]/40 text-sm sm:text-base text-[#FFFDF8] font-serif shadow-sm">
            <span className="font-bold text-[#F0CE7A] uppercase tracking-wider text-xs sm:text-sm">
              Main Wedding Venue:
            </span>
            <span className="text-[#FFF8EB] font-bold tracking-wide text-sm sm:text-base">
              {footer.venueName}, {footer.venueLocation}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
