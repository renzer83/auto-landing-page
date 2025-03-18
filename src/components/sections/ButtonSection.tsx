import React from 'react';

interface ButtonSectionProps {
  text: string;
  link: string;
  colors: {
    primary: string;
    secondary: string;
    accent?: string;
    background?: string;
  };
}

export const ButtonSection: React.FC<ButtonSectionProps> = ({ text, link, colors }) => {
  return (
    <section className="py-10 bg-black">
      <div className="container mx-auto px-4 text-center">
        <a
          href={link}
          className="inline-block bg-primary hover:bg-primary/80 text-black font-bold py-4 px-8 rounded-full text-xl transform transition-transform hover:scale-105 animate-pulse shadow-lg shadow-primary/30"
        >
          {text}
        </a>
      </div>
    </section>
  );
};
