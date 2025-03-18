import React from 'react';
import { Users, ShoppingBag, Award, ThumbsUp } from 'lucide-react';

interface SocialProofItem {
  icon: string;
  value: string;
  label: string;
}

interface SocialProofSectionProps {
  title?: string;
  items?: SocialProofItem[];
}

export const SocialProofSection: React.FC<SocialProofSectionProps> = ({ 
  title,
  items = [
    { icon: 'users', value: '12,000+', label: 'Clientes Satisfeitos' },
    { icon: 'shopping-bag', value: '30,000+', label: 'Produtos Vendidos' },
    { icon: 'award', value: '97%', label: 'Taxa de Satisfação' },
    { icon: 'thumbs-up', value: '4.8/5', label: 'Avaliação Média' },
  ]
}) => {
  // Função para renderizar o ícone apropriado
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'users':
        return <Users className="w-10 h-10 text-primary" />;
      case 'shopping-bag':
        return <ShoppingBag className="w-10 h-10 text-primary" />;
      case 'award':
        return <Award className="w-10 h-10 text-primary" />;
      case 'thumbs-up':
        return <ThumbsUp className="w-10 h-10 text-primary" />;
      default:
        return <Award className="w-10 h-10 text-primary" />;
    }
  };

  return (
    <section className="py-12 bg-gray-900">
      <div className="container mx-auto px-4">
        {title && (
          <h2 className="text-2xl font-bold text-center text-white mb-10">{title}</h2>
        )}
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <div 
              key={index} 
              className="bg-black rounded-xl p-6 text-center border border-primary/30 shadow-md shadow-primary/10 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
            >
              <div className="flex justify-center mb-4">
                {renderIcon(item.icon)}
              </div>
              <p className="text-3xl font-bold text-primary mb-2">{item.value}</p>
              <p className="text-white">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
