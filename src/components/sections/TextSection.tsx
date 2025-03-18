import React from 'react';

interface TextSectionProps {
  content: string;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
}

export const TextSection: React.FC<TextSectionProps> = ({ 
  content, 
  backgroundColor,
  textColor,
  borderColor
}) => {
  // Verificar se o conteúdo tem tags HTML
  const hasHtml = /<[a-z][\s\S]*>/i.test(content);
  
  // Criar estilos com base nas propriedades
  const sectionStyle = {
    backgroundColor: backgroundColor || 'transparent',
    color: textColor || 'inherit',
    borderColor: borderColor || 'transparent'
  };
  
  return (
    <section 
      className="py-8 border-t border-b" 
      style={sectionStyle}
    >
      <div className="container mx-auto px-4">
        {hasHtml ? (
          <div 
            className="prose prose-lg max-w-none mx-auto"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        ) : (
          <div className="text-center">
            <p className="text-xl md:text-2xl">{content}</p>
          </div>
        )}
      </div>
    </section>
  );
};
