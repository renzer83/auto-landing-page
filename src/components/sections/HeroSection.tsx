import React, { useEffect, useState } from 'react';
import { HeroSection as HeroSectionType } from '../../types/landing';
import { imageCache } from '../../utils/imageCache';
import { CachedImage } from '../common/CachedImage';

interface HeroSectionProps {
  data: HeroSectionType;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ data }) => {
  const [backgroundImageUrl, setBackgroundImageUrl] = useState<string>('');
  const [imageLoaded, setImageLoaded] = useState(false);
  
  useEffect(() => {
    // Carrega a imagem de fundo do cache
    const loadBackgroundImage = async () => {
      try {
        // Tenta carregar do cache
        const cachedUrl = await imageCache.getImage(data.backgroundImage);
        setBackgroundImageUrl(cachedUrl);
        
        // Pré-carregar a imagem para garantir que esteja disponível
        const img = new Image();
        img.src = cachedUrl;
        img.onload = () => setImageLoaded(true);
        img.onerror = () => {
          // Se falhar, tenta a URL original
          console.warn('Falha ao carregar imagem em cache, tentando URL original');
          setBackgroundImageUrl(data.backgroundImage);
          setImageLoaded(true);
        };
      } catch (error) {
        console.error('Erro ao carregar imagem de fundo:', error);
        // Fallback para URL original em caso de erro
        setBackgroundImageUrl(data.backgroundImage);
        setImageLoaded(true);
      }
    };
    
    loadBackgroundImage();
    
    // Timeout de segurança para garantir que algo apareça mesmo se houver problemas
    const safetyTimeout = setTimeout(() => {
      if (!imageLoaded) {
        console.warn('Timeout ao carregar imagem de fundo, usando fallback');
        setBackgroundImageUrl(data.backgroundImage);
        setImageLoaded(true);
      }
    }, 3000);
    
    return () => clearTimeout(safetyTimeout);
  }, [data.backgroundImage, imageLoaded]);

  // Gera os estilos de fundo com a imagem em cache
  const backgroundStyles = {
    backgroundImage: backgroundImageUrl 
      ? `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)), url(${backgroundImageUrl})`
      : undefined,
    backgroundColor: '#000',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <section 
      className="relative min-h-[90vh] flex flex-col justify-center items-center text-white py-16 transition-opacity duration-500"
      style={{
        ...backgroundStyles,
        opacity: imageLoaded ? 1 : 0.3,
      }}
    >
      {/* Fallback background color while image loads */}
      <div 
        className="absolute inset-0 bg-black -z-10"
        style={{ opacity: imageLoaded ? 0 : 1 }}
      ></div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        {data.logo && (
          <div className="flex justify-center mb-6 h-32">
            <CachedImage 
              src={data.logo} 
              alt="Logo" 
              className="h-32"
              objectFit="contain"
              width="auto"
              height="128"
            />
          </div>
        )}
        
        <h1 className="text-3xl md:text-5xl font-bold mb-6 animate-slide-up max-w-4xl mx-auto leading-tight">
          {data.title}
        </h1>
        
        <p className="text-lg md:text-xl mb-8 animate-slide-up max-w-3xl mx-auto opacity-90">
          {data.subtitle}
        </p>
        
        {data.video && (
          <div className="max-w-3xl mx-auto mb-8 animate-fade-in rounded-lg overflow-hidden border-4 border-primary shadow-lg shadow-primary/30">
            <iframe
              width="100%"
              height="315"
              src={data.video.replace('watch?v=', 'embed/')}
              title="Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="aspect-video"
            ></iframe>
          </div>
        )}
        
        {data.buttonText && data.buttonLink && (
          <a
            href={data.buttonLink}
            className="inline-block bg-primary hover:bg-primary/80 text-black font-bold py-4 px-8 rounded-full text-xl transform transition-transform hover:scale-105 animate-pulse shadow-lg shadow-primary/30"
          >
            {data.buttonText}
          </a>
        )}
      </div>
    </section>
  );
};