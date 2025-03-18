import React from 'react';
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

export const LandingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = React.useState<LandingPageData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        // Simular tempo de carregamento
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Carregar o template com base no ID da URL
        const templateId = id || 'digital-marketing'; // Template padrão se não tiver ID
        const templateData = loadTemplate(templateId);
        
        if (templateData) {
          setData(templateData);
          setLoading(false);
        } else {
          setError('Template não encontrado');
          setLoading(false);
        }
      } catch (err) {
        setError('Falha ao carregar os dados da landing page');
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <p className="text-red-500 text-xl">{error || 'Falha ao carregar conteúdo'}</p>
      </div>
    );
  }

  const renderSection = (section: Section) => {
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
