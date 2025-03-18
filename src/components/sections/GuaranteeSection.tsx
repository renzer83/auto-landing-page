import React from 'react';

interface GuaranteeSectionProps {
  days?: number;
  title?: string;
  description?: string;
  image?: string;
}

export const GuaranteeSection: React.FC<GuaranteeSectionProps> = ({ 
  days = 7, 
  title = "Garantia de Satisfação", 
  description = "Se você não ficar satisfeito, devolvemos seu dinheiro. Sem perguntas.",
  image = "https://digitalmarketplaceworld.shop/wp-content/uploads/2023/12/Selo-de-Garantia-de-7-Dias-PNG-Transparente-Sem-Fundo-1024x1024-1.webp"
}) => {
  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-b from-primary/20 to-black rounded-3xl p-8 max-w-3xl mx-auto border-2 border-primary/50 shadow-xl shadow-primary/20">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/3 flex justify-center mb-8 md:mb-0">
              <img 
                src={image} 
                alt={`Garantia de ${days} dias`}
                className="w-48 h-auto drop-shadow-lg"
              />
            </div>
            
            <div className="md:w-2/3 text-center md:text-left md:pl-10">
              <h2 className="text-2xl font-bold text-primary mb-4">{title}</h2>
              <p className="text-xl font-semibold text-white mb-4">Garantia de {days} dias</p>
              <p className="text-gray-300 text-lg leading-relaxed">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
