import { LandingPageData } from '../types/landing';
import { imageCache, ImageCache } from './imageCache';

/**
 * Pré-carrega todas as imagens de um template com tratamento de erro robusto
 */
export const preloadTemplateImages = (template: LandingPageData): void => {
  if (!template) {
    console.warn('[Preloader] Template inválido para pré-carregamento de imagens');
    return;
  }
  
  try {
    // Usa o método de extração de URLs diretamente da classe ImageCache
    const imageUrls = ImageCache.extractImageUrlsFromTemplate(template);
    
    // Usar o cache para pré-carregar as imagens
    if (imageUrls.length > 0) {
      console.log(`[Preloader] Iniciando pré-carregamento de ${imageUrls.length} imagens do template...`);
      imageCache.preloadImages(imageUrls)
        .catch(error => {
          console.error('[Preloader] Erro ao pré-carregar imagens:', error);
        });
    } else {
      console.log('[Preloader] Nenhuma imagem encontrada para pré-carregar');
    }
  } catch (error) {
    console.error('[Preloader] Erro no processo de pré-carregamento:', error);
  }
};
