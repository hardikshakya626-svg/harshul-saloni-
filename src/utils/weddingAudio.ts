/**
 * Centralized Wedding Audio Manager
 * Ensures a single authoritative audio instance with zero race conditions,
 * instant playback starting at 7 seconds, and reliable play/pause state synchronization.
 */

const WEDDING_SONG_URL = '/assets/aistudio/gajanan.mp3';
const FALLBACK_SONG_URL = '/assets/gajanan.mp3';

let globalAudio: HTMLAudioElement | null = null;
type Listener = (playing: boolean) => void;
let listeners: Listener[] = [];

export function getWeddingAudio(): HTMLAudioElement {
  if (!globalAudio) {
    globalAudio = new Audio();
    // iOS Safari / WebKit media policy attributes
    globalAudio.setAttribute('playsinline', 'true');
    globalAudio.setAttribute('webkit-playsinline', 'true');
    globalAudio.preload = 'auto';
    globalAudio.src = WEDDING_SONG_URL;
    globalAudio.loop = true;

    globalAudio.addEventListener('error', () => {
      if (globalAudio && globalAudio.src !== window.location.origin + FALLBACK_SONG_URL) {
        console.warn('Primary audio failed, loading fallback:', FALLBACK_SONG_URL);
        globalAudio.src = FALLBACK_SONG_URL;
        globalAudio.load();
      }
    });

    globalAudio.addEventListener('play', () => {
      listeners.forEach((fn) => fn(true));
    });
    globalAudio.addEventListener('pause', () => {
      listeners.forEach((fn) => fn(false));
    });
    globalAudio.addEventListener('ended', () => {
      listeners.forEach((fn) => fn(false));
    });
  }
  return globalAudio;
}

export function playWeddingMusic(skipToSeconds: number = 0): Promise<void> {
  const audio = getWeddingAudio();
  
  // Safe seeking helper for iOS Safari
  const applySeek = () => {
    try {
      if (skipToSeconds > 0 && audio.currentTime < 1) {
        audio.currentTime = skipToSeconds;
      }
    } catch {
      // Audio seeking will apply on play event if metadata not yet ready
    }
  };

  applySeek();
  const playPromise = audio.play();
  if (playPromise !== undefined) {
    return playPromise
      .then(() => {
        applySeek();
      })
      .catch((err) => {
        console.warn('Playback error:', err);
      });
  }
  return Promise.resolve();
}

export function pauseWeddingMusic(): void {
  const audio = getWeddingAudio();
  audio.pause();
}

export function toggleWeddingMusic(): void {
  const audio = getWeddingAudio();
  if (audio.paused) {
    audio.play().catch(() => {});
  } else {
    audio.pause();
  }
}

export function isWeddingMusicPlaying(): boolean {
  return globalAudio ? !globalAudio.paused : false;
}

export function subscribeWeddingAudio(listener: Listener): () => void {
  listeners.push(listener);
  if (globalAudio) {
    listener(!globalAudio.paused);
  } else {
    listener(false);
  }
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}
