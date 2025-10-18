import { useEffect } from 'react';

type RemoteHandler = (event: RemoteKeyEvent) => void;

export type RemoteKeyEvent = {
  key: 'up' | 'down' | 'left' | 'right' | 'enter' | 'back' | 'play' | 'pause' | 'red' | 'green' | 'yellow' | 'blue';
  originalEvent: KeyboardEvent;
};

// Mapeamento para Samsung TV + navegadores
const KEY_MAP: Record<string, RemoteKeyEvent['key']> = {
  // Teclas padrão de navegador
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

// Mapeamento por keyCode para Samsung TV
const KEYCODE_MAP: Record<number, RemoteKeyEvent['key']> = {
  // Setas direcionais
  37: 'left',
  38: 'up',
  39: 'right', 
  40: 'down',
  
  // Botões principais
  13: 'enter',
  8: 'back',
  27: 'back',
  
  // Botões coloridos Samsung TV
  403: 'red',
  404: 'green',
  405: 'yellow',
  406: 'blue',
  
  // Controles de mídia Samsung TV
  415: 'play',
  19: 'pause',
  413: 'pause',
  412: 'back',
  417: 'play',
  
  // Outros Samsung TV
  10009: 'back', // Return
  4: 'back',     // Menu (tratado como back)
  18: 'back'     // Tools (tratado como back)
};

export function useRemoteNavigation(handler: RemoteHandler) {
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      console.log('🎮 RemoteNav - Tecla detectada:', {
        key: event.key,
        keyCode: event.keyCode,
        which: event.which,
        code: event.code
      });
      
      // Tentar mapear por key primeiro (navegadores)
      let mappedKey = KEY_MAP[event.key];
      
      // Se não encontrou, tentar por keyCode (Samsung TV)
      if (!mappedKey) {
        mappedKey = KEYCODE_MAP[event.keyCode] || KEYCODE_MAP[event.which];
      }
      
      if (!mappedKey) {
        console.log('⚠️ RemoteNav - Tecla não mapeada:', event.keyCode);
        return;
      }

      console.log(`🎯 RemoteNav - Ação: ${mappedKey}`);
      event.preventDefault();
      event.stopPropagation();
      
      handler({ key: mappedKey, originalEvent: event });
    }

    console.log('🎮 RemoteNav - Registrando event listener');
    window.addEventListener('keydown', onKeyDown, true); // useCapture = true para maior prioridade
    
    return () => {
      console.log('🎮 RemoteNav - Removendo event listener');
      window.removeEventListener('keydown', onKeyDown, true);
    };
  }, [handler]);
}
