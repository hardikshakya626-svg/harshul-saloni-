import React from 'react';

/**
 * Traditional Gold Ganesh Motif
 * Based on authentic Indian wedding card iconography
 */
export const GaneshMotif: React.FC<{ className?: string; size?: number }> = ({
  className = "w-16 h-16",
  size = 64,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Lord Ganesha Motif"
    >
      <defs>
        <linearGradient id="goldGradGanesh" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF2D1" />
          <stop offset="35%" stopColor="#E2B755" />
          <stop offset="70%" stopColor="#C9962B" />
          <stop offset="100%" stopColor="#8A5A11" />
        </linearGradient>
      </defs>
      {/* Crown / Mukut */}
      <path
        d="M50 10 L54 22 L63 20 L57 28 L66 32 L53 35 L50 25 L47 35 L34 32 L43 28 L37 20 L46 22 Z"
        fill="url(#goldGradGanesh)"
      />
      <circle cx="50" cy="18" r="2.5" fill="#9B1235" />
      {/* Tilak / Trishul */}
      <path
        d="M48 27 Q50 24 52 27 L51 34 Q50 35 49 34 Z"
        fill="#9B1235"
      />
      <circle cx="50" cy="37" r="1.5" fill="#9B1235" />
      {/* Forehead & Ears */}
      <path
        d="M38 34 C25 34 20 44 24 55 C27 62 33 62 36 57"
        stroke="url(#goldGradGanesh)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M62 34 C75 34 80 44 76 55 C73 62 67 62 64 57"
        stroke="url(#goldGradGanesh)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Trunk (Sondh) sweeping gracefully to left with Modak */}
      <path
        d="M45 42 C48 42 55 44 55 52 C55 64 42 66 42 74 C42 82 52 83 56 80 C60 77 60 72 56 70"
        stroke="url(#goldGradGanesh)"
        strokeWidth="3.6"
        strokeLinecap="round"
      />
      {/* Modak on trunk */}
      <ellipse cx="57" cy="69" rx="3" ry="4" fill="url(#goldGradGanesh)" />
      {/* Eyes & Brow */}
      <path d="M40 40 Q44 38 48 42" stroke="url(#goldGradGanesh)" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M60 40 Q56 38 52 42" stroke="url(#goldGradGanesh)" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="43" cy="42" r="1.2" fill="#5A0F2C" />
      <circle cx="57" cy="42" r="1.2" fill="#5A0F2C" />
      {/* Tusk (Dant) */}
      <path d="M60 52 L65 53" stroke="url(#goldGradGanesh)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M40 52 L36 54" stroke="url(#goldGradGanesh)" strokeWidth="1.8" strokeLinecap="round" />
      {/* Lotus base petals */}
      <path
        d="M34 85 C42 80 46 84 50 82 C54 84 58 80 66 85 C60 90 40 90 34 85 Z"
        fill="url(#goldGradGanesh)"
      />
    </svg>
  );
};

/**
 * Traditional Swastik motif as on the client's PDF
 */
export const SwastikMotif: React.FC<{ className?: string; size?: number }> = ({
  className = "w-5 h-5",
  size = 20,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="square"
    strokeLinejoin="miter"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 4V20 M4 12H20 M12 4H20 M12 20H4 M4 12V4 M20 12V20" />
    <circle cx="7.5" cy="7.5" r="0.9" fill="currentColor" stroke="none" />
    <circle cx="16.5" cy="7.5" r="0.9" fill="currentColor" stroke="none" />
    <circle cx="7.5" cy="16.5" r="0.9" fill="currentColor" stroke="none" />
    <circle cx="16.5" cy="16.5" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);

/**
 * Detailed Gold Floral Pillar with Birds (Peacocks)
 * Matching the exact design of the template image pillars flanking the hero arch.
 */
export const GoldFloralPillar: React.FC<{
  isMirrored?: boolean;
  className?: string;
}> = ({ isMirrored = false, className = "w-16 md:w-24 h-full" }) => {
  return (
    <div
      className={`relative select-none pointer-events-none transition-transform duration-300 ${
        isMirrored ? "-scale-x-100" : ""
      } ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 140 700"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(201,150,43,0.35)]"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id={`goldGradPillar_${isMirrored ? 'm' : 'o'}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF4D0" />
            <stop offset="25%" stopColor="#F5D77F" />
            <stop offset="55%" stopColor="#D4AF37" />
            <stop offset="85%" stopColor="#AA771C" />
            <stop offset="100%" stopColor="#7E530F" />
          </linearGradient>
          <linearGradient id={`goldGradBright_${isMirrored ? 'm' : 'o'}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D4AF37" />
            <stop offset="50%" stopColor="#FFF9E6" />
            <stop offset="100%" stopColor="#D4AF37" />
          </linearGradient>
        </defs>

        {/* TOP ORNATE CROWN FINIAL */}
        <g stroke={`url(#goldGradPillar_${isMirrored ? 'm' : 'o'})`} strokeWidth="1.8" fill="none">
          {/* Top pinnacle */}
          <path d="M70 12 L73 28 L80 32 L74 38 L84 46 L70 54 L56 46 L66 38 L60 32 L67 28 Z" fill={`url(#goldGradPillar_${isMirrored ? 'm' : 'o'})`} fillOpacity="0.25" />
          <circle cx="70" cy="8" r="4.5" fill={`url(#goldGradBright_${isMirrored ? 'm' : 'o'})`} />
          <path d="M70 2 M70 14" strokeWidth="2.5" />

          {/* Upper Tier Floral Arch & Lotus */}
          <path d="M40 72 C55 58 85 58 100 72 C108 80 114 96 110 110 C105 125 90 134 70 136 C50 134 35 125 30 110 C26 96 32 80 40 72 Z" strokeWidth="2" />
          
          {/* Filigree scrolls inside upper tier */}
          <path d="M70 65 C60 80 50 95 44 112 C52 118 64 122 70 128 C76 122 88 118 96 112 C90 95 80 80 70 65 Z" fill={`url(#goldGradPillar_${isMirrored ? 'm' : 'o'})`} fillOpacity="0.18" />
          <circle cx="70" cy="98" r="5" fill={`url(#goldGradBright_${isMirrored ? 'm' : 'o'})`} />
          <path d="M52 86 C58 92 62 102 60 110" />
          <path d="M88 86 C82 92 78 102 80 110" />

          {/* Floral Petal Ring 1 */}
          <path d="M26 142 C40 138 100 138 114 142 L110 152 C90 148 50 148 30 152 Z" fill={`url(#goldGradPillar_${isMirrored ? 'm' : 'o'})`} fillOpacity="0.3" strokeWidth="2" />
          <circle cx="70" cy="146" r="2.5" fill="#FFF8E7" />
          <circle cx="50" cy="146" r="2" fill="#FFF8E7" />
          <circle cx="90" cy="146" r="2" fill="#FFF8E7" />

          {/* MIDDLE COLUMN - INTRICATE JALI & ROPE LATTICE */}
          <rect x="36" y="156" width="68" height="18" rx="3" strokeWidth="2" fill={`url(#goldGradPillar_${isMirrored ? 'm' : 'o'})`} fillOpacity="0.15" />
          <path d="M42 165 H98" strokeDasharray="3 3" />

          {/* Main Tiered Vase / Urn section */}
          <path d="M34 180 C26 210 24 240 38 270 C48 290 62 298 70 300 C78 298 92 290 102 270 C116 240 114 210 106 180 Z" strokeWidth="2.2" />
          
          {/* Detailed Acanthus / Paisley carvings inside Urn */}
          <path d="M70 186 C64 210 50 240 46 265 C56 276 66 284 70 292 C74 284 84 276 94 265 C90 240 76 210 70 186 Z" fill={`url(#goldGradPillar_${isMirrored ? 'm' : 'o'})`} fillOpacity="0.22" />
          <path d="M50 200 C60 216 65 240 60 258" />
          <path d="M90 200 C80 216 75 240 80 258" />
          <circle cx="70" cy="240" r="6" fill={`url(#goldGradBright_${isMirrored ? 'm' : 'o'})`} />
          <circle cx="70" cy="240" r="2" fill="#9B1235" />

          {/* Middle Decorative Ring */}
          <path d="M28 306 C42 302 98 302 112 306 L108 318 C92 314 48 314 32 318 Z" fill={`url(#goldGradPillar_${isMirrored ? 'm' : 'o'})`} fillOpacity="0.3" strokeWidth="2" />

          {/* LOWER SECTION: ROYAL BIRDS (PEACOCKS) FLANKING PEDESTAL */}
          {/* Left Facing Peacock / Bird */}
          <g>
            {/* Crown crest */}
            <path d="M34 330 L31 322 M34 330 L36 320 M34 330 L40 323" strokeWidth="1.5" />
            <circle cx="31" cy="321" r="1.2" fill="#FFF8E7" />
            <circle cx="36" cy="319" r="1.2" fill="#FFF8E7" />
            <circle cx="40" cy="322" r="1.2" fill="#FFF8E7" />
            {/* Head and arched neck */}
            <path d="M36 332 C38 330 42 333 43 337 C44 345 38 352 35 360 C32 370 34 382 42 390 C46 394 54 398 62 400" strokeWidth="2.2" />
            {/* Beak */}
            <path d="M43 334 L48 335 L43 337" fill={`url(#goldGradPillar_${isMirrored ? 'm' : 'o'})`} />
            {/* Eye */}
            <circle cx="40" cy="334" r="1" fill="#5A0F2C" />
            {/* Plumed Body & Wings */}
            <path d="M35 360 C26 368 20 382 22 402 C24 422 36 440 50 450 C44 430 42 410 46 392" strokeWidth="2" fill={`url(#goldGradPillar_${isMirrored ? 'm' : 'o'})`} fillOpacity="0.25" />
            {/* Tail feather eyes */}
            <circle cx="28" cy="392" r="3" strokeWidth="1.2" />
            <circle cx="28" cy="392" r="1.2" fill={`url(#goldGradBright_${isMirrored ? 'm' : 'o'})`} />
            <circle cx="32" cy="416" r="3.5" strokeWidth="1.2" />
            <circle cx="32" cy="416" r="1.4" fill={`url(#goldGradBright_${isMirrored ? 'm' : 'o'})`} />
            <circle cx="40" cy="436" r="3.5" strokeWidth="1.2" />
            <circle cx="40" cy="436" r="1.4" fill={`url(#goldGradBright_${isMirrored ? 'm' : 'o'})`} />
          </g>

          {/* Right Facing Peacock / Bird */}
          <g>
            {/* Crown crest */}
            <path d="M106 330 L109 322 M106 330 L104 320 M106 330 L100 323" strokeWidth="1.5" />
            <circle cx="109" cy="321" r="1.2" fill="#FFF8E7" />
            <circle cx="104" cy="319" r="1.2" fill="#FFF8E7" />
            <circle cx="100" cy="322" r="1.2" fill="#FFF8E7" />
            {/* Head and arched neck */}
            <path d="M104 332 C102 330 98 333 97 337 C96 345 102 352 105 360 C108 370 106 382 98 390 C94 394 86 398 78 400" strokeWidth="2.2" />
            {/* Beak */}
            <path d="M97 334 L92 335 L97 337" fill={`url(#goldGradPillar_${isMirrored ? 'm' : 'o'})`} />
            {/* Eye */}
            <circle cx="100" cy="334" r="1" fill="#5A0F2C" />
            {/* Plumed Body & Wings */}
            <path d="M105 360 C114 368 120 382 118 402 C116 422 104 440 90 450 C96 430 98 410 94 392" strokeWidth="2" fill={`url(#goldGradPillar_${isMirrored ? 'm' : 'o'})`} fillOpacity="0.25" />
            {/* Tail feather eyes */}
            <circle cx="112" cy="392" r="3" strokeWidth="1.2" />
            <circle cx="112" cy="392" r="1.2" fill={`url(#goldGradBright_${isMirrored ? 'm' : 'o'})`} />
            <circle cx="108" cy="416" r="3.5" strokeWidth="1.2" />
            <circle cx="108" cy="416" r="1.4" fill={`url(#goldGradBright_${isMirrored ? 'm' : 'o'})`} />
            <circle cx="100" cy="436" r="3.5" strokeWidth="1.2" />
            <circle cx="100" cy="436" r="1.4" fill={`url(#goldGradBright_${isMirrored ? 'm' : 'o'})`} />
          </g>

          {/* Central Ornate Kalash Pot between Peacocks */}
          <path d="M52 355 C52 342 88 342 88 355 C92 375 94 400 84 425 C78 440 74 448 70 450 C66 448 62 440 56 425 C46 400 48 375 52 355 Z" strokeWidth="2.2" fill={`url(#goldGradPillar_${isMirrored ? 'm' : 'o'})`} fillOpacity="0.2" />
          <path d="M56 370 C62 385 70 395 70 415 C70 395 78 385 84 370" strokeWidth="1.5" />
          <circle cx="70" cy="390" r="4" fill={`url(#goldGradBright_${isMirrored ? 'm' : 'o'})`} />

          {/* BASE PEDESTAL */}
          <path d="M22 470 C40 460 100 460 118 470 L122 490 C102 485 38 485 18 490 Z" strokeWidth="2.2" fill={`url(#goldGradPillar_${isMirrored ? 'm' : 'o'})`} fillOpacity="0.3" />
          <path d="M16 498 C36 492 104 492 124 498 L128 528 C108 522 32 522 12 528 Z" strokeWidth="2.2" fill={`url(#goldGradPillar_${isMirrored ? 'm' : 'o'})`} fillOpacity="0.4" />
          
          {/* Base Jali and Footers */}
          <path d="M24 506 H116" strokeDasharray="4 3" />
          <path d="M28 518 H112" strokeDasharray="4 3" />

          {/* Lower trailing ornate scroll to extend height */}
          <path d="M40 534 C40 560 52 580 70 600 C88 580 100 560 100 534" strokeWidth="2" strokeDasharray="5 3" />
          <circle cx="70" cy="580" r="3" fill={`url(#goldGradBright_${isMirrored ? 'm' : 'o'})`} />
          <path d="M60 605 L70 625 L80 605" strokeWidth="2" />
          <circle cx="70" cy="635" r="2.5" fill={`url(#goldGradBright_${isMirrored ? 'm' : 'o'})`} />
        </g>
      </svg>
    </div>
  );
};

/**
 * Ornate Mughal Cusped Arch Header Contour (Vector SVG)
 * Delivers the quintessential Indian royal arch / chhatri silhouette
 */
export const MughalArchHeaderSVG: React.FC<{ className?: string }> = ({ className = "w-full" }) => {
  return (
    <svg
      viewBox="0 0 500 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="goldArchStrokeOuter" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#AA771C" />
          <stop offset="25%" stopColor="#C9962B" />
          <stop offset="50%" stopColor="#FFE8B5" />
          <stop offset="75%" stopColor="#C9962B" />
          <stop offset="100%" stopColor="#AA771C" />
        </linearGradient>
        <linearGradient id="goldArchStrokeInner" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#D4AF37" />
          <stop offset="50%" stopColor="#FFF2D1" />
          <stop offset="100%" stopColor="#D4AF37" />
        </linearGradient>
        <linearGradient id="archFillGrad" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#FFF8E7" />
          <stop offset="100%" stopColor="#FFE8B5" />
        </linearGradient>
      </defs>

      {/* Main Arch Shape with authentic Mughal 7-point cusping */}
      <path
        d="M 12 120 
           L 12 75 
           C 25 75, 45 74, 65 65 
           C 85 55, 95 48, 120 48 
           C 145 48, 155 40, 180 30 
           C 205 20, 225 15, 245 4 
           C 248 1, 252 1, 255 4 
           C 275 15, 295 20, 320 30 
           C 345 40, 355 48, 380 48 
           C 405 48, 415 55, 435 65 
           C 455 74, 475 75, 488 75 
           L 488 120 
           Z"
        fill="url(#archFillGrad)"
      />

      {/* Outer Gold Border Line (#C9962B) */}
      <path
        d="M 12 120 
           L 12 75 
           C 25 75, 45 74, 65 65 
           C 85 55, 95 48, 120 48 
           C 145 48, 155 40, 180 30 
           C 205 20, 225 15, 245 4 
           C 248 1, 252 1, 255 4 
           C 275 15, 295 20, 320 30 
           C 345 40, 355 48, 380 48 
           C 405 48, 415 55, 435 65 
           C 455 74, 475 75, 488 75 
           L 488 120"
        stroke="url(#goldArchStrokeOuter)"
        strokeWidth="2.5"
      />

      {/* Inner Gold Border Line (#F0CE7A) */}
      <path
        d="M 18 120 
           L 18 78 
           C 30 78, 48 77, 68 68 
           C 88 58, 98 52, 122 52 
           C 146 52, 156 44, 181 34 
           C 206 24, 226 19, 246 9 
           C 248 7, 252 7, 254 9 
           C 274 19, 294 24, 319 34 
           C 344 44, 354 52, 378 52 
           C 402 52, 412 58, 432 68 
           C 452 77, 470 78, 482 78 
           L 482 120"
        stroke="url(#goldArchStrokeInner)"
        strokeWidth="1.5"
      />

      {/* Apex Jewel / Drop Finial */}
      <circle cx="250" cy="5" r="3.5" fill="#FFE8B5" stroke="#C9962B" strokeWidth="1.5" />
      <circle cx="250" cy="5" r="1.5" fill="#9B1235" />
    </svg>
  );
};

/**
 * Traditional Royal Indian Wedding Baraat Procession Doli illustration
 * Recreated from Page 3 of the client's PDF!
 */
export const BaraatProcessionBanner: React.FC<{ className?: string }> = ({
  className = "w-full max-w-sm mx-auto",
}) => (
  <div className={`py-2 opacity-85 ${className}`} aria-hidden="true">
    <svg
      viewBox="0 0 500 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto text-[#9B1235]"
    >
      <defs>
        <linearGradient id="baraatGold" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#C9962B" />
          <stop offset="50%" stopColor="#9B1235" />
          <stop offset="100%" stopColor="#C9962B" />
        </linearGradient>
      </defs>
      {/* Decorative Ground Line */}
      <path d="M 20 74 L 480 74" stroke="url(#baraatGold)" strokeWidth="1.5" strokeDasharray="3 3" />
      
      {/* Shehnai Players on Left */}
      <g stroke="#9B1235" strokeWidth="1.5" fill="none" strokeLinecap="round">
        <circle cx="50" cy="30" r="4" fill="#9B1235" />
        <path d="M50 34 L50 56 M50 56 L44 72 M50 56 L56 72" />
        <path d="M50 42 L62 38 L68 34" strokeWidth="2" />
        <path d="M68 32 L75 30 L73 38 Z" fill="#9B1235" />

        {/* Dhol Drummer */}
        <circle cx="95" cy="28" r="4" fill="#9B1235" />
        <path d="M95 32 L95 56 M95 56 L90 72 M95 56 L100 72" />
        <ellipse cx="95" cy="46" rx="9" ry="7" fill="#FFF8E7" stroke="#9B1235" strokeWidth="1.8" />
        <path d="M88 42 L102 50 M88 50 L102 42" strokeWidth="1" />
      </g>

      {/* Royal Elephant / Howdah Procession in Center */}
      <g stroke="#9B1235" strokeWidth="1.6" fill="none">
        {/* Howdah / Ambari Canopy */}
        <path d="M210 22 C225 10 255 10 270 22 L275 38 L205 38 Z" fill="#FFE8B5" stroke="#C9962B" strokeWidth="1.8" />
        <circle cx="240" cy="12" r="3" fill="#C9962B" />
        {/* Groom figure in howdah */}
        <circle cx="240" cy="28" r="3.5" fill="#9B1235" />
        <path d="M236 25 L240 20 L244 25" stroke="#C9962B" strokeWidth="1.5" />

        {/* Caparisoned Elephant Body */}
        <path
          d="M190 62 C190 48 205 38 235 38 C275 38 290 48 290 62 L290 74 L276 74 L276 66 L262 66 L262 74 L220 74 L220 66 L206 66 L206 74 L190 74 Z"
          fill="#FFF8E7"
          stroke="#9B1235"
          strokeWidth="2"
        />
        {/* Trunk & Ear */}
        <path d="M285 48 C298 48 305 56 302 68 C300 72 296 72 295 70" stroke="#9B1235" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M260 44 C268 44 274 52 270 58 C266 62 258 60 258 54 Z" fill="#FFE8B5" stroke="#C9962B" />
        <circle cx="276" cy="46" r="1.5" fill="#5A0F2C" />
        {/* Jhool (Cloth) Pattern */}
        <path d="M220 50 C235 56 250 56 265 50 L260 64 C245 68 230 68 215 64 Z" fill="#FFE8B5" stroke="#C9962B" strokeWidth="1.4" />
      </g>

      {/* Royal Escorts / Attendants with Chhatra and Torches on Right */}
      <g stroke="#9B1235" strokeWidth="1.5" fill="none" strokeLinecap="round">
        {/* Umbrella Bearer */}
        <path d="M330 18 C340 8 360 8 370 18 Z" fill="#FFE8B5" stroke="#C9962B" strokeWidth="1.5" />
        <path d="M350 18 L350 72" strokeWidth="1.8" />
        <circle cx="344" cy="30" r="4" fill="#9B1235" />
        <path d="M344 34 L344 56 M344 56 L338 72 M344 56 L348 72" />

        {/* Flag / Nishan Bearer */}
        <circle cx="410" cy="28" r="4" fill="#9B1235" />
        <path d="M410 32 L410 56 M410 56 L404 72 M410 56 L414 72" />
        <path d="M415 15 L415 72" stroke="#C9962B" strokeWidth="2" />
        <path d="M416 16 L440 24 L416 32 Z" fill="#9B1235" stroke="#C9962B" />
      </g>
    </svg>
  </div>
);

/**
 * Traditional Knot / Granthi Bandhan motif as on page 3 of client PDF
 */
export const GranthiBandhanIcon: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="granthiGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF2D1" />
        <stop offset="50%" stopColor="#C9962B" />
        <stop offset="100%" stopColor="#9B1235" />
      </linearGradient>
    </defs>
    {/* Intertwined hands & sacred nuptial knot (gathbandhan) */}
    <circle cx="50" cy="50" r="44" stroke="#F0CE7A" strokeWidth="1.5" strokeDasharray="3 3" />
    <path
      d="M32 40 C38 32 46 32 50 40 C54 32 62 32 68 40 C74 48 66 58 50 68 C34 58 26 48 32 40 Z"
      fill="#FFF8E7"
      stroke="#C9962B"
      strokeWidth="2"
    />
    {/* Knot ribbons */}
    <path d="M42 56 L30 76 M58 56 L70 76" stroke="#9B1235" strokeWidth="3" strokeLinecap="round" />
    <path d="M46 58 L38 78 M54 58 L62 78" stroke="#C9962B" strokeWidth="2" strokeLinecap="round" />
    {/* Auspicious Sindoor / Tilak point */}
    <circle cx="50" cy="46" r="3" fill="#9B1235" />
  </svg>
);
