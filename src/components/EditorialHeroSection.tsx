import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Image as ImageIcon,
  Upload,
  X,
  ChevronDown,
  Sparkles,
  Check,
  Loader2,
  Crop,
} from 'lucide-react';
import { WEDDING_CONFIG } from '../weddingConfig';
import {
  saveHeroPhoto,
  deleteHeroPhoto,
  subscribeHeroPhotos,
} from '../services/heroPhotoService';
import { PhotoCropModal } from './PhotoCropModal';

interface PhotoFrameProps {
  id: string;
  label: string;
  aspectClass: string;
  delay: number;
  uploadedImage: string | null;
  isUploading: boolean;
  onImageSelected: (file: File) => void;
  onImageRemoved: () => void;
  onAdjustFrame: () => void;
}

const PhotoFrame: React.FC<PhotoFrameProps> = ({
  label,
  aspectClass,
  delay,
  uploadedImage,
  isUploading,
  onImageSelected,
  onImageRemoved,
  onAdjustFrame,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageSelected(file);
    }
    // reset input so the same file can be re-selected if needed
    e.target.value = '';
  };

  const handleContainerClick = () => {
    if (uploadedImage) {
      onAdjustFrame();
    } else {
      fileInputRef.current?.click();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`relative w-full ${aspectClass} rounded-none overflow-hidden group cursor-pointer bg-[#FFFDF9] shadow-[0_2px_12px_rgba(74,14,46,0.08)] transition-all duration-300 hover:shadow-[0_6px_20px_rgba(201,150,43,0.18)]`}
      onClick={handleContainerClick}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="hidden"
      />

      {isUploading ? (
        // Uploading / Compressing state
        <div className="w-full h-full bg-[#FAF7F0] flex flex-col items-center justify-center p-3 text-center">
          <Loader2 className="w-6 h-6 text-[#9B1235] animate-spin mb-2" />
          <p className="font-english-serif text-xs text-[#9B1235] tracking-wider">
            Optimizing &amp; Saving...
          </p>
        </div>
      ) : uploadedImage ? (
        // Borderless Photo Display (Clean rectangular photo edge-to-edge)
        <div className="relative w-full h-full">
          <img
            src={uploadedImage}
            alt={label}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
          />

          {/* Hover controls for setting frame, replacing, and removing (borderless) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-2 sm:p-2.5 z-30">
            <div className="flex items-center gap-1.5 flex-wrap">
              {/* Option to set the frame / crop & reposition */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onAdjustFrame();
                }}
                className="text-[10px] sm:text-[11px] text-[#FFE8B5] font-sans flex items-center gap-1 bg-[#9B1235]/90 hover:bg-[#9B1235] px-2 py-1 rounded-none transition-colors shadow-xs cursor-pointer"
                title="Adjust framing, zoom, pan, and crop"
              >
                <Crop className="w-3 h-3 text-[#F0CE7A]" />
                <span>Set Frame / Crop</span>
              </button>

              {/* Replace Photo */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="text-[10px] sm:text-[11px] text-[#FFE8B5] font-sans flex items-center gap-1 bg-black/80 hover:bg-black px-2 py-1 rounded-none transition-colors cursor-pointer"
                title="Upload another photo"
              >
                <Upload className="w-3 h-3 text-[#F0CE7A]" />
                <span className="hidden sm:inline">Replace</span>
              </button>
            </div>

            {/* Remove Photo */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onImageRemoved();
              }}
              className="p-1.5 bg-[#9B1235] text-[#FFE8B5] hover:bg-red-700 transition-colors cursor-pointer shadow-xs"
              title="Remove photo"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        // Empty Frame State: Clean borderless placeholder with warm ivory/peach tone
        <div className="w-full h-full bg-gradient-to-b from-[#FFFDF8] via-[#FFF9EE] to-[#FFF3DE] hover:from-[#FFF9EE] hover:to-[#FFEEC4] flex flex-col items-center justify-center p-2.5 text-center select-none transition-colors">
          {/* Subtle background texture */}
          <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#9B1235_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center justify-center space-y-1">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-none bg-[#FFF0D0] flex items-center justify-center text-[#9B1235] shadow-xs group-hover:scale-105 transition-transform">
              <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#9B1235]" />
            </div>

            <div className="space-y-0.5">
              <p className="font-english-serif text-[11px] sm:text-xs font-semibold tracking-wider text-[#9B1235]">
                {label}
              </p>
              <p className="font-sans text-[9px] sm:text-[10px] text-[#5A0F2C]/70 flex items-center justify-center gap-1">
                <Upload className="w-2.5 h-2.5 text-[#C9962B]" />
                <span>Upload &amp; Frame</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export const EditorialHeroSection: React.FC = () => {
  const { couple } = WEDDING_CONFIG;

  const [photos, setPhotos] = useState<{ [key: string]: string | null }>({
    frame1: null,
    frame2: null,
    frame3: null,
  });

  // Keep raw uncropped image in memory cache so users can re-adjust without losing original edges
  const rawImagesCache = useRef<{ [key: string]: string }>({});

  const [uploadingFrame, setUploadingFrame] = useState<string | null>(null);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);

  // Crop Modal state
  const [cropModal, setCropModal] = useState<{
    isOpen: boolean;
    frameId: string | null;
    imageSrc: string | null;
    aspectRatio: number;
    frameLabel: string;
  }>({
    isOpen: false,
    frameId: null,
    imageSrc: null,
    aspectRatio: 16 / 10,
    frameLabel: '',
  });

  // Synchronize photos with Firestore in real-time (and localStorage fallback)
  useEffect(() => {
    const unsubscribe = subscribeHeroPhotos((loadedPhotos) => {
      setPhotos((prev) => ({
        ...prev,
        ...loadedPhotos,
      }));
    });

    return () => unsubscribe();
  }, []);

  const getFrameDetails = (frameId: string) => {
    switch (frameId) {
      case 'frame1':
        return { label: 'Hero Photo (Top)', aspectRatio: 16 / 10 };
      case 'frame2':
        return { label: 'Small Photo (Middle)', aspectRatio: 3 / 4 };
      case 'frame3':
        return { label: 'Celebration Photo (Bottom)', aspectRatio: 16 / 10 };
      default:
        return { label: 'Wedding Frame', aspectRatio: 16 / 10 };
    }
  };

  // Triggered when a new file is picked
  const handleSelectImage = (frameId: string, file: File) => {
    const reader = new FileReader();
    reader.onerror = () => {
      setSyncStatus('Could not read image file.');
      setTimeout(() => setSyncStatus(null), 3000);
    };
    reader.onload = () => {
      const dataUrl = reader.result as string;
      rawImagesCache.current[frameId] = dataUrl;
      const { label, aspectRatio } = getFrameDetails(frameId);

      // Open interactive crop modal so user can position and crop before saving
      setCropModal({
        isOpen: true,
        frameId,
        imageSrc: dataUrl,
        aspectRatio,
        frameLabel: label,
      });
    };
    reader.readAsDataURL(file);
  };

  // Triggered when user wants to re-adjust an already uploaded frame
  const handleAdjustFrame = (frameId: string) => {
    const src = rawImagesCache.current[frameId] || photos[frameId];
    if (!src) return;

    const { label, aspectRatio } = getFrameDetails(frameId);
    setCropModal({
      isOpen: true,
      frameId,
      imageSrc: src,
      aspectRatio,
      frameLabel: label,
    });
  };

  // When crop is confirmed and applied
  const handleCropApply = async (croppedDataUrl: string) => {
    const frameId = cropModal.frameId;
    if (!frameId) return;

    try {
      setUploadingFrame(frameId);
      // 1. Optimistically update local UI immediately
      setPhotos((prev) => ({ ...prev, [frameId]: croppedDataUrl }));

      // 2. Persist to Firestore database so client sees it
      await saveHeroPhoto(frameId, croppedDataUrl);
      setSyncStatus('Framed photo saved & ready for client preview');
      setTimeout(() => setSyncStatus(null), 3500);
    } catch (err) {
      console.error('Failed to save framed photo:', err);
      setSyncStatus('Failed to sync photo. Please try again.');
      setTimeout(() => setSyncStatus(null), 4000);
    } finally {
      setUploadingFrame(null);
    }
  };

  const handleRemoveImage = async (frameId: string) => {
    try {
      delete rawImagesCache.current[frameId];
      setPhotos((prev) => ({ ...prev, [frameId]: null }));
      await deleteHeroPhoto(frameId);
      setSyncStatus('Photo removed');
      setTimeout(() => setSyncStatus(null), 2500);
    } catch (err) {
      console.error('Failed to remove photo:', err);
    }
  };

  const scrollToInvitation = () => {
    const el = document.getElementById('invitation-hero');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="editorial-montage" className="relative w-full bg-[#3B0A1E] text-[#5A0F2C] overflow-hidden">
      
      {/* Editorial Canvas Container: Warm Ivory Paper with Borderless Rectangular Layout */}
      <div className="relative max-w-2xl mx-auto bg-gradient-to-b from-[#FFFDF9] via-[#FFF8EC] to-[#FFF3DE] px-3 sm:px-6 pt-3 sm:pt-4 pb-7 rounded-none shadow-[0_8px_32px_rgba(74,14,46,0.25)]">
        
        {/* Soft Floral / Foliage Vignette Silhouettes on Left & Right */}
        <div className="absolute top-0 left-0 w-32 sm:w-48 h-64 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_top_left,rgba(155,18,53,0.35)_0%,transparent_70%)]" />
        <div className="absolute top-0 right-0 w-32 sm:w-48 h-64 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_top_right,rgba(201,150,43,0.35)_0%,transparent_70%)]" />
        
        {/* Header Ribbon Flourish (Lineless) */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex flex-col items-center justify-center mb-2.5 sm:mb-3 text-center"
        >
          <div className="flex items-center gap-2 text-[#9B1235]/70">
            <Sparkles className="w-3.5 h-3.5 text-[#C9962B]" />
            <span className="font-english-serif text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#9B1235] font-semibold">
              The Moment • A Royal Union
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[#C9962B]" />
          </div>

          {/* Sync notification badge for client preview persistence */}
          <AnimatePresence>
            {syncStatus && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="mt-1.5 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#264A2E]/90 text-[#FFE8B5] text-[10px] tracking-wide font-sans shadow-xs"
              >
                <Check className="w-3 h-3 text-[#F0CE7A]" />
                <span>{syncStatus}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* 
          EDITORIAL PHOTO MONTAGE (Borderless photos, lineless layout)
          The column width is narrowed (w-[88%] sm:w-[84%] max-w-[460px] mx-auto) for refined editorial proportions.
        */}
        <div className="w-[88%] sm:w-[84%] max-w-[460px] mx-auto space-y-3 sm:space-y-4">
          
          {/* 1. TOP BIG RECTANGULAR FRAME */}
          <div>
            <PhotoFrame
              id="frame1"
              label="Hero Photo (Top)"
              aspectClass="aspect-[16/10]"
              delay={0.2}
              uploadedImage={photos.frame1}
              isUploading={uploadingFrame === 'frame1'}
              onImageSelected={(file) => handleSelectImage('frame1', file)}
              onImageRemoved={() => handleRemoveImage('frame1')}
              onAdjustFrame={() => handleAdjustFrame('frame1')}
            />
          </div>

          {/* 2. MIDDLE ROW: 1 Small Rectangle Frame on Left + Quote Beside it on Right */}
          <div className="flex flex-row items-center gap-3 sm:gap-4 py-1">
            {/* Left: Small Rectangular Frame */}
            <div className="w-[32%] sm:w-[28%] max-w-[135px] shrink-0">
              <PhotoFrame
                id="frame2"
                label="Small Photo"
                aspectClass="aspect-[3/4]"
                delay={0.6}
                uploadedImage={photos.frame2}
                isUploading={uploadingFrame === 'frame2'}
                onImageSelected={(file) => handleSelectImage('frame2', file)}
                onImageRemoved={() => handleRemoveImage('frame2')}
                onAdjustFrame={() => handleAdjustFrame('frame2')}
              />
            </div>

            {/* Right: Romantic Calligraphy Quote directly beside the small image (Lineless) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1 flex flex-col justify-center items-center text-center px-1 sm:px-2"
            >
              <div className="relative inline-block">
                <p className="font-script text-2xl sm:text-3xl md:text-3.5xl text-[#5A0F2C] leading-snug sm:leading-relaxed tracking-wide drop-shadow-xs">
                  “ my heart is,
                  <br />
                  and always will
                  <br />
                  be , yours ”
                </p>
              </div>
            </motion.div>
          </div>

          {/* 3. BOTTOM BIG RECTANGULAR FRAME */}
          <div>
            <PhotoFrame
              id="frame3"
              label="Celebration Photo (Bottom)"
              aspectClass="aspect-[16/10]"
              delay={1.2}
              uploadedImage={photos.frame3}
              isUploading={uploadingFrame === 'frame3'}
              onImageSelected={(file) => handleSelectImage('frame3', file)}
              onImageRemoved={() => handleRemoveImage('frame3')}
              onAdjustFrame={() => handleAdjustFrame('frame3')}
            />
          </div>

        </div>

        {/* 4. BOTTOM NAMES & DATE */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center justify-center text-center pt-3 pb-1"
        >
          {/* Couple Names in Flowing Calligraphy */}
          <h2 className="font-script text-4xl sm:text-5xl text-[#9B1235] tracking-wide leading-none drop-shadow-xs">
            {couple.groom.nameEnglish} &amp; {couple.bride.nameEnglish}
          </h2>

          {/* Wedding Date in Royal Serif */}
          <p className="font-english-serif text-sm sm:text-base tracking-[0.3em] uppercase text-[#C9962B] font-semibold mt-2">
            02.12.26
          </p>

          {/* Smooth Scroll Button to Main Invitation (Lineless/borderless) */}
          <button
            type="button"
            onClick={scrollToInvitation}
            className="mt-3.5 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-none bg-[#9B1235]/10 hover:bg-[#9B1235]/20 text-[#9B1235] text-xs font-english-serif tracking-wider transition-all duration-300 cursor-pointer"
          >
            <span>View Sacred Invitation</span>
            <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
          </button>
        </motion.div>

      </div>

      {/* Interactive Photo Crop & Framing Modal */}
      <PhotoCropModal
        isOpen={cropModal.isOpen}
        imageSrc={cropModal.imageSrc}
        aspectRatio={cropModal.aspectRatio}
        frameLabel={cropModal.frameLabel}
        onApply={handleCropApply}
        onClose={() =>
          setCropModal((prev) => ({
            ...prev,
            isOpen: false,
            frameId: null,
            imageSrc: null,
          }))
        }
      />

    </section>
  );
};
