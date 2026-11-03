import React, { useEffect, useState } from 'react';
import { Sparkles, ChevronRight } from 'lucide-react';
import { playWeddingMusic } from '../utils/weddingAudio';

interface IntroAnimationProps {
  onOpen: () => void;
}

const GANESHA_INTRO_IMAGE =
  '/assets/aistudio/Single_Line_Ganesha_Wall_Art__Minimalist_Ganesh_Printable__Modern_Hindu_Wall_Decor__Ganesha_Line_Drawing__Indian_Spiritual_Art__1__0b5510cf.jfif';

export const IntroAnimation: React.FC<IntroAnimationProps> = ({ onOpen }) => {
  // Stages: 'entry' (button only in English) -> 'ganesh' (photo with fade-in for 4s) -> 'fade-out'
  const [stage, setStage] = useState<'entry' | 'ganesh' | 'fade-out'>('entry');
  const [ganeshFadedIn, setGaneshFadedIn] = useState(false);

  const startAndEnter = () => {
    // Instantly starts audio skipped forward 15 seconds upon tapping Enter Invitation
    playWeddingMusic(15);
    setStage('ganesh');
  };

  useEffect(() => {
    if (stage === 'ganesh') {
      // 1. Smooth fade-in animation upon entering the Ganesh intro stage
      const fadeInTimer = setTimeout(() => {
        setGaneshFadedIn(true);
      }, 60);

      // 2. Automatically advance on its own after 4 seconds
      const autoAdvanceTimer = setTimeout(() => {
        setStage('fade-out');
      }, 4000);

      // 3. Complete transition and reveal the main wedding invitation
      const finishTimer = setTimeout(() => {
        onOpen();
      }, 4700);

      return () => {
        clearTimeout(fadeInTimer);
        clearTimeout(autoAdvanceTimer);
        clearTimeout(finishTimer);
      };
    }
  }, [stage, onOpen]);

  const handleScreenClick = () => {
    if (stage === 'entry') {
      startAndEnter();
    } else if (stage === 'ganesh') {
      setStage('fade-out');
      setTimeout(onOpen, 650);
    }
  };

  return (
    <div
      onClick={handleScreenClick}
      className={`fixed inset-0 z-50 w-full h-full bg-[#F9EBDE] cursor-pointer overflow-hidden flex items-center justify-center transition-opacity duration-700 select-none ${
        stage === 'fade-out' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* 1. ENTRY SCREEN: ONLY THE BUTTON IN ENGLISH */}
      {stage === 'entry' && (
        <div className="flex items-center justify-center transition-all duration-500">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              startAndEnter();
            }}
            className="inline-flex items-center justify-center gap-2.5 px-7 py-3 rounded-full 
                       bg-gradient-to-r from-[#9B1235] via-[#B81E57] to-[#9B1235] hover:from-[#800D2A] hover:to-[#9B1235] 
                       text-white border border-[#F0CE7A]/60 shadow-[0_6px_22px_rgba(155,18,53,0.35)] 
                       text-sm sm:text-base font-serif tracking-[0.18em] uppercase font-semibold 
                       transition-all duration-300 transform active:scale-95 cursor-pointer group"
          >
            <Sparkles className="w-4 h-4 text-[#FFE8B5] group-hover:scale-110 transition-transform" />
            <span>Enter Invitation</span>
            <ChevronRight className="w-4 h-4 text-[#FFE8B5] group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      )}

      {/* 2. GANESH STAGE: PHOTO WITH SMOOTH FADE-IN ANIMATION, ADVANCES ON ITS OWN AFTER 4 SECONDS */}
      {stage === 'ganesh' && (
        <div
          className={`w-full h-full flex items-center justify-center p-6 sm:p-10 transition-all duration-1000 ease-out transform ${
            ganeshFadedIn
              ? 'opacity-100 scale-100 translate-y-0'
              : 'opacity-0 scale-95 translate-y-2'
          }`}
        >
          <img
            src={GANESHA_INTRO_IMAGE}
            alt="Lord Ganesha"
            className="max-h-[50vh] sm:max-h-[56vh] max-w-[70vw] sm:max-w-[340px] w-auto h-auto object-contain object-center select-none pointer-events-none"
          />
        </div>
      )}
    </div>
  );
};
