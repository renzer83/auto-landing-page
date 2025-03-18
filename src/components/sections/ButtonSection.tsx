import React from 'react';

interface ButtonSectionProps {
  text: string;
  link: string;
  colors: {
    primary: string;
    secondary: string;
  };
}

export const ButtonSection: React.FC<ButtonSectionProps> = ({ text, link, colors }) => {
  return (
    <div className="py-8 text-center">
      <a
        href={link}
        className="inline-block px-8 py-4 text-lg font-semibold text-white rounded-full transition-all duration-300 hover:scale-105"
        style={{ backgroundColor: colors.primary }}
        target="_blank"
        rel="noopener noreferrer"
      >
        {text}
      </a>
    </div>
  );
};