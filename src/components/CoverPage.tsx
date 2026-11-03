import React from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';
import { WEDDING_CONFIG } from '../weddingConfig';

interface CoverPageProps {
  onContinue: () => void;
}

export const CoverPage: React.FC<CoverPageProps> = ({ onContinue }) => {
  const { couple } = WEDDING_CONFIG;

  return (
    <div className="relative w-full min-h-[92vh] sm:min-h-screen bg-[#FDFBF7] text-[#2C4A34] flex flex-col items-center justify-between overflow-hidden shadow-2xl">
      
      {/* 1. MUGHAL PALACE CARVED SANDSTONE ARCH (TOP & SIDES) */}
      <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between">
        {/* Top Arch SVG */}
        <svg
          viewBox="0 0 400 130"
          className="w-full h-auto drop-shadow-sm text-[#D8A682]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="sandstoneArch" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#DFB293" />
              <stop offset="50%" stopColor="#C99470" />
              <stop offset="100%" stopColor="#B37D57" />
            </linearGradient>
            <pattern id="jaliPattern" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="3" fill="#B37D57" fillOpacity="0.35" />
              <path d="M 0 10 L 20 10 M 10 0 L 10 20" stroke="#B37D57" strokeOpacity="0.25" strokeWidth="0.8" />
            </pattern>
          </defs>

          {/* Sandstone Header Band */}
          <rect x="0" y="0" width="400" height="130" fill="url(#sandstoneArch)" />
          <rect x="0" y="0" width="400" height="130" fill="url(#jaliPattern)" />

          {/* Cusped Mughal Cutout Opening */}
          <path
            d="M 24 130
               L 24 65
               C 40 65, 60 60, 80 50
               C 105 38, 120 30, 150 30
               C 175 30, 185 18, 198 4
               C 199 2, 201 2, 202 4
               C 215 18, 225 30, 250 30
               C 280 30, 295 38, 320 50
               C 340 60, 360 65, 376 65
               L 376 130
               L 400 130
               L 400 0
               L 0 0
               L 0 130
               Z"
            fill="#FDFBF7"
          />

          {/* Carved Border Outlines on Arch Edge */}
          <path
            d="M 24 130
               L 24 65
               C 40 65, 60 60, 80 50
               C 105 38, 120 30, 150 30
               C 175 30, 185 18, 198 4
               C 199 2, 201 2, 202 4
               C 215 18, 225 30, 250 30
               C 280 30, 295 38, 320 50
               C 340 60, 360 65, 376 65
               L 376 130"
            stroke="#9E6845"
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M 28 130
               L 28 67
               C 42 67, 62 62, 82 52
               C 107 40, 122 33, 150 33
               C 174 33, 184 21, 198 7
               C 199 5, 201 5, 202 7
               C 216 21, 226 33, 250 33
               C 278 33, 293 40, 318 52
               C 338 62, 358 67, 372 67
               L 372 130"
            stroke="#C99470"
            strokeWidth="1.5"
            strokeDasharray="2 2"
            fill="none"
          />
        </svg>

        {/* Left & Right Pillar Columns */}
        <div className="flex justify-between w-full h-full -mt-2 -mb-2">
          <div className="w-5 sm:w-8 h-full bg-gradient-to-r from-[#DFB293] to-[#B37D57] border-r border-[#9E6845]/40 opacity-90 shadow-sm" />
          <div className="w-5 sm:w-8 h-full bg-gradient-to-l from-[#DFB293] to-[#B37D57] border-l border-[#9E6845]/40 opacity-90 shadow-sm" />
        </div>

        {/* Bottom Base Border */}
        <div className="w-full h-4 bg-gradient-to-t from-[#B37D57] to-[#DFB293] border-t border-[#9E6845]/40" />
      </div>

      {/* 2. INNER CONTENT AREA */}
      <div className="relative z-20 w-full max-w-md mx-auto pt-10 sm:pt-14 pb-4 px-6 flex flex-col items-center text-center flex-1 justify-between">
        
        {/* TOP: GANESHA ICON & VAKRATUNDA SHLOKA (Dark Forest Green like image) */}
        <div className="flex flex-col items-center mt-2">
          
          {/* Artistic Lord Ganesha Outline */}
          <div className="w-12 h-12 text-[#264A2E] mb-1">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full stroke-current" strokeWidth="2.5" strokeLinecap="round">
              {/* Crown / Tilak */}
              <path d="M50 15 L52 24 L58 22 L54 28 L60 32 L50 35 L40 32 L46 28 L42 22 L48 24 Z" fill="currentColor" fillOpacity="0.2" />
              <circle cx="50" cy="20" r="2" fill="currentColor" stroke="none" />
              {/* Ears */}
              <path d="M38 32 C26 32 24 44 28 52 C32 58 38 56 40 50" />
              <path d="M62 32 C74 32 76 44 72 52 C68 58 62 56 60 50" />
              {/* Trunk with Modak sweep */}
              <path d="M46 38 C48 38 54 40 54 48 C54 60 42 62 42 70 C42 78 52 80 56 76 C59 73 59 68 56 66" strokeWidth="3" />
              <circle cx="56" cy="65" r="2.5" fill="currentColor" stroke="none" />
              {/* Auspicious Eyes */}
              <path d="M42 38 Q45 36 48 40" strokeWidth="1.8" />
              <path d="M58 38 Q55 36 52 40" strokeWidth="1.8" />
            </svg>
          </div>

          {/* Sanskrit Vakratunda Mahakaya Shloka */}
          <div className="font-hindi text-[#264A2E] font-semibold text-xs sm:text-[13px] leading-relaxed tracking-wide">
            <p>वक्रतुण्ड महाकाय सूर्यकोटि समप्रभः</p>
            <p className="mt-0.5">निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा</p>
          </div>
        </div>

        {/* CENTERPIECE: MUGHAL CUSPED GOLD CREST WITH BOTANICAL LEAVES & 'HS' MONOGRAM */}
        <div className="relative my-4 sm:my-6 flex items-center justify-center">
          
          {/* Watercolor Green Botanical Foliage & Red Berries (behind the crest) */}
          <div className="absolute -inset-4 sm:-inset-6 pointer-events-none select-none flex items-center justify-center">
            <svg viewBox="0 0 200 200" className="w-48 sm:w-56 h-48 sm:h-56" fill="none">
              {/* Left Foliage */}
              <path d="M40 70 C55 60 70 80 85 95 C65 95 45 85 40 70 Z" fill="#4B774E" fillOpacity="0.75" />
              <path d="M30 90 C45 80 65 100 80 115 C60 115 40 105 30 90 Z" fill="#6B966E" fillOpacity="0.8" />
              <path d="M45 110 C60 100 80 120 90 135 C70 135 55 125 45 110 Z" fill="#3D6340" fillOpacity="0.7" />
              
              {/* Right Red Berries & Sprig */}
              <path d="M135 70 C145 90 155 110 160 130" stroke="#7A8E77" strokeWidth="1.5" />
              <circle cx="140" cy="80" r="3" fill="#A83232" />
              <circle cx="152" cy="92" r="3.5" fill="#C43B3B" />
              <circle cx="145" cy="105" r="3" fill="#A83232" />
              <circle cx="158" cy="118" r="3.2" fill="#D44A4A" />
              <circle cx="150" cy="130" r="3" fill="#A83232" />
            </svg>
          </div>

          {/* Mughal Cusped Golden Medallion Shape */}
          <div className="relative w-32 h-44 sm:w-36 sm:h-48 flex items-center justify-center">
            <svg viewBox="0 0 140 190" className="w-full h-full drop-shadow-sm" fill="none">
              <path
                d="M 70 6 
                   C 78 18, 92 22, 102 32 
                   C 112 42, 116 56, 126 68 
                   C 134 78, 134 94, 134 105 
                   C 134 118, 126 132, 118 144 
                   C 108 156, 94 164, 82 174 
                   C 76 180, 72 186, 70 188 
                   C 68 186, 64 180, 58 174 
                   C 46 164, 32 156, 22 144 
                   C 14 132, 6 118, 6 105 
                   C 6 94, 6 78, 14 68 
                   C 24 56, 28 42, 38 32 
                   C 48 22, 62 18, 70 6 Z"
                fill="#FFFDF8"
                stroke="#C59B27"
                strokeWidth="2.5"
              />
              <path
                d="M 70 12 
                   C 76 22, 88 26, 98 35 
                   C 106 44, 110 56, 118 67 
                   C 126 77, 126 91, 126 102 
                   C 126 114, 118 126, 112 137 
                   C 102 148, 90 156, 79 165 
                   C 74 170, 71 176, 70 178 
                   C 69 176, 66 170, 61 165 
                   C 50 156, 38 148, 28 137 
                   C 22 126, 14 114, 14 102 
                   C 14 91, 14 77, 22 67 
                   C 30 56, 34 44, 42 35 
                   C 52 26, 64 22, 70 12 Z"
                stroke="#E5C365"
                strokeWidth="1"
                fill="none"
              />
            </svg>

            {/* Intertwined 'HS' Monogram (Harshul & Saloni) */}
            <div className="absolute inset-0 flex items-center justify-center select-none">
              <span className="font-english-heading text-5xl sm:text-6xl font-bold text-[#1D3B23] tracking-normal drop-shadow-xs">
                HS
              </span>
            </div>
          </div>
        </div>

        {/* NAMES & TAGLINE */}
        <div className="flex flex-col items-center">
          {/* Couple Names */}
          <h1 className="font-english-serif text-2xl sm:text-3xl font-semibold tracking-wider text-[#1C3621] uppercase flex items-center gap-2">
            <span>Harshul</span>
            <span className="font-script text-2xl sm:text-3xl text-[#C59B27] lowercase">&amp;</span>
            <span>Saloni</span>
          </h1>

          {/* Hindi Names Subtitle */}
          <p className="font-hindi text-xs sm:text-sm font-semibold text-[#8B5A2B] mt-0.5 tracking-wide">
            चि. हर्शुल संग सौ.कां. सलोनी
          </p>

          {/* Faith. Love. Us. */}
          <p className="font-script text-2xl sm:text-3xl text-[#264A2E] mt-3">
            Faith. Love. Us.
          </p>

          {/* Wedding Hashtag */}
          <p className="font-english-serif font-bold text-xs sm:text-sm tracking-[0.2em] text-[#1C3621] mt-0.5">
            #HARSHULSALONI
          </p>
        </div>

        {/* BOTTOM: TWO CAPARISONED ROYAL ELEPHANTS WITH LOTUSES & FOLIAGE */}
        <div className="w-full relative mt-3 sm:mt-5 pt-1">
          
          {/* Lush Green Lotus & Foliage Garden Banner */}
          <div className="relative w-full max-w-[340px] sm:max-w-[380px] mx-auto h-24 sm:h-28 flex items-end justify-center">
            
            {/* Left Caparisoned Elephant (Raised Trunk) */}
            <div className="absolute left-2 sm:left-4 bottom-0 w-28 sm:w-34 h-auto">
              <svg viewBox="0 0 140 100" fill="none" className="w-full h-auto">
                {/* Howdah / Gold cloth */}
                <path d="M50 30 C65 24 95 24 105 30 L108 55 C90 60 65 60 48 55 Z" fill="#D4AF37" stroke="#8C6511" strokeWidth="1.5" />
                <path d="M54 36 H102" stroke="#FFF" strokeWidth="1" strokeDasharray="2 2" />
                {/* Elephant Body */}
                <path d="M40 50 C40 38 60 32 90 32 C115 32 125 45 125 65 L125 88 L112 88 L112 78 L98 78 L98 88 L65 88 L65 78 L52 78 L52 88 L38 88 Z" fill="#4A4540" />
                {/* Head, Ear & Raised Trunk saluting */}
                <circle cx="36" cy="48" r="16" fill="#4A4540" />
                <path d="M30 40 C22 40 16 48 18 56 C20 62 26 62 30 56 Z" fill="#5E5852" stroke="#D4AF37" />
                {/* Raised Trunk */}
                <path d="M26 50 C15 48 10 35 14 22 C16 15 24 12 28 16" stroke="#4A4540" strokeWidth="7" strokeLinecap="round" />
                <circle cx="28" cy="16" r="3" fill="#D4AF37" />
                {/* White Tusk */}
                <path d="M25 56 C22 58 18 56 16 50" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round" />
                {/* Eye */}
                <circle cx="32" cy="44" r="1.5" fill="#000" />
                {/* Lotus Garlands on Elephant */}
                <circle cx="38" cy="30" r="5" fill="#E8839C" />
                <circle cx="46" cy="26" r="4" fill="#F4A6BA" />
              </svg>
            </div>

            {/* Right Caparisoned Elephant (Raised Trunk - Mirrored) */}
            <div className="absolute right-2 sm:right-4 bottom-0 w-28 sm:w-34 h-auto transform -scale-x-100">
              <svg viewBox="0 0 140 100" fill="none" className="w-full h-auto">
                {/* Howdah / Gold cloth */}
                <path d="M50 30 C65 24 95 24 105 30 L108 55 C90 60 65 60 48 55 Z" fill="#D4AF37" stroke="#8C6511" strokeWidth="1.5" />
                <path d="M54 36 H102" stroke="#FFF" strokeWidth="1" strokeDasharray="2 2" />
                {/* Elephant Body */}
                <path d="M40 50 C40 38 60 32 90 32 C115 32 125 45 125 65 L125 88 L112 88 L112 78 L98 78 L98 88 L65 88 L65 78 L52 78 L52 88 L38 88 Z" fill="#4A4540" />
                {/* Head, Ear & Raised Trunk saluting */}
                <circle cx="36" cy="48" r="16" fill="#4A4540" />
                <path d="M30 40 C22 40 16 48 18 56 C20 62 26 62 30 56 Z" fill="#5E5852" stroke="#D4AF37" />
                {/* Raised Trunk */}
                <path d="M26 50 C15 48 10 35 14 22 C16 15 24 12 28 16" stroke="#4A4540" strokeWidth="7" strokeLinecap="round" />
                <circle cx="28" cy="16" r="3" fill="#D4AF37" />
                {/* White Tusk */}
                <path d="M25 56 C22 58 18 56 16 50" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round" />
                {/* Eye */}
                <circle cx="32" cy="44" r="1.5" fill="#000" />
                {/* Lotus Garlands on Elephant */}
                <circle cx="38" cy="30" r="5" fill="#E8839C" />
                <circle cx="46" cy="26" r="4" fill="#F4A6BA" />
              </svg>
            </div>

            {/* Pink Lotus Blossoms & Foliage at Bottom Center */}
            <div className="z-10 flex items-center justify-center gap-1 -mb-1">
              <span className="text-xl sm:text-2xl">🌸</span>
              <span className="text-2xl sm:text-3xl -mb-1">🪷</span>
              <span className="text-xl sm:text-2xl">🌸</span>
            </div>
          </div>

          {/* VIEW WEDDING INVITATION ACTION BUTTON */}
          <div className="mt-3 text-center">
            <button
              type="button"
              onClick={onContinue}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full 
                         bg-gradient-to-r from-[#264A2E] via-[#1D3B23] to-[#264A2E] hover:from-[#1D3B23] hover:to-[#132817] 
                         text-[#FFE8B5] border-2 border-[#C59B27] shadow-[0_4px_16px_rgba(38,74,46,0.35)] 
                         font-english-serif text-xs sm:text-sm font-bold tracking-widest uppercase transition-all 
                         transform active:scale-95 cursor-pointer min-h-[44px]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F0CE7A]" />
              <span>View Full Invitation • निमंत्रण देखें</span>
              <ArrowDown className="w-4 h-4 text-[#F0CE7A] animate-bounce" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
