import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Testimonial } from '../../types/landing';
import { Quote } from 'lucide-react';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const testimonialVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <div className="py-24 px-4 bg-gradient-to-b from-white to-gray-50">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-7xl mx-auto"
      >
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
          What Our Students Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={testimonialVariants}
              className="bg-white p-8 rounded-2xl shadow-xl relative"
            >
              <Quote className="absolute -top-6 -left-6 w-12 h-12 text-blue-500/20" />
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <div className="ml-4">
                  <h4 className="font-semibold text-lg text-gray-900">{testimonial.author}</h4>
                  <p className="text-gray-600">{testimonial.role}</p>
                  {testimonial.company && (
                    <div className="flex items-center mt-1">
                      {testimonial.company.logo && (
                        <img
                          src={testimonial.company.logo}
                          alt={testimonial.company.name}
                          className="h-4 mr-2"
                        />
                      )}
                      <span className="text-sm text-gray-500">{testimonial.company.name}</span>
                    </div>
                  )}
                </div>
              </div>
              <p className="text-lg italic text-gray-700 leading-relaxed">
                "{testimonial.quote}"
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};