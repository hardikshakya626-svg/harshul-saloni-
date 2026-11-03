import { collection, doc, setDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';

export interface HeroPhotoDoc {
  frameId: string;
  imageUrl: string;
  updatedAt: string;
}

const LOCAL_STORAGE_KEY_PREFIX = 'wedding_hero_photo_';

// Client-side image compression to guarantee base64 fits within Firestore's 1MB limit
export async function compressImage(file: File, maxDimension = 1200, initialQuality = 0.8): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read image file'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Failed to load image'));
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        let quality = initialQuality;
        let dataUrl = canvas.toDataURL('image/jpeg', quality);

        // Ensure string size is under 800KB for Firestore safety
        if (dataUrl.length > 800000 && quality > 0.5) {
          quality = 0.6;
          dataUrl = canvas.toDataURL('image/jpeg', quality);
        }

        resolve(dataUrl);
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

// Subscribe to real-time hero photos from Firestore, falling back to localStorage
export function subscribeHeroPhotos(
  callback: (photos: Record<string, string | null>) => void,
  onError?: (err: Error) => void
): () => void {
  // 1. Initial optimistic load from localStorage
  const initialPhotos: Record<string, string | null> = {
    frame1: localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}frame1`),
    frame2: localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}frame2`),
    frame3: localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}frame3`),
    filmHero: localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}filmHero`),
  };
  callback(initialPhotos);

  // 2. Real-time Firestore sync across preview links and client devices
  try {
    const colRef = collection(db, 'hero_photos');
    const unsubscribe = onSnapshot(
      colRef,
      (snapshot) => {
        const updated: Record<string, string | null> = { ...initialPhotos };
        snapshot.forEach((docSnap) => {
          const data = docSnap.data() as Partial<HeroPhotoDoc>;
          if (data.frameId && data.imageUrl) {
            updated[data.frameId] = data.imageUrl;
            try {
              localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}${data.frameId}`, data.imageUrl);
            } catch {
              // Ignore localStorage quota errors
            }
          }
        });
        callback(updated);
      },
      (error) => {
        console.warn('Realtime photo sync notice:', error.message);
        if (onError) onError(error);
      }
    );

    return unsubscribe;
  } catch (err) {
    console.warn('Failed to attach Firestore snapshot:', err);
    return () => {};
  }
}

// Persist photo to Firestore & localStorage
export async function saveHeroPhoto(frameId: string, imageUrl: string): Promise<void> {
  // Optimistic local storage update
  try {
    localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}${frameId}`, imageUrl);
  } catch {
    // Ignore storage quota
  }

  try {
    const docRef = doc(db, 'hero_photos', frameId);
    await setDoc(docRef, {
      frameId,
      imageUrl,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `hero_photos/${frameId}`);
  }
}

// Delete photo from Firestore & localStorage
export async function deleteHeroPhoto(frameId: string): Promise<void> {
  try {
    localStorage.removeItem(`${LOCAL_STORAGE_KEY_PREFIX}${frameId}`);
  } catch {
    // Ignore
  }

  try {
    const docRef = doc(db, 'hero_photos', frameId);
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `hero_photos/${frameId}`);
  }
}
