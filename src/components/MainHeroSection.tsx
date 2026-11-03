import React from 'react';
import { ChevronDown } from 'lucide-react';

/**
 * Main Hero Section
 * Displays the authentic Luxury Burgundy Lotus Door Frame template
 * with pristine aspect-ratio containment (zero distortion across mobile, tablet, and desktop)
 * and living soft-breeze micro-movements:
 * - Hanging golden temple bells swaying gently from the top corners
 * - Blooming lotus bouquets softly breathing and swaying at the bottom corners
 * - Soft rose lotus petals drifting through the radiant sunlit cutout
 * - Zero top gap (starts flush at top edge)
 * - English text for all wedding UI controls and invitations
 */
export const MainHeroSection: React.FC = () => {
  const scrollToNext = () => {
    const nextSection = document.getElementById('invitation-hero');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="main-hero"
      className="relative w-full h-[100svh] min-h-[100svh] flex flex-col justify-between items-center overflow-hidden bg-[#4A0E2E] bg-maroon-canvas select-none pt-0 mt-0"
    >
      {/* CENTERED PORTRAIT ROYAL CARD (Strictly locked to authentic 408:612 / 2:3 aspect ratio to prevent distortion) */}
      <div className="relative h-full max-h-[100svh] w-full max-w-[min(100vw,calc(100svh*408/612))] aspect-[408/612] mx-auto overflow-hidden shadow-2xl flex flex-col justify-between">
        
        {/* 1. WARM RADIANT SUNLIT BACKGROUND (Glows through the transparent archway) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFFDF8] via-[#FFF3D6] to-[#FFE8BD] z-0">
          {/* Soft radial golden aura with breathing pulse */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.92)_0%,rgba(255,232,181,0.55)_60%,transparent_100%)] animate-golden-aura" />
          
          {/* Subtle royal parchment texture */}
          <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#C9962B_1px,transparent_1px)] [background-size:20px_20px]" />
        </div>

        {/* 2. FLOATING LOTUS PETALS & GOLDEN PARTICLES (Soft breeze drifting upward) */}
        <div className="absolute inset-0 z-5 pointer-events-none overflow-hidden" aria-hidden="true">
          {/* Floating Petal 1 */}
          <div className="absolute bottom-[28%] left-[22%] animate-petal-1">
            <svg className="w-5 h-6 drop-shadow-sm text-[#E8799A]/85" viewBox="0 0 24 30" fill="currentColor">
              <path d="M12 0 C18 10, 24 18, 12 30 C0 18, 6 10, 12 0 Z" />
            </svg>
          </div>

          {/* Floating Petal 2 */}
          <div className="absolute bottom-[24%] right-[24%] animate-petal-2">
            <svg className="w-4 h-5 drop-shadow-sm text-[#F4A7BA]/80" viewBox="0 0 24 30" fill="currentColor">
              <path d="M12 0 C18 10, 24 18, 12 30 C0 18, 6 10, 12 0 Z" />
            </svg>
          </div>

          {/* Floating Petal 3 */}
          <div className="absolute bottom-[36%] left-[34%] animate-petal-3">
            <svg className="w-4 h-5 drop-shadow-sm text-[#E8799A]/75" viewBox="0 0 24 30" fill="currentColor">
              <path d="M12 0 C18 10, 24 18, 12 30 C0 18, 6 10, 12 0 Z" />
            </svg>
          </div>

          {/* Floating Petal 4 */}
          <div className="absolute bottom-[32%] right-[32%] animate-petal-4">
            <svg className="w-3.5 h-4.5 drop-shadow-sm text-[#F7BAC7]/85" viewBox="0 0 24 30" fill="currentColor">
              <path d="M12 0 C18 10, 24 18, 12 30 C0 18, 6 10, 12 0 Z" />
            </svg>
          </div>

          {/* Soft Golden Sparkle Points */}
          <div className="absolute top-[38%] left-[48%] w-1.5 h-1.5 rounded-full bg-[#F0CE7A] opacity-75 animate-ping" style={{ animationDuration: '4s' }} />
          <div className="absolute top-[48%] left-[42%] w-1.5 h-1.5 rounded-full bg-[#FFE8B5] opacity-70 animate-ping" style={{ animationDuration: '5.5s', animationDelay: '1.5s' }} />
          <div className="absolute top-[42%] right-[40%] w-1 h-1 rounded-full bg-[#F0CE7A] opacity-80 animate-ping" style={{ animationDuration: '4.8s', animationDelay: '2.5s' }} />
        </div>

        {/* 3. BASE ARCH FRAME (Authentic royal door frame, flush at top with 0 gap) */}
        <div className="absolute inset-0 z-10 p-0 m-0 overflow-hidden pointer-events-none">
          <img
            src="/assets/aistudio/frame-base-arch.png"
            alt="Royal Wedding Door Frame"
            className="w-full h-full object-contain object-top drop-shadow-2xl"
          />
        </div>

        {/* 4. SOFT BREEZE ANIMATED ELEMENTS: SWINGING BELLS & BREATHING LOTUSES */}
        <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden" aria-hidden="true">
          
          {/* --- TOP-LEFT HANGING GOLDEN BELL (Soft breeze pendulum sway) --- */}
          <div
            className="absolute top-0 left-0 w-[20.83%] h-[26.14%] animate-bell-left"
            style={{
              transformOrigin: '48% 0%',
              animation: 'bellSwingLeft 6.4s ease-in-out infinite',
            }}
          >
            <img
              src="/assets/aistudio/animated-bell-left.png"
              alt="Hanging Golden Temple Bell Left"
              className="w-full h-full object-contain object-top drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]"
            />
          </div>

          {/* --- TOP-RIGHT HANGING GOLDEN BELL (Soft breeze pendulum sway, gentle phase offset) --- */}
          <div
            className="absolute top-0 right-0 w-[20.83%] h-[26.14%] animate-bell-right"
            style={{
              transformOrigin: '52% 0%',
              animation: 'bellSwingRight 7.1s ease-in-out 0.6s infinite',
            }}
          >
            <img
              src="/assets/aistudio/animated-bell-right.png"
              alt="Hanging Golden Temple Bell Right"
              className="w-full h-full object-contain object-top drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]"
            />
          </div>

          {/* --- BOTTOM-LEFT LOTUS CLUSTER (Gently breathing and swaying in the soft breeze) --- */}
          <div
            className="absolute bottom-[1.63%] left-0 w-[44.12%] h-[42.48%] animate-lotus-left"
            style={{
              transformOrigin: '15% 85%',
              animation: 'lotusBreatheLeft 7.8s ease-in-out infinite alternate',
            }}
          >
            <img
              src="/assets/aistudio/animated-lotus-left.png"
              alt="Lotus Bouquet Left"
              className="w-full h-full object-contain object-bottom drop-shadow-[0_4px_10px_rgba(0,0,0,0.45)]"
            />
          </div>

          {/* --- BOTTOM-RIGHT LOTUS CLUSTER (Gently breathing in counter-harmony) --- */}
          <div
            className="absolute bottom-[1.63%] right-0 w-[44.12%] h-[42.48%] animate-lotus-right"
            style={{
              transformOrigin: '85% 85%',
              animation: 'lotusBreatheRight 8.4s ease-in-out 0.8s infinite alternate',
            }}
          >
            <img
              src="/assets/aistudio/animated-lotus-right.png"
              alt="Lotus Bouquet Right"
              className="w-full h-full object-contain object-bottom drop-shadow-[0_4px_10px_rgba(0,0,0,0.45)]"
            />
          </div>

        </div>

        {/* 5. SMOOTH SCROLL CALL-TO-ACTION (English text) */}
        <div className="absolute bottom-3 left-0 right-0 z-30 flex justify-center">
          <button
            type="button"
            onClick={scrollToNext}
            className="group flex flex-col items-center justify-center p-2 text-[#C9962B] hover:text-[#FFE8B5] transition-all cursor-pointer min-h-[44px] min-w-[44px]"
            title="Scroll to Invitation Details"
            aria-label="Scroll to wedding invitation"
          >
            <span className="font-english-serif text-[11px] sm:text-xs text-[#FFE8B5] font-bold tracking-widest uppercase drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)] group-hover:text-[#FFF8E7]">
              View Invitation
            </span>
            <ChevronDown className="w-5 h-5 text-[#F0CE7A] group-hover:text-[#FFF8E7] animate-bounce mt-0.5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)]" />
          </button>
        </div>

      </div>

      {/* 6. BOTTOM TRANSITION: Royal Gold & Burgundy Divider Ribbon */}
      <div className="relative z-30 w-full h-1 bg-gradient-to-r from-[#9B1235] via-[#C9962B] to-[#9B1235] shadow-sm" />
    </section>
  );
};
