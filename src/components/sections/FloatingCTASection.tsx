import React, { useState, useEffect } from 'react';

interface FloatingCTASectionProps {
  buttonText: string;
  buttonLink: string;
  showAfterScroll?: number; // pixels scrolled before showing
}

export const FloatingCTASection: React.FC<FloatingCTASectionProps> = ({
  buttonText,
  buttonLink,
  showAfterScroll = 300
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > showAfterScroll) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showAfterScroll]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 flex justify-center items-center px-4">
      <a
        href={buttonLink}
        className="inline-block bg-primary hover:bg-primary/80 text-black font-bold py-3 px-6 rounded-full text-lg transform transition-transform hover:scale-105 animate-pulse shadow-lg shadow-primary/50 whitespace-nowrap"
      >
        {buttonText}
      </a>
    </div>
  );
};
