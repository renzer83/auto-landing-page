/**
 * Utilitários para rastreamento de conversões do Google Ads
 */

/**
 * Registra uma conversão de compra no Google Ads
 * Este código deve ser chamado na página de agradecimento/sucesso após a compra
 * 
 * @param value - Valor da compra
 * @param currency - Moeda (padrão: EUR)
 * @param transactionId - ID opcional da transação
 */
export const trackPurchaseConversion = (
  value: number,
  currency: string = 'EUR',
  transactionId?: string
): void => {
  try {
    // Verificar se o gtag está disponível
    if (typeof window !== 'undefined' && (window as any).gtag) {
      // Gerar um ID de transação único se não for fornecido
      const txnId = transactionId || `T-${Date.now()}`;
      
      // Registrar evento de conversão
      (window as any).gtag('event', 'conversion', {
        'send_to': 'AW-16945389449/VxRYCK2lj64aEIm_mJA_',
        'value': value,
        'currency': currency,
        'transaction_id': txnId
      });
      
      console.log('[Tracking] Conversão registrada com sucesso:', { value, currency, txnId });
      return true;
    } else {
      console.warn('[Tracking] Google Tag não está disponível');
      return false;
    }
  } catch (error) {
    console.error('[Tracking] Erro ao registrar conversão:', error);
    return false;
  }
};

/**
 * Registra um evento de carregamento de página
 * Este código deve ser chamado quando o usuário carrega a página de confirmação após a compra
 */
export const trackPageViewConversion = (): void => {
  try {
    // Verificar se o gtag está disponível
    if (typeof window !== 'undefined' && (window as any).gtag) {
      // Event snippet for Compra conversion page
      (window as any).gtag('event', 'conversion', {
        'send_to': 'AW-16945389449/VxRYCK2lj64aEIm_mJA_'
      });
      
      console.log('[Tracking] Conversão de visualização de página registrada');
    } else {
      console.warn('[Tracking] Google Tag não está disponível');
    }
  } catch (error) {
    console.error('[Tracking] Erro ao registrar conversão de visualização:', error);
  }
};

/**
 * Registra um clique em botão ou link antes da conversão
 * Este código deve ser chamado quando o usuário clica em um botão ou link para 
 * medir os cliques antes da conversão
 * 
 * @param elementId - ID opcional do elemento clicado
 * @param elementText - Texto opcional do elemento clicado
 */
export const trackClickEvent = (elementId?: string, elementText?: string): void => {
  try {
    // Verificar se o gtag está disponível
    if (typeof window !== 'undefined' && (window as any).gtag) {
      // Registrar evento de clique
      (window as any).gtag('event', 'click', {
        'send_to': 'AW-16945389449/VxRYCK2lj64aEIm_mJA_',
        'element_id': elementId || 'unknown',
        'element_text': elementText || 'unknown'
      });
      
      console.log('[Tracking] Evento de clique registrado:', { elementId, elementText });
    } else {
      console.warn('[Tracking] Google Tag não está disponível');
    }
  } catch (error) {
    console.error('[Tracking] Erro ao registrar evento de clique:', error);
  }
};
