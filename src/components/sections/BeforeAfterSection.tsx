import React from 'react';

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
  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        {title && (
          <h2 className="text-3xl font-bold text-center text-primary mb-12">{title}</h2>
        )}
        
        <div className="space-y-24">
          {items.map((item, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-6 transform hover:translate-y-[-5px] transition-all duration-500 relative">
              {/* Título para toda a comparação */}
              <h3 className="text-xl font-semibold text-primary absolute -top-8 left-0 md:left-1/2 md:transform md:-translate-x-1/2">
                Transformação #{index + 1}
              </h3>
              {/* Ícone de seta entre blocos (visível apenas em desktop) */}
              <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-black rounded-full p-2 shadow-lg shadow-primary/30 border border-primary/50">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </div>
              {/* Antes */}
              <div className="flex-1 bg-black rounded-3xl p-6 md:mr-8 mb-8 md:mb-0 border border-red-500/30 shadow-lg shadow-red-500/20 hover:shadow-red-500/30 transition-all duration-300">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <img
                      src={item.before.image}
                      alt={`Antes: ${item.before.title}`}
                      className="rounded-xl w-full h-64 object-cover transition-opacity duration-300 hover:opacity-90 border-2 border-red-500/30"
                      onError={(e) => {
                        // Fallback para imagem genérica em caso de erro
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1572883475077-c8d84b7e2241';
                      }}
                    />
                    <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-1 rounded-full">
                      ANTES
                    </div>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-red-500 mb-2 text-center">{item.before.title}</h3>
                
                {item.before.description && (
                  <p className="text-gray-300 text-center">{item.before.description}</p>
                )}
              </div>
              
              {/* Depois */}
              <div className="flex-1 bg-black rounded-3xl p-6 md:ml-8 border border-primary/30 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 transform hover:scale-[1.01]">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <img
                      src={item.after.image}
                      alt={`Depois: ${item.after.title}`}
                      className="rounded-xl w-full h-64 object-cover transition-opacity duration-300 hover:opacity-90 border-2 border-primary/30"
                      onError={(e) => {
                        // Fallback para imagem genérica em caso de erro
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1566847438217-76e82d383f84';
                      }}
                    />
                    <div className="absolute top-4 right-4 bg-primary text-black px-4 py-1 rounded-full">
                      DEPOIS
                    </div>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-primary mb-2 text-center">{item.after.title}</h3>
                
                {item.after.description && (
                  <p className="text-gray-300 text-center">{item.after.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
