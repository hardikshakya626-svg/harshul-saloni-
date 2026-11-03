import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  Copy, 
  Check, 
  ExternalLink 
} from 'lucide-react';
import { SwastikMotif } from './OrnamentalIcons';

interface VenueLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  mapQuery: string;
  embedQuery: string;
  directionsUrl: string;
}

const VENUES: VenueLocation[] = [
  {
    id: 'resort',
    name: 'Imperial Golf Resort',
    address: 'NH-44, Rairu Dabra Bypass Road',
    city: 'Gwalior, Madhya Pradesh - 474010',
    mapQuery: 'Imperial Golf Resort Gwalior',
    embedQuery: 'Imperial+Golf+Resort+Gwalior+NH-44',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Imperial+Golf+Resort+Gwalior',
  },
  {
    id: 'residence',
    name: 'Saraf Residence, Orchid Tower',
    address: 'Flat No. 807, A-Block, Orchid Tower, Maharana Pratap Nagar',
    city: 'Gwalior, Madhya Pradesh - 474002',
    mapQuery: 'Orchid Tower Maharana Pratap Nagar Gwalior',
    embedQuery: 'Orchid+Tower+Maharana+Pratap+Nagar+Gwalior',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Orchid+Tower+Maharana+Pratap+Nagar+Gwalior',
  },
];

export const VenueLocationMapSection: React.FC = () => {
  const [activeVenueId, setActiveVenueId] = useState<string>('resort');
  const [copiedAddress, setCopiedAddress] = useState(false);

  const activeVenue = VENUES.find((v) => v.id === activeVenueId) || VENUES[0];

  const handleCopyAddress = async () => {
    const fullText = `${activeVenue.name}, ${activeVenue.address}, ${activeVenue.city}`;
    try {
      await navigator.clipboard.writeText(fullText);
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2400);
    } catch {
      // Fallback
    }
  };

  return (
    <section className="relative w-full bg-rose-damask pt-9 sm:pt-12 pb-16 sm:pb-24 px-4 sm:px-6 select-none">
      <div className="relative max-w-xl mx-auto flex flex-col items-center">
        
        {/* Section Header - Just Wedding Venue */}
        <div className="text-center mb-5 sm:mb-6">
          <div className="inline-flex items-center justify-center gap-2 mb-1.5">
            <span className="w-6 sm:w-8 h-[1px] bg-gradient-to-r from-transparent to-[#F0CE7A]" />
            <SwastikMotif className="w-3.5 h-3.5 text-[#F0CE7A]" />
            <span className="font-serif tracking-[0.3em] pl-[0.3em] text-[10px] sm:text-xs text-[#FFE8B5] uppercase font-medium">
              Location &amp; Directions
            </span>
            <SwastikMotif className="w-3.5 h-3.5 text-[#F0CE7A]" />
            <span className="w-6 sm:w-8 h-[1px] bg-gradient-to-l from-transparent to-[#F0CE7A]" />
          </div>

          <h2 className="font-script text-4xl sm:text-5xl md:text-6xl text-[#FFF8EB] drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)] leading-tight py-0.5">
            Wedding Venue
          </h2>
        </div>

        {/* Venue Selector Tabs */}
        <div className="w-full flex rounded-xl p-1 bg-black/35 border border-[#D4AF37]/30 mb-5 backdrop-blur-xs">
          {VENUES.map((venue) => {
            const isSelected = venue.id === activeVenueId;
            return (
              <button
                key={venue.id}
                type="button"
                onClick={() => {
                  setActiveVenueId(venue.id);
                  setCopiedAddress(false);
                }}
                className={`flex-1 py-2.5 px-3 rounded-lg text-center transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-b from-[#FFFDF9] to-[#F7EFE1] text-[#6E0D2B] shadow-md border border-[#D4AF37]'
                    : 'text-[#E8D3B9]/80 hover:text-[#FFF8EB] hover:bg-white/[0.04]'
                }`}
              >
                <span className={`text-sm sm:text-base font-serif font-extrabold tracking-wide leading-tight block ${isSelected ? 'text-[#6E0D2B]' : 'text-[#FFE8B5]'}`}>
                  {venue.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Clean Venue Card */}
        <div className="w-full rounded-2xl bg-gradient-to-b from-[#FFFDF9] via-[#FCF9F3] to-[#F7F1E6] shadow-[0_16px_40px_rgba(30,3,13,0.35)] border border-[#E7D6B8] overflow-hidden">
          
          {/* Interactive Embedded Map Container */}
          <div className="relative w-full h-64 sm:h-72 bg-[#EFE9DF] border-b border-[#E7D6B8]">
            <iframe
              title={`Map of ${activeVenue.name}`}
              src={`https://maps.google.com/maps?q=${activeVenue.embedQuery}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full filter saturate-[1.1] contrast-[1.02]"
            />

            {/* Overlay Pin Chip */}
            <div className="absolute top-3 left-3 bg-[#4A0E2E]/90 text-white backdrop-blur-xs border border-[#D4AF37]/50 rounded-lg px-3 py-1.5 shadow-md flex items-center gap-1.5 pointer-events-none">
              <MapPin className="w-4 h-4 text-[#F0CE7A]" />
              <span className="font-serif text-xs sm:text-sm font-bold tracking-wide text-[#FFE8B5]">
                {activeVenue.name}
              </span>
            </div>
          </div>

          {/* Clean Venue Info & Actions */}
          <div className="p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-black text-[#6E0D2B] leading-snug">
                  {activeVenue.name}
                </h3>
                <div className="flex items-start gap-2 mt-2 text-base sm:text-lg text-[#2A1B12] font-serif font-bold">
                  <MapPin className="w-4.5 h-4.5 text-[#881337] flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">
                    {activeVenue.address}, {activeVenue.city}
                  </span>
                </div>
              </div>

              {/* Copy Address Button */}
              <button
                type="button"
                onClick={handleCopyAddress}
                className="self-start inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#881337]/[0.08] hover:bg-[#881337]/[0.15] text-[#881337] text-xs sm:text-sm font-serif font-bold border border-[#881337]/20 transition-colors cursor-pointer"
              >
                {copiedAddress ? (
                  <>
                    <Check className="w-4 h-4 text-green-700" />
                    <span className="text-green-800 font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Address</span>
                  </>
                )}
              </button>
            </div>

            {/* Direct Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              <a
                href={activeVenue.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#7A0C2E] via-[#8E1438] to-[#7A0C2E] text-white font-serif text-xs sm:text-sm font-bold tracking-wider uppercase text-center shadow-md hover:shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2"
              >
                <Navigation className="w-4 h-4 text-[#F0CE7A]" />
                <span>Get Driving Directions</span>
              </a>

              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(activeVenue.mapQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-[#F9F5EE] text-[#7A0C2E] border border-[#D4AF37]/70 font-serif text-xs font-semibold tracking-wide text-center shadow-xs transition-all flex items-center justify-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#7A0C2E]" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
