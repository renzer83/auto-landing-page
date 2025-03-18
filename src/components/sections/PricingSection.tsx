import React from 'react';
import { PricingPlan } from '../../types/landing';
import { Check } from 'lucide-react';

interface PricingSectionProps {
  plans: PricingPlan[];
  colors: {
    primary: string;
    secondary: string;
  };
}

export const PricingSection: React.FC<PricingSectionProps> = ({ plans, colors }) => {
  return (
    <div className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Choose Your Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`
                relative p-8 bg-white rounded-2xl shadow-xl
                ${plan.recommended ? 'ring-2 ring-blue-500 transform scale-105' : ''}
              `}
            >
              {plan.recommended && (
                <div
                  className="absolute top-0 right-0 -translate-y-1/2 px-4 py-1 rounded-full text-sm font-semibold text-white"
                  style={{ backgroundColor: colors.secondary }}
                >
                  Recommended
                </div>
              )}
              <div className="text-2xl font-bold mb-4">{plan.name}</div>
              <div className="flex items-baseline mb-8">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="text-gray-500 ml-2">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className="w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-300 hover:opacity-90"
                style={{ backgroundColor: colors.primary }}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};