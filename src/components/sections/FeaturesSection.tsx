import React from 'react';
import { FeatureCard } from '../../types/landing';

interface FeaturesSectionProps {
  features: FeatureCard[];
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ features }) => {
  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-gradient-to-b from-primary to-black rounded-3xl p-6 border border-primary/30 shadow-lg shadow-primary/20 flex flex-col items-center transform transition-transform hover:scale-[1.02]"
            >
              {feature.image ? (
                <img 
                  src={feature.image} 
                  alt={feature.title} 
                  className="w-44 h-auto mb-6"
                />
              ) : feature.icon && (
                <div className="w-16 h-16 text-primary mb-4">
                  <img 
                    src={feature.icon}
                    alt=""
                    className="w-full h-full"
                  />
                </div>
              )}
              
              <h3 className="text-xl font-bold text-accent mb-4 text-center">{feature.title}</h3>
              <p className="text-gray-300 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
