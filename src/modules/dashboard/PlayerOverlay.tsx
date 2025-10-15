import { KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';
import type { Credentials, XtreamVod, XtreamSeries } from '../iptv/types';
import { useProfiles } from '../profiles/ProfileContext';

type PlayerOverlayProps = {
  streamId: number | string;
  title: string;
  type: 'movie' | 'series';
  credentials: Credentials;
  onClose: () => void;
  item?: XtreamVod | XtreamSeries;
};

export function PlayerOverlay({ streamId, title, type, credentials, onClose, item }: PlayerOverlayProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const hideControlsTimer = useRef<number | null>(null);
  const { updateWatchHistory } = useProfiles();

  const streamUrl = buildStreamUrl(credentials, streamId, type, item);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    function handleTimeUpdate() {
      setCurrentTime(video!.currentTime);
    }

    function handleDurationChange() {
      setDuration(video!.duration);
    }

    function handlePlay() {
      setIsPlaying(true);
    }

    function handlePause() {
      setIsPlaying(false);
    }

    function handleError(e: Event) {
      console.error('[PlayerOverlay] Video error:', video!.error);
      setError('Erro ao carregar o vídeo. Verifique a conexão ou tente outro título.');
    }
    
    function handleLoadedMetadata() {
      // Metadata loaded
    }
    
    function handleCanPlay() {
      // Try to play automatically
      video!.play().catch((err) => {
        console.error('[PlayerOverlay] Autoplay failed:', err);
      });
    }
    
    function handleSeeking() {
      // Seeking
    }
    
    function handleSeeked() {
      // Seeked
    }

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('durationchange', handleDurationChange);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('error', handleError);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('seeking', handleSeeking);
    video.addEventListener('seeked', handleSeeked);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('durationchange', handleDurationChange);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('error', handleError);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('seeking', handleSeeking);
      video.removeEventListener('seeked', handleSeeked);
    };
  }, []);

  useEffect(() => {
    if (showControls) {
      if (hideControlsTimer.current) {
        clearTimeout(hideControlsTimer.current);
      }
      hideControlsTimer.current = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false);
        }
      }, 3000);
    }
    return () => {
      if (hideControlsTimer.current) {
        clearTimeout(hideControlsTimer.current);
      }
    };
  }, [showControls, isPlaying]);

  useEffect(() => {
    return () => {
      if (videoRef.current && duration > 0 && currentTime > 10) {
        updateWatchHistory({
          streamId,
          title,
          type,
          lastPosition: currentTime,
          duration
        });
      }
    };
  }, [streamId, title, type, currentTime, duration, updateWatchHistory]);

  const togglePlayPause = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }, []);

  const seek = useCallback((seconds: number) => {
    const video = videoRef.current;
    if (!video) return;
    
    if (!video.duration || isNaN(video.duration) || !isFinite(video.duration)) {
      console.warn('[PlayerOverlay] Cannot seek: video duration not available');
      return;
    }
    
    // Check if video supports seeking
    if (video.seekable.length === 0) {
      console.warn('[PlayerOverlay] Cannot seek: video stream does not support seeking');
      return;
    }
    
    const currentPos = video.currentTime;
    const newTime = Math.max(0, Math.min(currentPos + seconds, video.duration));
    
    // Only seek if the new time is within seekable range
    const seekableEnd = video.seekable.end(video.seekable.length - 1);
    const targetTime = Math.min(newTime, seekableEnd);
    
    video.currentTime = targetTime;
  }, []);

  const adjustVolume = useCallback((delta: number) => {
    const video = videoRef.current;
    if (!video) return;
    const newVolume = Math.max(0, Math.min(volume + delta, 1));
    video.volume = newVolume;
    setVolume(newVolume);
  }, [volume]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    setShowControls(true);

    switch (event.key) {
      case ' ':
      case 'Enter':
      case 'MediaPlayPause':
        event.preventDefault();
        togglePlayPause();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        seek(-10);
        break;
      case 'ArrowRight':
        event.preventDefault();
        seek(10);
        break;
      case 'ArrowUp':
        event.preventDefault();
        adjustVolume(0.1);
        break;
      case 'ArrowDown':
        event.preventDefault();
        adjustVolume(-0.1);
        break;
      case 'Escape':
      case 'Back':
      case 'Backspace':
        event.preventDefault();
        onClose();
        break;
    }
  }, [togglePlayPause, seek, adjustVolume, onClose]);

  function formatTime(seconds: number) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    if (h > 0) {
      return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  return (
    <div
      className="player-overlay"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      onMouseMove={() => setShowControls(true)}
    >
      <video
        ref={videoRef}
        className="player-overlay__video"
        src={streamUrl}
        autoPlay
        controls={false}
        playsInline
        preload="auto"
        onClick={togglePlayPause}
      />

      {error && (
        <div className="player-overlay__error">
          <p>{error}</p>
          <button type="button" onClick={onClose}>Voltar</button>
        </div>
      )}

      <div className={showControls ? 'player-overlay__controls' : 'player-overlay__controls player-overlay__controls--hidden'}>
        <div className="player-overlay__header">
          <h2>{title}</h2>
          <button type="button" onClick={onClose} className="player-overlay__close">
            ✕
          </button>
        </div>

        <div className="player-overlay__progress">
          <div className="player-overlay__progress-bar">
            <div
              className="player-overlay__progress-fill"
              style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
            />
          </div>
          <div className="player-overlay__time">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="player-overlay__buttons">
          <button type="button" onClick={() => seek(-10)}>⏪ 10s</button>
          <button type="button" onClick={togglePlayPause}>
            {isPlaying ? '⏸️ Pausar' : '▶️ Play'}
          </button>
          <button type="button" onClick={() => seek(10)}>⏩ 10s</button>
          <div className="player-overlay__volume">
            <button type="button" onClick={() => adjustVolume(-0.1)}>🔉</button>
            <div className="player-overlay__volume-bar">
              <div
                className="player-overlay__volume-fill"
                style={{ width: `${volume * 100}%` }}
              />
            </div>
            <button type="button" onClick={() => adjustVolume(0.1)}>🔊</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function buildStreamUrl(credentials: Credentials, streamId: number | string, type: 'movie' | 'series', item?: XtreamVod | XtreamSeries): string {
  const base = credentials.baseUrl.replace(/\/$/, '');
  
  // Get container extension from item if available
  let extension = 'mp4'; // default
  if (item && 'container_extension' in item && item.container_extension) {
    extension = item.container_extension;
  }
  
  let directUrl: string;
  if (type === 'movie') {
    // Xtream format: /movie/username/password/streamId.ext
    directUrl = `${base}/movie/${credentials.username}/${credentials.password}/${streamId}.${extension}`;
  } else {
    // For series, we need episode info - for now use the same format
    directUrl = `${base}/series/${credentials.username}/${credentials.password}/${streamId}.${extension}`;
  }
  
  // Use proxy for video streaming to avoid CORS
  const proxyUrl = import.meta.env.VITE_XTREAM_PROXY_URL;
  if (proxyUrl) {
    return `${proxyUrl}${encodeURIComponent(directUrl)}`;
  }
  
  return directUrl;
}

function formatTime(seconds: number): string {
  if (!isFinite(seconds)) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
