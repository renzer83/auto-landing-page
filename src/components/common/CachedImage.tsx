import React, { useState, useEffect } from 'react';
import { imageCache } from '../../utils/imageCache';
import { useInView } from 'react-intersection-observer';

interface CachedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  placeholder?: React.ReactNode;
  onLoad?: () => void;
  onError?: () => void;
}

export const CachedImage: React.FC<CachedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  objectFit = 'cover',
  placeholder,
  onLoad,
  onError,
}) => {
  const [imageSrc, setImageSrc] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  
  // Use intersection observer para carregamento lazy
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '200px 0px', // Pré-carregar quando estiver a 200px da visualização
  });

  useEffect(() => {
    // Não carrega a imagem até que esteja próxima de entrar na visualização
    if (!inView) return;
    
    let isMounted = true;
    
    const loadImage = async () => {
      if (!src) {
        setIsLoading(false);
        setHasError(true);
        return;
      }
      
      try {
        setIsLoading(true);
        
        // Verifica se a imagem deve ser carregada do cache
        const shouldCache = src.includes('api.finditbuy.com/api/images/pub');
        
        if (shouldCache) {
          try {
            // Carregar do cache
            const cachedSrc = await imageCache.getImage(src);
            
            if (isMounted) {
              setImageSrc(cachedSrc);
              setIsLoading(false);
            }
          } catch (cacheError) {
            console.warn(`Erro ao carregar imagem do cache: ${src}`, cacheError);
            // Fallback para a URL original em caso de erro no cache
            if (isMounted) {
              setImageSrc(src);
              setIsLoading(false);
            }
          }
        } else {
          // Não usar cache para outras imagens
          if (isMounted) {
            setImageSrc(src);
            setIsLoading(false);
          }
        }
      } catch (error) {
        console.error(`Erro ao carregar imagem: ${src}`, error);
        
        if (isMounted) {
          // Usar a URL original como fallback
          setImageSrc(src);
          setIsLoading(false);
          setHasError(true);
          if (onError) onError();
        }
      }
    };

    loadImage();
    
    return () => {
      isMounted = false;
    };
  }, [src, inView, onError]);

  const handleImageLoaded = () => {
    setIsLoading(false);
    if (onLoad) onLoad();
  };

  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
    if (onError) onError();
  };

  return (
    <div 
      ref={ref} 
      className={`relative ${className}`}
      style={{ 
        width: width || '100%', 
        height: height || 'auto' 
      }}
    >
      {/* Placeholder ou skeleton enquanto carrega */}
      {(isLoading || !inView) && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded">
          {placeholder || null}
        </div>
      )}

      {/* Mensagem de erro */}
      {hasError && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded">
          <span className="text-gray-500">Falha ao carregar imagem</span>
        </div>
      )}

      {/* Imagem real (renderizada apenas quando estiver visível) */}
      {inView && imageSrc && (
        <img
          src={imageSrc}
          alt={alt}
          className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          style={{ 
            objectFit,
            width: 'auto',  // Respeitar o tamanho original da imagem
            height: 'auto', // Respeitar o tamanho original da imagem
            maxWidth: '100%', // Garantir que não ultrapasse o contêiner
            maxHeight: '100%' // Garantir que não ultrapasse o contêiner
          }}
          onLoad={handleImageLoaded}
          onError={handleImageError}
        />
      )}
    </div>
  );
};
