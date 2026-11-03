import React, { useState, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';
import {
  toggleWeddingMusic,
  subscribeWeddingAudio,
  isWeddingMusicPlaying,
} from '../utils/weddingAudio';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(() => isWeddingMusicPlaying());

  useEffect(() => {
    const unsubscribe = subscribeWeddingAudio((playing) => {
      setIsPlaying(playing);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWeddingMusic();
  };

  return (
    <div className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 z-50 select-none">
      {/* Very Small White & Pink Floating Play / Pause Button */}
      <button
        type="button"
        onClick={handleToggle}
        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center 
                   bg-white hover:bg-[#FFF0F4] text-[#E11D48] hover:text-[#BE185D]
                   border-2 border-[#FDA4AF] shadow-[0_3px_10px_rgba(244,63,94,0.25)] 
                   transition-all duration-200 cursor-pointer active:scale-95 ${
                     isPlaying ? 'ring-2 ring-[#FDA4AF]/60' : 'opacity-95'
                   }`}
        title={isPlaying ? 'Pause Music' : 'Play Music'}
        aria-label={isPlaying ? 'Pause wedding music' : 'Play wedding music'}
      >
        {isPlaying ? (
          <Pause className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
        ) : (
          <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current ml-0.5" />
        )}
      </button>
    </div>
  );
};
