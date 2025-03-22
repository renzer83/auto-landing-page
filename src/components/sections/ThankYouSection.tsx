import React, { useEffect } from 'react';
import { trackPageViewConversion } from '../../utils/tracking/conversionTracking';

interface ThankYouSectionProps {
  title?: string;
  message?: string;
  orderNumber?: string;
  productName?: string;
  customerName?: string;
  customerEmail?: string;
  backgroundColor?: string;
  textColor?: string;
}

/**
 * Componente de página de agradecimento após uma compra bem-sucedida
 * Este componente automaticamente dispara o evento de conversão do Google Ads ao ser montado
 */
export const ThankYouSection: React.FC<ThankYouSectionProps> = (props) => {
  const {
    title = "Obrigado pela sua compra!",
    message = "Seu pedido foi recebido e está sendo processado. Você receberá um e-mail com os detalhes em breve.",
    orderNumber,
    productName,
    customerName,
    customerEmail,
    backgroundColor = "bg-black",
    textColor = "text-white"
  } = props;

  // Registrar o evento de conversão quando o componente é montado
  useEffect(() => {
    // Rastrear visualização da página como conversão
    trackPageViewConversion();
  }, []);

  return (
    <section className={`py-16 ${backgroundColor}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Ícone de Sucesso */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* Título e Mensagem */}
          <h2 className={`text-4xl font-bold mb-6 ${textColor}`}>{title}</h2>
          <p className={`text-xl mb-8 ${textColor} opacity-80`}>{message}</p>

          {/* Detalhes do Pedido */}
          <div className="bg-gradient-to-b from-primary/30 to-black rounded-3xl p-8 mb-8 border-2 border-primary shadow-xl shadow-primary/30">
            <h3 className={`text-2xl font-semibold mb-4 ${textColor}`}>
              Detalhes do Pedido
            </h3>
            
            {orderNumber && (
              <div className="mb-3">
                <span className={`${textColor} opacity-70`}>Número do Pedido: </span>
                <span className={`font-medium ${textColor}`}>{orderNumber}</span>
              </div>
            )}
            
            {productName && (
              <div className="mb-3">
                <span className={`${textColor} opacity-70`}>Produto: </span>
                <span className={`font-medium ${textColor}`}>{productName}</span>
              </div>
            )}
            
            {customerName && (
              <div className="mb-3">
                <span className={`${textColor} opacity-70`}>Nome: </span>
                <span className={`font-medium ${textColor}`}>{customerName}</span>
              </div>
            )}
            
            {customerEmail && (
              <div className="mb-3">
                <span className={`${textColor} opacity-70`}>Email: </span>
                <span className={`font-medium ${textColor}`}>{customerEmail}</span>
              </div>
            )}
          </div>

          {/* Botões de Ação */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/"
              className="px-8 py-3 bg-primary text-black font-semibold rounded-full hover:opacity-90 transition-opacity"
            >
              Voltar para Home
            </a>
            
            <a
              href="/contact"
              className="px-8 py-3 bg-transparent border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary/10 transition-colors"
            >
              Suporte
            </a>
          </div>
        </div>
      </div>
      
      {/* Script de evento de conversão do Google - Adicionado diretamente no HTML para garantir execução */}
      <div dangerouslySetInnerHTML={{
        __html: `
          <!-- Event snippet for Compra conversion page -->
          <script>
            if (typeof gtag === 'function') {
              gtag('event', 'conversion', {
                'send_to': 'AW-16945389449/VxRYCK2lj64aEIm_mJA_',
                'transaction_id': ''
              });
            }
          </script>
        `
      }} />
    </section>
  );
};

export default ThankYouSection;
