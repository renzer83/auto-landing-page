import React from 'react';
import { Testimonial } from '../../types/landing';
import { CachedImage } from '../common/CachedImage';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  // Agora mostraremos todos os testemunhos em uma única linha
  const allTestimonials = testimonials;
  
  // Removemos a navegação pois agora mostraremos todos os testemunhos de uma vez

  return (
    <section className="py-24 bg-black relative">
      <div className="absolute inset-0 opacity-30 bg-gradient-to-b from-primary/10 to-transparent"></div>
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <h2 className="text-4xl font-bold text-white text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">O que estão dizendo</h2>
        {/* Linha de testemunhos */}
        <div className="flex flex-nowrap space-x-6 overflow-x-auto pb-6 scrollbar-hide justify-start pl-4 pr-4 md:pl-0">
          {allTestimonials.map((testimonial, index) => (
            <div 
              key={`testimonial-${index}`}
              className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-700 shadow-lg shadow-black/30 transform transition-all hover:translate-y-[-5px] flex flex-col flex-shrink-0 w-[280px] md:w-[320px]"
            >
              {/* Imagem principal - mostra a captura de tela completa */}
              {testimonial.image && (
                <div className="w-full overflow-hidden">
                  <img 
                    src={testimonial.image} 
                    alt="Captura de tela do WhatsApp" 
                    className="w-full h-auto"
                  />
                </div>
              )}

              {/* Informações do cliente */}
              <div className="bg-gray-900 p-4">
                {testimonial.quote && (
                  <p className="text-base text-gray-300 italic mb-3">"{testimonial.quote}"</p>
                )}
                
                <div className="flex items-center">
                  {testimonial.avatar && (
                    <div className="w-10 h-10 rounded-full overflow-hidden mr-3 border border-gray-700">
                      <CachedImage 
                        src={testimonial.avatar} 
                        alt={testimonial.author}
                        className="w-full h-full"
                        objectFit="cover"
                        width="40"
                        height="40"
                      />
                    </div>
                  )}
                  
                  <div>
                    <p className="text-white font-bold text-sm">{testimonial.author}</p>
                    {testimonial.role && (
                      <p className="text-primary text-xs">{testimonial.role}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Instruções para scroll em dispositivos móveis */}
        <div className="text-center mt-6 text-gray-400 text-sm md:hidden">
          <span className="inline-flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            Arraste para ver mais testemunhos
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </span>
        </div>
      </div>
    </section>
  );
};