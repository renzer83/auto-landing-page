import React, { useEffect, useState } from 'react';
import { HeroSection as HeroSectionType } from '../../types/landing';

interface HeroSectionProps {
  data: HeroSectionType;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ data }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  useEffect(() => {
    // Pré-carregar a imagem de fundo
    const img = new Image();
    img.src = data.backgroundImage;
    img.onload = () => setImageLoaded(true);
  }, [data.backgroundImage]);

  const backgroundStyles = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)), url(${data.backgroundImage})`,
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
          <div className="flex justify-center mb-6">
            <img 
              src={data.logo} 
              alt="Logo" 
              className="w-32 md:w-40 h-auto animate-fade-in"
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
