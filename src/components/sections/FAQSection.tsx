import React, { useState } from 'react';
import { FAQ } from '../../types/landing';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQSectionProps {
  faqs: FAQ[];
  title?: string;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ faqs, title }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto px-4">
        {title && (
          <h2 className="text-3xl font-bold text-center text-primary mb-12">{title}</h2>
        )}
        
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4 overflow-hidden rounded-xl border-2 border-primary/30 shadow-lg shadow-primary/20">
              <button
                className={`flex justify-between items-center w-full p-5 bg-gray-900 text-white focus:outline-none transition-colors ${openIndex === index ? 'bg-gray-800' : ''}`}
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg font-semibold text-left text-primary">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="h-6 w-6 text-primary flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-6 w-6 text-primary flex-shrink-0" />
                )}
              </button>
              
              <div 
                className={`transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                } overflow-hidden`}
              >
                <div className="p-5 bg-gray-800 text-gray-300 border-t border-primary/30">
                  <p>{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
