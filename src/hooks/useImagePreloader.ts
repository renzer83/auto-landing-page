import { useEffect, useState } from 'react';
import { ImageCache } from '../utils/imageCache';

export function useImagePreloader(urls: string[] = []) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (!urls.length) {
      setLoaded(true);
      return;
    }
    
    let isMounted = true;
    const imageCache = ImageCache.getInstance();
    
    const preload = async () => {
      try {
        await imageCache.preloadImages(urls);
        if (isMounted) setLoaded(true);
      } catch (err) {
        if (isMounted) {
          console.error('Erro ao pré-carregar imagens:', err);
          setError('Erro ao pré-carregar imagens');
          setLoaded(true); // Considera carregado mesmo com erro para não bloquear a UI
        }
      }
    };
    
    preload();
    
    return () => {
      isMounted = false;
    };
  }, [urls]);
  
  return { loaded, error };
}