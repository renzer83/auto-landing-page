import React from 'react';

interface HTMLSectionProps {
  htmlContent: string;
}

export const HTMLSection: React.FC<HTMLSectionProps> = ({ htmlContent }) => {
  return (
    <section className="py-8">
      <div 
        className="container mx-auto px-4"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </section>
  );
};
