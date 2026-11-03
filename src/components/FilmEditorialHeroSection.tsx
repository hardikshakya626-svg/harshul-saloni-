import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';
import { subscribeHeroPhotos } from '../services/heroPhotoService';

// Authentic textured background uploaded by the user (Rani Pink crushed velvet)
const PINK_TEXTURED_BG = '/assets/aistudio/download__65__a008c40f.jfif';

// Client couple photo from Firebase Storage in brothers-productions (logo > harshul hero image)
const FIREBASE_STORAGE_HERO =
  'https://firebasestorage.googleapis.com/v0/b/brothers-productions.firebasestorage.app/o/logo%2Fharshul%20hero%20image%2FDSC02100_resized%20(1).jpg?alt=media&token=6025a999-f456-4acd-840d-344cebad060d';
const LOCAL_FALLBACK_HERO = '/assets/client_hero.jpg';

export const FilmEditorialHeroSection: React.FC = () => {
  const [photo, setPhoto] = useState<string>(FIREBASE_STORAGE_HERO);

  // Load from Firebase Storage and subscribe to real-time updates if any
  useEffect(() => {
    async function loadStorageHero() {
      try {
        const imageRef = ref(storage, 'logo/harshul hero image/DSC02100_resized (1).jpg');
        const url = await getDownloadURL(imageRef);
        if (url) {
          setPhoto(url);
        }
      } catch {
        // Fallback already points to FIREBASE_STORAGE_HERO
      }
    }
    loadStorageHero();

    const unsubscribe = subscribeHeroPhotos((loadedPhotos) => {
      if (loadedPhotos.filmHero) {
        setPhoto(loadedPhotos.filmHero);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <section
      id="postcard-hero"
      className="relative w-full min-h-screen min-h-[100dvh] overflow-hidden select-none flex flex-col justify-between items-center bg-[#8B0E43] left-0 right-0 m-0 p-0"
    >
      {/* 
        1. RICH TEXTURED BACKGROUND:
        High-definition pink velvet texture with subtle atmospheric golden radiance
      */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{
          backgroundImage: `url("${PINK_TEXTURED_BG}")`,
        }}
      >
        {/* Soft royal ambient lighting glow behind the portrait frame */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,rgba(255,235,180,0.18)_0%,rgba(139,14,67,0.35)_55%,rgba(65,3,28,0.78)_100%)] pointer-events-none" />

        {/* Subtle royal gold micro-grain */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#FFE8B5_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        {/* Cinematic top and bottom edge vignettes */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#360215]/85 via-transparent to-[#360215]/50 pointer-events-none" />
      </div>

      {/* 
        2. MAIN CENTERPIECE:
        Static, Clean & Un-interactive Client Portrait
      */}
      <div className="relative z-20 w-full max-w-md mx-auto px-4 my-auto pt-8 pb-2 flex flex-col items-center">
        
        {/* Seamless & Borderless Portrait Frame (Un-interactive) */}
        <div className="relative w-44 sm:w-52 md:w-56 aspect-[3/4] mx-auto rounded-none overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.65)] pointer-events-none">
          <img
            src={photo}
            alt="Harshul & Saloni Wedding Portrait"
            className="w-full h-full object-cover contrast-[1.05] brightness-[1.02] rounded-none shadow-inner"
            style={{
              objectPosition: 'center 68%',
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = LOCAL_FALLBACK_HERO;
            }}
          />
        </div>

        {/* 3. TYPOGRAPHY UNDERNEATH */}
        <div className="text-center mt-4 sm:mt-5 flex flex-col items-center select-none">
          <h1 className="font-script text-3xl sm:text-4xl md:text-5xl leading-tight text-[#FFF9F0] drop-shadow-[0_3px_18px_rgba(0,0,0,0.9)] px-2">
            Harshul &amp; Saloni
          </h1>

          <div className="flex items-center gap-2 mt-1.5">
            <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#F0CE7A]" />
            <p className="font-serif text-sm sm:text-base md:text-lg tracking-[0.28em] pl-[0.28em] font-bold uppercase text-[#FFE8B5] drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
              Wedding Celebration
            </p>
            <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#F0CE7A]" />
          </div>
        </div>

      </div>

      {/* 4. BOTTOM SCROLL CUE */}
      <div className="relative z-20 pb-4 sm:pb-6 text-center select-none">
        <button
          type="button"
          onClick={() => {
            const el =
              document.getElementById('save-the-date') ||
              document.getElementById('invitation-hero');
            if (el) el.scrollIntoView({ behavior: 'auto' });
          }}
          className="inline-flex flex-col items-center gap-1 text-xs uppercase font-serif tracking-[0.25em] pl-[0.25em] transition-colors cursor-pointer group text-[#FFE8B5] font-semibold hover:text-white drop-shadow-md"
        >
          <span>Scroll Down</span>
          <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform text-[#F0CE7A]" />
        </button>
      </div>
    </section>
  );
};
