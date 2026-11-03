import React, { useState } from 'react';
import { MapPin, Send, CheckCircle2, Heart, Share2, Check, Loader2 } from 'lucide-react';
import { WEDDING_CONFIG } from '../weddingConfig';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

/**
 * Gold Mandala / Rosette Ornament flanking the footer scalloped frame
 */
const GoldRosetteOrnament: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="rosetteGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF2D1" />
        <stop offset="40%" stopColor="#E2B755" />
        <stop offset="80%" stopColor="#C9962B" />
        <stop offset="100%" stopColor="#7E530F" />
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="46" stroke="url(#rosetteGold)" strokeWidth="1.5" strokeDasharray="3 2" />
    <circle cx="50" cy="50" r="38" stroke="url(#rosetteGold)" strokeWidth="2" />
    <circle cx="50" cy="50" r="30" stroke="url(#rosetteGold)" strokeWidth="1.2" strokeDasharray="2 2" />
    {/* 8 Floral Petals */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
      <g key={idx} transform={`rotate(${angle} 50 50)`}>
        <path
          d="M50 14 C44 26 44 38 50 44 C56 38 56 26 50 14 Z"
          fill="url(#rosetteGold)"
          fillOpacity="0.4"
          stroke="url(#rosetteGold)"
          strokeWidth="1.4"
        />
        <circle cx="50" cy="18" r="2" fill="#FFE8B5" />
      </g>
    ))}
    <circle cx="50" cy="50" r="10" fill="#9B1235" stroke="url(#rosetteGold)" strokeWidth="2" />
    <circle cx="50" cy="50" r="4" fill="#FFE8B5" />
  </svg>
);

export const FooterSection: React.FC = () => {
  const { footer } = WEDDING_CONFIG;
  const [hasRsvpd, setHasRsvpd] = useState(false);
  const [showRsvpModal, setShowRsvpModal] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [guestCount, setGuestCount] = useState('2');
  const [wishes, setWishes] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rsvpError, setRsvpError] = useState<string | null>(null);

  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = guestName.trim();
    if (!trimmedName) return;

    setIsSubmitting(true);
    setRsvpError(null);

    const rsvpId = `rsvp_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const rsvpPayload = {
      name: trimmedName.slice(0, 120),
      guestCount,
      wishes: wishes.trim().slice(0, 1000),
      createdAt: new Date().toISOString(),
    };

    try {
      await setDoc(doc(db, 'rsvps', rsvpId), rsvpPayload);
      setHasRsvpd(true);
      setShowRsvpModal(false);
    } catch (err) {
      try {
        handleFirestoreError(err, OperationType.CREATE, `rsvps/${rsvpId}`);
      } catch (e) {
        console.error("Firestore RSVP error:", e);
      }
      setRsvpError("Unable to save RSVP right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Harshul & Saloni Wedding Invitation",
          text: "You are cordially invited to celebrate the wedding of Harshul & Saloni in Gwalior.",
          url: window.location.href,
        });
      } catch {
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <footer className="relative w-full bg-rose-damask py-10 px-3 sm:px-6">
      <div className="max-w-xl mx-auto">
        
        {/* BRIGHT SCALLOPED BODY WITH GOLD ORNAMENTS (Borderless & Lineless) */}
        <div className="relative">
          
          {/* Main Bright Frame Body (Soft Curved Corners, Borderless & Lineless) */}
          {/* ONE BRIGHT EDITORIAL CRISP WHITE CARD */}
          <div
            className="relative rounded-2xl sm:rounded-3xl bg-white 
                       shadow-[0_16px_45px_rgba(0,0,0,0.18)] p-5 sm:p-7 overflow-hidden border border-gray-100"
          >
            {/* Subtle paper grain texture */}
            <div className="absolute inset-0 opacity-[0.025] bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

            {/* Inner Content */}
            <div className="relative text-center">
              
              {/* Flanking Gold Ornaments and RSVP Button */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex-shrink-0">
                  <GoldRosetteOrnament className="w-8 h-8 sm:w-10 sm:h-10 gold-glow" />
                </div>

                {/* RSVP Centerpiece Button */}
                <div className="flex-1 px-2">
                  {!hasRsvpd ? (
                    <button
                      type="button"
                      onClick={() => setShowRsvpModal(true)}
                      className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl 
                                 bg-gradient-to-r from-[#7A1C38] to-[#922143] hover:from-[#65142D] hover:to-[#7E1A38] text-white 
                                 shadow-md transition-all duration-300 cursor-pointer min-h-[42px]"
                    >
                      <span className="font-serif font-semibold text-xs sm:text-sm tracking-[0.22em] uppercase text-white">
                        RSVP Here
                      </span>
                    </button>
                  ) : (
                    <div className="inline-flex items-center gap-1.5 py-1.5 px-4 rounded-xl bg-[#264A2E] text-white text-xs font-semibold shadow-sm">
                      <CheckCircle2 className="w-4 h-4 text-[#F0CE7A]" />
                      <span>RSVP Received</span>
                    </div>
                  )}
                </div>

                <div className="flex-shrink-0">
                  <GoldRosetteOrnament className="w-8 h-8 sm:w-10 sm:h-10 gold-glow" />
                </div>
              </div>

              {/* Thank You Note / Easy Prompt */}
              {hasRsvpd ? (
                <div className="mb-4 p-3 rounded-xl bg-[#F9FAFB] border border-gray-100 shadow-xs">
                  <Heart className="w-4 h-4 text-[#7A1C38] mx-auto mb-1 fill-[#7A1C38]" />
                  <p className="font-serif text-base font-semibold text-[#7A1C38]">
                    {footer.rsvpThankYouMessage}
                  </p>
                  <p className="font-sans text-xs text-gray-600 mt-0.5">
                    {footer.rsvpSubtext}
                  </p>
                </div>
              ) : (
                <p className="font-sans text-xs text-gray-500 mb-4">
                  Please click RSVP above to let us know if you can join us!
                </p>
              )}

              {/* "With Love & Best Wishes" in Elegant Script */}
              <h3 className="font-script text-3xl sm:text-4xl text-[#7A1C38] drop-shadow-xs leading-tight my-2">
                {footer.scriptHeading}
              </h3>

              {/* Family & Establishments List */}
              <div className="space-y-1 font-sans text-xs sm:text-sm text-gray-700 py-2">
                {footer.wishingWellLines.map((line, idx) => (
                  <p
                    key={idx}
                    className={
                      idx === 0
                        ? "text-[#7A1C38] font-serif font-bold text-base sm:text-lg"
                        : idx === footer.wishingWellLines.length - 1
                        ? "text-[11px] uppercase tracking-[0.2em] text-[#C9962B] font-semibold pt-1"
                        : "text-gray-600"
                    }
                  >
                    {line}
                  </p>
                ))}
              </div>

              {/* Share Invitation Action */}
              <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-center">
                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#F9FAFB] hover:bg-gray-100 
                             text-[#7A1C38] text-xs font-medium border border-gray-200 transition-colors min-h-[36px] cursor-pointer shadow-xs"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-green-700" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? "Link Copied!" : "Share Invitation"}</span>
                </button>
              </div>

              {/* Residence Address in Simple English */}
              <div className="mt-3 text-[11px] text-gray-500 font-sans leading-relaxed max-w-sm mx-auto">
                <p className="flex items-center justify-center gap-1 text-[#7A1C38] font-medium mb-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#7A1C38]" />
                  <span>Residence: {footer.contactPerson}</span>
                </p>
                <p>{footer.residenceAddress}</p>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* RSVP MODAL POPUP (English, Crisp White) */}
      {showRsvpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-gray-100">
            <div className="text-center mb-5">
              <span className="font-english-serif text-xs font-bold uppercase tracking-widest text-[#9B1235]">
                Wedding RSVP
              </span>
              <h4 className="font-serif text-xl sm:text-2xl font-bold text-gray-900 mt-1">
                Harshul &amp; Saloni Wedding
              </h4>
              <p className="font-sans text-xs text-gray-600 mt-1">
                Kindly register your presence and heartfelt wishes
              </p>
            </div>

            <form onSubmit={handleRsvpSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1 font-sans">
                  Guest Name *
                </label>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="e.g. Rahul Sharma & Family"
                  className="w-full px-3 py-2.5 text-sm rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#9B1235]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1 font-sans">
                  Number of Guests
                </label>
                <select
                  value={guestCount}
                  onChange={(e) => setGuestCount(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#9B1235]"
                >
                  <option value="1">1 Person</option>
                  <option value="2">2 Persons</option>
                  <option value="3">3 Persons</option>
                  <option value="4">4 Persons</option>
                  <option value="5+">Family (5+ Persons)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1 font-sans">
                  Wishes &amp; Blessings for the Couple
                </label>
                <textarea
                  rows={2}
                  value={wishes}
                  onChange={(e) => setWishes(e.target.value)}
                  placeholder="Heartiest congratulations and warm blessings..."
                  className="w-full px-3 py-2.5 text-sm rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#9B1235]"
                />
              </div>

              {rsvpError && (
                <p className="text-xs text-red-700 bg-red-100/80 p-2 rounded">
                  {rsvpError}
                </p>
              )}

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowRsvpModal(false)}
                  disabled={isSubmitting}
                  className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold min-h-[42px] cursor-pointer disabled:opacity-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-lg bg-[#9B1235] hover:bg-[#800D2A] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm min-h-[42px] cursor-pointer disabled:opacity-50 transition-colors"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 text-white animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 text-white" />
                      <span>Confirm RSVP</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </footer>
  );
};
