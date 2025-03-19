import React from 'react';
import { FooterSettings } from '../../types/landing';
import { CachedImage } from '../common/CachedImage';

interface FooterSectionProps {
  data?: FooterSettings;
  colors?: {
    primary: string;
    secondary: string;
    accent?: string;
    background?: string;
  };
}

export const FooterSection: React.FC<FooterSectionProps> = ({ 
  data, 
  colors 
}) => {
  // Usar valores padrão quando os dados não forem fornecidos
  const companyName = data?.companyName || 'Company Name';
  const logo = data?.logo;
  const links = data?.links || [];
  const socialLinks = data?.socialLinks || [];
  const copyright = data?.copyright || `© ${new Date().getFullYear()} ${companyName}. Todos os direitos reservados.`;
  const disclaimer = data?.disclaimer || '';
  const columns = data?.columns || [];
  
  // Cores customizadas ou padrão
  const backgroundColor = data?.backgroundColor || colors?.secondary || '#111111';
  const textColor = data?.textColor || colors?.primary || '#ffffff';

  return (
    <footer className="pt-16 pb-8" style={{ backgroundColor, color: textColor }}>
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          {/* Coluna com logo e informações da empresa */}
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            {logo && (
              <div className="mb-6 h-16 flex">
                <CachedImage 
                  src={logo} 
                  alt={companyName} 
                  className="h-16"
                  width="auto"
                  height="64"
                  objectFit="contain"
                />
              </div>
            )}
            <h3 className="text-xl font-bold mb-4">{companyName}</h3>
            
            {/* Links de redes sociais */}
            {socialLinks.length > 0 && (
              <div className="flex space-x-4 mt-6">
                {socialLinks.map((social, index) => (
                  <a 
                    key={index} 
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-current hover:text-primary transition-colors"
                  >
                    <div className="w-6 h-6">
                      <CachedImage 
                        src={social.icon} 
                        alt="Social Media" 
                        className="w-6 h-6"
                        width="24"
                        height="24"
                        objectFit="contain"
                      />
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
          
          {/* Colunas de links dinâmicas */}
          {columns.map((column, columnIndex) => (
            <div key={columnIndex} className="w-full md:w-1/6 mb-8 md:mb-0">
              <h4 className="text-lg font-semibold mb-4">{column.title}</h4>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href={link.url} 
                      className="hover:underline opacity-80 hover:opacity-100 transition-opacity"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          {/* Links simples ao invés de colunas (quando não há colunas definidas) */}
          {columns.length === 0 && links.length > 0 && (
            <div className="w-full md:w-1/4 mb-8 md:mb-0">
              <h4 className="text-lg font-semibold mb-4">Links</h4>
              <ul className="space-y-2">
                {links.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.url} 
                      className="hover:underline opacity-80 hover:opacity-100 transition-opacity"
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <hr className="border-t border-current opacity-10 my-8" />
        
        {/* Copyright e disclaimer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 text-sm opacity-80">
            {copyright}
          </div>
          
          {disclaimer && (
            <div className="text-xs opacity-60 max-w-3xl text-center md:text-right">
              {disclaimer}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};
