import React, { useState, useEffect } from 'react';
import { CachedImage } from '../common/CachedImage';

interface BeforeAfterItem {
  before: {
    image: string;
    title: string;
    description?: string;
  };
  after: {
    image: string;
    title: string;
    description?: string;
  };
}

interface BeforeAfterSectionProps {
  title?: string;
  items: BeforeAfterItem[];
}

export const BeforeAfterSection: React.FC<BeforeAfterSectionProps> = ({ title, items }) => {
  // Estado para controlar carregamento de imagens
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  
  // Pré-carrega todas as imagens para garantir carregamento rápido
  useEffect(() => {
    const preloadImages = () => {
      const imagesToLoad: string[] = [];
      
      // Coleta todas as URLs de imagem antes/depois
      items.forEach(item => {
        if (item.before?.image) imagesToLoad.push(item.before.image);
        if (item.after?.image) imagesToLoad.push(item.after.image);
      });
      
      // Inicia o carregamento de cada imagem
      const loadPromises = imagesToLoad.map(url => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => {
            setLoadedImages(prev => ({ ...prev, [url]: true }));
            resolve();
          };
          img.onerror = () => {
            // Mesmo com erro, marcamos como carregada para evitar espera infinita
            setLoadedImages(prev => ({ ...prev, [url]: true }));
            resolve();
          };
          img.src = url;
        });
      });
      
      // Definir timeout para caso as imagens não carreguem
      setTimeout(() => {
        imagesToLoad.forEach(url => {
          setLoadedImages(prev => ({ ...prev, [url]: true }));
        });
      }, 5000); // 5 segundos de timeout
      
      // Aguarda carregamento de todas as imagens
      Promise.all(loadPromises).catch(() => {
        console.warn('Algumas imagens não puderam ser pré-carregadas');
      });
    };
    
    preloadImages();
  }, [items]);
  
  // Verifica se a imagem está carregada
  const isImageLoaded = (url: string) => {
    return !!loadedImages[url];
  };
  
  return (
    <section className="py-24 bg-gray-900">
      <div className="container mx-auto px-4">
        {title && (
          <h2 className="text-4xl font-bold text-center text-primary mb-16 relative pb-4 after:content-[''] after:absolute after:w-24 after:h-1 after:bg-primary after:bottom-0 after:left-1/2 after:-translate-x-1/2">{title}</h2>
        )}
        
        <div className="space-y-24">
          {items.map((item, index) => (
            <div key={index} className="flex flex-col md:flex-row justify-between gap-10 md:gap-8 transform hover:translate-y-[-5px] transition-all duration-500 relative mb-16 max-w-5xl mx-auto">
              {/* Título para toda a comparação */}
              <h3 className="text-xl font-semibold text-primary absolute -top-8 left-0 md:left-1/2 md:transform md:-translate-x-1/2">
                {/* Transformação #{index + 1} */}
              </h3>
              {/* Ícone de seta entre blocos (visível apenas em desktop) */}
              <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-black rounded-full p-2 shadow-lg shadow-primary/30 border border-primary/50">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </div>
              {/* Antes */}
              <div className="w-full md:w-[46%] bg-black rounded-3xl p-6 md:p-4 lg:p-6 border border-red-500/30 shadow-lg shadow-red-500/20 hover:shadow-red-500/30 transition-all duration-300">
                <div className="flex justify-center mb-6">
                  <div className="relative w-full h-[320px] sm:h-[400px] rounded-xl overflow-hidden border-2 border-red-500/50 shadow-lg shadow-red-500/30">
                    {/* Imagem "antes" como background */}
                    <div 
                      className={`absolute inset-0 bg-center bg-no-repeat bg-cover transition-opacity duration-500 ${isImageLoaded(item.before.image) ? 'opacity-100' : 'opacity-0'}`}
                      style={{ 
                        backgroundImage: `url(${item.before.image})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover'
                      }}
                    />
                    
                    {/* Indicador de carregamento */}
                    {!isImageLoaded(item.before.image) && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                    
                    {/* Label "Antes" */}
                    <div className="absolute left-4 top-4 z-10 bg-red-600 text-white px-4 py-2 rounded-full font-bold shadow-lg text-base">ANTES</div>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-red-500 mb-2 text-center h-8">{item.before.title}</h3>
                
                <div className="min-h-16">
                  {item.before.description && (
                    <p className="text-gray-300 text-center">{item.before.description}</p>
                  )}
                </div>
              </div>
              
              {/* Depois */}
              <div className="w-full md:w-[46%] bg-black rounded-3xl p-6 md:p-4 lg:p-6 border border-primary/30 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300">
                <div className="flex justify-center mb-6">
                  <div className="relative w-full h-[320px] sm:h-[400px] rounded-xl overflow-hidden border-2 border-primary/50 shadow-lg shadow-primary/30">
                    {/* Imagem "depois" como background */}
                    <div 
                      className={`absolute inset-0 bg-center bg-no-repeat bg-cover transition-opacity duration-500 ${isImageLoaded(item.after.image) ? 'opacity-100' : 'opacity-0'}`}
                      style={{ 
                        backgroundImage: `url(${item.after.image})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover'
                      }}
                    />
                    
                    {/* Indicador de carregamento */}
                    {!isImageLoaded(item.after.image) && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                    
                    {/* Label "Depois" */}
                    <div className="absolute right-4 top-4 z-10 bg-primary text-black px-4 py-2 rounded-full font-bold shadow-lg text-base">DEPOIS</div>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-primary mb-2 text-center h-8">{item.after.title}</h3>
                
                <div className="min-h-16">
                  {item.after.description && (
                    <p className="text-gray-300 text-center">{item.after.description}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
