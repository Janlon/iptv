import { useEffect } from 'react';

type RemoteHandler = (event: RemoteKeyEvent) => void;

export type RemoteKeyEvent = {
  key: 'up' | 'down' | 'left' | 'right' | 'enter' | 'back' | 'play' | 'pause';
  originalEvent: KeyboardEvent;
};

const KEY_MAP: Record<string, RemoteKeyEvent['key']> = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
  Enter: 'enter',
  ' ': 'enter',
  Backspace: 'back',
  Escape: 'back',
  MediaPlayPause: 'play',
  MediaPlay: 'play',
  MediaPause: 'pause'
};

export function useRemoteNavigation(handler: RemoteHandler) {
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const key = KEY_MAP[event.key];
      if (!key) {
        return;
      }

      event.preventDefault();
      handler({ key, originalEvent: event });
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handler]);
}
