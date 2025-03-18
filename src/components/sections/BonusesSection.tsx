import React from 'react';
import { Bonus } from '../../types/landing';

interface BonusesSectionProps {
  bonuses: Bonus[];
  title?: string;
}

export const BonusesSection: React.FC<BonusesSectionProps> = ({ bonuses, title }) => {
  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto px-4">
        {title && (
          <h2 className="text-3xl font-bold text-center text-primary mb-12">{title}</h2>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {bonuses.map((bonus, index) => (
            <div 
              key={index}
              className="bg-gradient-to-b from-primary/20 to-black rounded-3xl p-6 flex flex-col items-center border border-primary/50 shadow-lg shadow-primary/20 transform transition-transform hover:scale-[1.02]"
            >
              <div className="flex flex-col md:flex-row items-center mb-4">
                <img 
                  src={bonus.image} 
                  alt={bonus.title}
                  className="w-40 h-auto mb-4 md:mb-0 md:mr-6"
                />
                <div>
                  <h3 className="text-2xl font-semibold text-primary mb-2 text-center md:text-left">{bonus.title}</h3>
                  <p className="text-gray-300 text-center md:text-left">{bonus.description}</p>
                </div>
              </div>
              
              {bonus.originalPrice && (
                <div className="mt-auto w-full pt-4">
                  <p className="text-red-500 line-through text-center font-bold">
                    De R${bonus.originalPrice.toFixed(2)}
                  </p>
                  <p className="text-primary text-3xl font-bold text-center">
                    Por R${bonus.currentPrice ? bonus.currentPrice.toFixed(2) : '0,00'}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
