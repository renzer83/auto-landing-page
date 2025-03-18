import React from 'react';
import { Testimonial } from '../../types/landing';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-gray-900 rounded-3xl overflow-hidden border-2 border-primary/50 shadow-lg shadow-primary/20 transform transition-transform hover:scale-[1.02]"
            >
              {testimonial.image && (
                <img 
                  src={testimonial.image} 
                  alt={testimonial.author || `Depoimento ${index + 1}`}
                  className="w-full h-auto rounded-t-3xl"
                />
              )}
              
              {testimonial.quote && (
                <div className="p-6">
                  <p className="text-gray-300 italic mb-4">"{testimonial.quote}"</p>
                  
                  <div className="flex items-center">
                    {testimonial.avatar && (
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.author}
                        className="w-12 h-12 rounded-full mr-4 object-cover"
                      />
                    )}
                    
                    <div>
                      <p className="text-white font-semibold">{testimonial.author}</p>
                      {testimonial.role && (
                        <p className="text-primary text-sm">{testimonial.role}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
