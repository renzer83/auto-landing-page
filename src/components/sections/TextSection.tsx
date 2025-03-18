import React from 'react';

interface TextSectionProps {
  content: string;
}

export const TextSection: React.FC<TextSectionProps> = ({ content }) => {
  return (
    <div className="py-8 px-4">
      <p className="text-lg leading-relaxed max-w-3xl mx-auto text-gray-700">
        {content}
      </p>
    </div>
  );
};