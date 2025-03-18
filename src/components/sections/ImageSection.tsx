import React from 'react';

interface ImageSectionProps {
  url: string;
  alt: string;
}

export const ImageSection: React.FC<ImageSectionProps> = ({ url, alt }) => {
  return (
    <div className="py-8">
      <div className="max-w-4xl mx-auto px-4">
        <img
          src={url}
          alt={alt}
          className="w-full h-auto rounded-lg shadow-lg"
          loading="lazy"
        />
      </div>
    </div>
  );
};