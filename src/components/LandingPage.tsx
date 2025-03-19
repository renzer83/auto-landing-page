import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { TextSection } from './sections/TextSection';
import { ImageSection } from './sections/ImageSection';
import { ButtonSection } from './sections/ButtonSection';
import { HeroSection } from './sections/HeroSection';
import { FeaturesSection } from './sections/FeaturesSection';
import { TestimonialsSection } from './sections/TestimonialsSection';
import { StatsSection } from './sections/StatsSection';
import { PricingSection } from './sections/PricingSection';
import { TeamSection } from './sections/TeamSection';
import { NewsletterSection } from './sections/NewsletterSection';
import { ContactSection } from './sections/ContactSection';
import { BonusesSection } from './sections/BonusesSection';
import { FAQSection } from './sections/FAQSection';
import { VideoSection } from './sections/VideoSection';
import { HTMLSection } from './sections/HTMLSection';
import { GuaranteeSection } from './sections/GuaranteeSection';
import { CheckoutSection } from './sections/CheckoutSection';
import { SocialProofSection } from './sections/SocialProofSection';
import { BeforeAfterSection } from './sections/BeforeAfterSection';
import { CountdownSection } from './sections/CountdownSection';
import { FloatingCTASection } from './sections/FloatingCTASection';
import { FloatingNotifications } from './sections/FloatingNotifications';
import { WhatsAppButton } from './sections/WhatsAppButton';
import { ExitIntentPopup } from './sections/ExitIntentPopup';
import { FooterSection } from './sections/FooterSection';
import { LandingPageData, Section } from '../types/landing';
import { Loader2 } from 'lucide-react';
import { loadTemplate } from '../utils/templateLoader';
import { preloadTemplateImages } from '../utils/preloadTemplateImages';

export const LandingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<LandingPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imagesPreloaded, setImagesPreloaded] = useState(false);

  // Memorizando o ID do template para evitar recálculos desnecessários
  const templateId = useMemo(() => id || 'digital-marketing', [id]);
  
  // Função para verificar e corrigir problemas com CSS Variáveis
  const ensureCSSVariables = () => {
    try {
      const root = document.documentElement;
      
      // Verifica se as variáveis CSS existem, se não existirem, define valores padrão
      if (!getComputedStyle(root).getPropertyValue('--primary').trim()) {
        root.style.setProperty('--primary', '#00FFC6');
      }
      
      if (!getComputedStyle(root).getPropertyValue('--secondary').trim()) {
        root.style.setProperty('--secondary', '#111111');
      }
      
      if (!getComputedStyle(root).getPropertyValue('--accent').trim()) {
        root.style.setProperty('--accent', '#FFFD00');
      }
    } catch (e) {
      console.error('Erro ao verificar variáveis CSS:', e);
    }
  };

  // Carrega o template do localStorage se disponível
  const loadCachedTemplate = (): LandingPageData | null => {
    try {
      const cachedData = localStorage.getItem(`template_${templateId}`);
      if (cachedData) {
        return JSON.parse(cachedData);
      }
    } catch (err) {
      console.error('Erro ao carregar template do cache:', err);
    }
    return null;
  };

  // Salva o template no localStorage
  const cacheTemplate = (template: LandingPageData): void => {
    try {
      localStorage.setItem(`template_${templateId}`, JSON.stringify(template));
      
      // Define um tempo de expiração (24h)
      const expireTime = Date.now() + (24 * 60 * 60 * 1000);
      localStorage.setItem(`template_${templateId}_expire`, expireTime.toString());
    } catch (err) {
      console.error('Erro ao salvar template no cache:', err);
    }
  };

  // Verificar se o cache expirou
  const isTemplateExpired = (): boolean => {
    try {
      const expireTime = localStorage.getItem(`template_${templateId}_expire`);
      if (expireTime) {
        return parseInt(expireTime) < Date.now();
      }
    } catch (err) {
      console.error('Erro ao verificar expiração do template:', err);
    }
    return true; // Se houver erro, considerar como expirado
  };

  // Função para limpar todo o cache em caso de problemas
  const clearAllCache = (): void => {
    try {
      // Limpa apenas chaves relacionadas a templates
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('template_') || key.startsWith('landing_image_cache')) {
          localStorage.removeItem(key);
        }
      });
      console.log('Cache limpo com sucesso');
    } catch (e) {
      console.error('Erro ao limpar cache:', e);
    }
  };

  // useEffect para garantir que as variáveis CSS estejam sempre definidas
  useEffect(() => {
    // Verificar e corrigir variáveis CSS quando o componente montar
    ensureCSSVariables();
    
    // Também verificar quando o estado de loading mudar
    const interval = setInterval(ensureCSSVariables, 1000);
    
    return () => clearInterval(interval);
  }, [loading]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Tenta detectar corrupção no localStorage
        let hasStorageError = false;
        try {
          const testKey = 'test_storage_' + Date.now();
          localStorage.setItem(testKey, 'test');
          localStorage.removeItem(testKey);
        } catch (storageErr) {
          console.error('Problema com localStorage detectado:', storageErr);
          hasStorageError = true;
          clearAllCache(); // Limpa o cache em caso de problemas
        }
        
        // Verifica se há uma versão em cache válida
        const cachedTemplate = !hasStorageError ? loadCachedTemplate() : null;
        
        if (cachedTemplate && !isTemplateExpired()) {
          console.log('Carregando template do cache local...');
          setData(cachedTemplate);
          setLoading(false);
          
          // Pré-carrega as imagens em segundo plano para melhorar a próxima visualização
          try {
            preloadTemplateImages(cachedTemplate);
            setImagesPreloaded(true);
          } catch (preloadErr) {
            console.warn('Erro no pré-carregamento de imagens do cache:', preloadErr);
          }
        } else {
          console.log('Carregando template novo...');
          
          // Carregar o template com base no ID da URL
          const templateData = loadTemplate(templateId);
          
          if (templateData) {
            // Tenta salvar o template no cache para futuras visitas
            try {
              if (!hasStorageError) {
                cacheTemplate(templateData);
              }
            } catch (cacheErr) {
              console.warn('Não foi possível salvar template em cache:', cacheErr);
            }
            
            setData(templateData);
            setLoading(false);
            
            // Pré-carrega as imagens
            try {
              preloadTemplateImages(templateData);
              setImagesPreloaded(true);
            } catch (preloadErr) {
              console.warn('Erro no pré-carregamento de imagens:', preloadErr);
            }
          } else {
            setError('Template não encontrado');
            setLoading(false);
          }
        }
      } catch (err) {
        console.error('Erro fatal ao carregar landing page:', err);
        setError('Falha ao carregar os dados da landing page');
        setLoading(false);
        
        // Em caso de erro grave, tenta limpar o cache
        clearAllCache();
      }
    };

    fetchData();
  }, [templateId]);

  // Memoização da renderização de seções para melhorar a performance
  const renderSection = useMemo(() => {
    return (section: Section) => {
      if (!data) return null;
      
      switch (section.type) {
        case 'hero':
          return data.hero && <HeroSection data={data.hero} />;
        case 'stats':
          return data.stats && <StatsSection stats={data.stats} />;
        case 'features':
          return data.features && <FeaturesSection features={data.features} />;
        case 'pricing':
          return data.pricing && <PricingSection plans={data.pricing} colors={data.colors} />;
        case 'team':
          return data.team && <TeamSection team={data.team} />;
        case 'testimonials':
          return data.testimonials && <TestimonialsSection testimonials={data.testimonials} />;
        case 'newsletter':
          return <NewsletterSection />;
        case 'contact':
          return <ContactSection />;
        case 'text':
          return section.content && (
            <TextSection 
              content={section.content} 
              backgroundColor={section.backgroundColor} 
              textColor={section.textColor} 
              borderColor={section.borderColor}
            />
          );
        case 'image':
          return section.url && section.alt && (
            <ImageSection url={section.url} alt={section.alt} />
          );
        case 'button':
          return section.text && section.link && (
            <ButtonSection
              text={section.text}
              link={section.link}
              colors={data.colors}
            />
          );
        case 'bonuses':
          return data.bonuses && (
            <BonusesSection 
              bonuses={data.bonuses} 
              title={section.title || section.text || "Bônus Exclusivos"}
            />
          );
        case 'faqs':
          return data.faqs && (
            <FAQSection 
              faqs={data.faqs} 
              title={section.title || section.text || "Perguntas Frequentes"}
            />
          );
        case 'video':
          return data.videos && (
            <VideoSection 
              videos={data.videos} 
              title={section.title || section.text}
            />
          );
        case 'html':
          return section.htmlContent && (
            <HTMLSection htmlContent={section.htmlContent} />
          );
        case 'guarantee':
          return (
            <GuaranteeSection 
              days={section.days} 
              title={section.title || section.text || "Nossa Garantia"}
              description={section.content}
              image={section.guaranteeImage}
            />
          );
        case 'checkout':
          return (
            <CheckoutSection 
              productName={data.title}
              price={section.price || 27.00}
              originalPrice={section.originalPrice}
              buttonText={section.text || "COMPRAR AGORA"}
              buttonLink={section.link || "#"}
              installments={section.installments || `ou até 3x de ${((section.price || 27.00) / 3).toFixed(2)} no cartão de crédito`}
              paymentMethods={section.paymentMethods}
              securityBadgeUrl={section.securityBadgeUrl}
            />
          );
        case 'social-proof':
          return data.socialProof && (
            <SocialProofSection 
              items={data.socialProof}
              title={section.title || section.text}
            />
          );
        case 'before-after':
          return data.beforeAfter && (
            <BeforeAfterSection 
              items={data.beforeAfter}
              title={section.title || section.text}
            />
          );
        case 'countdown':
          return data.countdown && (
            <CountdownSection 
              title={data.countdown.title || section.title || "ESTA OFERTA ACABA EM:"}
              endTime={data.countdown.endTime}
              hoursToAdd={data.countdown.hoursToAdd}
            />
          );
        case 'footer':
          return (
            <FooterSection
              data={data.footer}
              colors={data.colors}
            />
          );
        default:
          return null;
      }
    };
  }, [data]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="flex flex-col items-center">
          <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
          <p className="text-primary">Carregando landing page...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    console.error('Erro na landing page:', error);
    // Tenta usar um template de fallback em caso de erro
    const fallbackTemplate = loadTemplate('digital-marketing');
    
    if (fallbackTemplate) {
      console.log('Usando template de fallback');
      return (
        <div 
          className="min-h-screen"
          style={{ 
            backgroundColor: fallbackTemplate.colors.background || '#000000',
            '--primary': fallbackTemplate.colors.primary,
            '--secondary': fallbackTemplate.colors.secondary,
            '--accent': fallbackTemplate.colors.accent || fallbackTemplate.colors.primary
          } as React.CSSProperties}
        >
          <div className="container mx-auto px-4 py-16 text-center text-primary">
            <h1 className="text-3xl font-bold mb-4">Houve um problema ao carregar o conteúdo</h1>
            <p className="mb-8">{error || 'Falha ao carregar dados. Tente recarregar a página.'}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-primary text-black px-6 py-2 rounded-full hover:opacity-90 transition-opacity"
            >
              Recarregar Página
            </button>
          </div>
        </div>
      );
    }
    
    // Fallback absoluto se nem o template padrão estiver disponível
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center p-8">
          <p className="text-red-500 text-xl mb-6">{error || 'Falha ao carregar conteúdo'}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen"
      style={{ 
        backgroundColor: data.colors.background || '#000000',
        '--primary': data.colors.primary,
        '--secondary': data.colors.secondary,
        '--accent': data.colors.accent || data.colors.primary
      } as React.CSSProperties}
    >
      {data.sections.map((section, index) => (
        <div key={index} className="scroll-mt-20" id={section.type}>
          {renderSection(section)}
        </div>
      ))}
      
      {/* CTA Flutuante */}
      <FloatingCTASection
        buttonText="🐾 QUERO GARANTIR AGORA! 🐾"
        buttonLink="#compra"
        showAfterScroll={800}
      />
      
      {/* Notificações Flutuantes */}
      <FloatingNotifications position="bottom-left" />
      
      {/* Botão do WhatsApp */}
      {/* <WhatsAppButton phoneNumber="+5511999999999" position="bottom-right" /> */}
      
      {/* Popup de Saída */}
      <ExitIntentPopup discountCode="POWERPET30" />
    </div>
  );
};
