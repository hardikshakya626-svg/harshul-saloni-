import React, { useState, useRef } from 'react';
import { Camera, Heart, Sparkles, RefreshCw } from 'lucide-react';
import { WEDDING_CONFIG } from '../weddingConfig';
import { GaneshMotif, SwastikMotif } from './OrnamentalIcons';

export const PhotoBlessingSection: React.FC = () => {
  const { photoBlessingSection, couple } = WEDDING_CONFIG;
  const initialPhoto = photoBlessingSection.photoUrl || couple.couplePhotoUrl;
  const [photo, setPhoto] = useState<string>(initialPhoto);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setPhoto(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="relative w-full bg-wine-damask py-8 px-3 sm:px-6 border-b-2 border-[#C9962B]">
      {/* Top Gold Transition Accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#520D27] via-[#F0CE7A] to-[#520D27]" />

      <div className="max-w-xl mx-auto">
        {/* Section Heading (English) */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center gap-2 mb-1">
            <SwastikMotif className="w-4 h-4 text-[#F0CE7A]" />
            <span className="font-english-heading tracking-[0.25em] text-xs sm:text-sm text-[#FFE8B5] uppercase font-semibold">
              Sacred Vows &amp; Divine Blessings
            </span>
            <SwastikMotif className="w-4 h-4 text-[#F0CE7A]" />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#FFF8E7] drop-shadow-sm tracking-wide">
            Divine Grace &amp; Couple Portrait
          </h2>
          <div className="w-24 h-[1.5px] mx-auto mt-2 bg-gradient-to-r from-transparent via-[#F0CE7A] to-transparent" />
        </div>

        {/* BRIGHT LUMINOUS INNER FRAME */}
        <div
          className="relative rounded-3xl bg-gradient-to-b from-[#FFF8E7] via-[#FFF3D6] to-[#FFE8B5] 
                     border-2 border-[#C9962B] luminous-frame-shadow p-2 sm:p-4 text-center"
        >
          {/* Inner Double Inset Border */}
          <div className="rounded-2xl border border-[#F0CE7A] p-4 sm:p-6 bg-[#FFFDF7]/50 flex flex-col items-center">
            
            {/* Lord Ganesha Invocation Header (Sacred Mantra Preserved) */}
            <div className="flex items-center justify-center gap-2 text-[#9B1235] mb-1">
              <SwastikMotif className="w-3.5 h-3.5 text-[#C9962B]" />
              <h3 className="font-hindi text-base sm:text-lg font-bold tracking-widest text-[#9B1235]">
                {photoBlessingSection.ganeshMantraHeading}
              </h3>
              <SwastikMotif className="w-3.5 h-3.5 text-[#C9962B]" />
            </div>

            {/* Ganesh Motif */}
            <div className="my-1.5 relative">
              <div className="absolute inset-0 bg-[#F0CE7A]/30 rounded-full blur-md" />
              <GaneshMotif size={52} className="relative w-12 h-12 mx-auto gold-glow" />
            </div>

            {/* Sacred Vakratunda Mahakaya Ganesh Mantra (Preserved in Sanskrit Devanagari) */}
            <div className="my-2 p-3 rounded-xl bg-[#FFF8E7] border border-[#C9962B]/40 max-w-md w-full shadow-xs">
              <p className="font-hindi text-sm sm:text-base font-bold text-[#9B1235] leading-relaxed">
                {photoBlessingSection.ganeshMantraLines[0]}
              </p>
              <p className="font-hindi text-sm sm:text-base font-bold text-[#9B1235] leading-relaxed mt-0.5">
                {photoBlessingSection.ganeshMantraLines[1]}
              </p>
            </div>

            {/* Decorative Gold Filigree Divider */}
            <div className="flex items-center justify-center gap-2 my-3 w-3/5 max-w-[180px]">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#C9962B]" />
              <Sparkles className="w-3.5 h-3.5 text-[#C9962B]" />
              <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#C9962B]" />
            </div>

            {/* DEDICATED COUPLE PHOTO FRAME WITH GOLD BORDER */}
            <div className="my-2 w-full flex flex-col items-center">
              <div
                className="relative w-full max-w-[320px] sm:max-w-[360px] aspect-[4/5] rounded-2xl bg-gradient-to-b from-[#FFF8E7] to-[#FFE8B5] p-2.5 border-2 border-[#C9962B] shadow-xl group cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
                title="Click to upload couple photo"
              >
                {/* Inset Gold Line */}
                <div className="relative w-full h-full rounded-xl border border-[#F0CE7A] overflow-hidden flex items-center justify-center bg-[#5A0F2C]/5">
                  {photo ? (
                    <img
                      src={photo}
                      alt="Harshul & Saloni"
                      className="w-full h-full object-cover object-center"
                    />
                  ) : (
                    /* Ornate Royal Couple Crest / Monogram Placeholder */
                    <div className="w-full h-full p-4 flex flex-col items-center justify-center text-center bg-gradient-to-b from-[#FFFDF7] via-[#FFF5DE] to-[#FFEEC4]">
                      {/* Gold Ring */}
                      <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 border-[#C9962B] p-1 flex items-center justify-center shadow-inner">
                        <div className="w-full h-full rounded-full border border-dashed border-[#F0CE7A] flex flex-col items-center justify-center bg-gradient-to-tr from-[#FFF8E7] to-[#FFF3D6]">
                          <Heart className="w-5 h-5 text-[#9B1235] fill-[#9B1235]/40 mb-1" />
                          <span className="font-english-heading font-bold text-2xl text-[#9B1235] tracking-widest">
                            H &amp; S
                          </span>
                          <span className="font-english-serif text-[10px] text-[#C9962B] font-semibold uppercase tracking-wider mt-0.5">
                            Wedding Celebration
                          </span>
                        </div>
                      </div>

                      <p className="font-serif text-sm font-bold text-[#9B1235] mt-3">
                        Harshul &amp; Saloni
                      </p>
                      <p className="font-sans text-[11px] text-[#5A0F2C]/70 mt-1 flex items-center gap-1">
                        <Camera className="w-3 h-3" />
                        <span>Click to upload photo</span>
                      </p>
                    </div>
                  )}

                  {/* Corner Ornaments */}
                  <div className="absolute top-1.5 left-1.5 w-3.5 h-3.5 border-t-2 border-l-2 border-[#C9962B] pointer-events-none" />
                  <div className="absolute top-1.5 right-1.5 w-3.5 h-3.5 border-t-2 border-r-2 border-[#C9962B] pointer-events-none" />
                  <div className="absolute bottom-1.5 left-1.5 w-3.5 h-3.5 border-b-2 border-l-2 border-[#C9962B] pointer-events-none" />
                  <div className="absolute bottom-1.5 right-1.5 w-3.5 h-3.5 border-b-2 border-r-2 border-[#C9962B] pointer-events-none" />
                </div>
              </div>

              {/* Hidden file input for photo upload */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="dedicatedPhotoInput"
              />

              {/* Upload / change trigger buttons (English) */}
              <div className="mt-2.5 flex items-center gap-2">
                <label
                  htmlFor="dedicatedPhotoInput"
                  className="cursor-pointer py-1.5 px-3 rounded-lg bg-[#9B1235] hover:bg-[#800D2A] text-[#FFE8B5] border border-[#F0CE7A] text-[11px] font-semibold flex items-center gap-1.5 shadow-sm transition-colors min-h-[44px]"
                >
                  <Camera className="w-3.5 h-3.5 text-[#F0CE7A]" />
                  <span>{photo ? "Change Photo" : "Upload Photo"}</span>
                </label>
                {photo && (
                  <button
                    type="button"
                    onClick={() => setPhoto('')}
                    className="cursor-pointer py-1.5 px-2.5 rounded-lg bg-[#FFF8E7] hover:bg-[#FFE8B5] text-[#9B1235] border border-[#C9962B] text-[11px] font-semibold flex items-center gap-1 shadow-sm transition-colors min-h-[44px]"
                    title="Reset to Royal Monogram"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                )}
              </div>
            </div>

            {/* Couple Names in Script & Blessing Caption */}
            <div className="mt-3 space-y-1">
              <h4 className="font-script text-3xl sm:text-4xl text-[#9B1235] drop-shadow-sm leading-tight">
                {photoBlessingSection.coupleCaption}
              </h4>
              <p className="font-english-serif text-xs sm:text-sm font-semibold text-[#C9962B] tracking-wide">
                {photoBlessingSection.subCaption}
              </p>
            </div>

            {/* Mantra English Translation & Blessing Note */}
            <p className="font-sans text-xs sm:text-[13px] text-[#5A0F2C]/90 italic mt-3 max-w-md leading-relaxed border-t border-[#F0CE7A]/50 pt-3">
              "{photoBlessingSection.mantraTranslation}"
            </p>

          </div>
        </div>
      </div>

      {/* Bottom Gold Transition Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#520D27] via-[#C9962B] to-[#520D27]" />
    </section>
  );
};
