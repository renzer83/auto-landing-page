import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface ExitIntentPopupProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  discountCode?: string;
}

export const ExitIntentPopup: React.FC<ExitIntentPopupProps> = ({
  title = "ESPERE! NÃO VÁ EMBORA!",
  description = "Queremos oferecer um desconto especial de 30% para você experimentar nossas receitas de petiscos.",
  buttonText = "APROVEITAR OFERTA ESPECIAL",
  buttonLink = "#compra",
  discountCode = "PETLOVER30"
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    // Só mostrar popup após 10 segundos na página
    const timer = setTimeout(() => {
      const handleMouseLeave = (e: MouseEvent) => {
        // Verifica se o mouse está saindo pela parte superior da página
        if (e.clientY < 5 && !hasTriggered) {
          setShowPopup(true);
          setHasTriggered(true);
          // Remove o evento para não disparar novamente
          document.removeEventListener('mouseleave', handleMouseLeave);
        }
      };

      document.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        document.removeEventListener('mouseleave', handleMouseLeave);
      };
    }, 10000);

    return () => clearTimeout(timer);
  }, [hasTriggered]);

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-xl p-6 max-w-md w-full relative border-2 border-primary animate-fade-in shadow-2xl">
        <button 
          onClick={() => setShowPopup(false)}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-primary mb-4 text-center">{title}</h2>
        <p className="text-white mb-6 text-center">{description}</p>

        {discountCode && (
          <div className="bg-gray-800 p-3 rounded-lg mb-6 text-center">
            <p className="text-gray-400 text-sm mb-1">Seu código de desconto:</p>
            <p className="text-xl font-bold text-primary tracking-wider border border-primary rounded-md py-2 bg-gray-900">{discountCode}</p>
          </div>
        )}

        <a
          href={buttonLink}
          className="block w-full bg-primary hover:bg-primary/80 text-black font-bold py-3 px-6 rounded-lg text-center text-lg transform transition-transform hover:scale-105"
          onClick={() => setShowPopup(false)}
        >
          {buttonText}
        </a>
      </div>
    </div>
  );
};
