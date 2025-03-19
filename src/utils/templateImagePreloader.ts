import { LandingPageData } from '../types/landing';
import { imageCache, ImageCache } from './imageCache';

/**
 * @deprecated Use preloadTemplateImages de preloadTemplateImages.ts em vez disso
 * Este arquivo existe apenas por compatibilidade com código mais antigo.
 */
export async function preloadTemplateImages(templateData: LandingPageData): Promise<void> {
  if (!templateData) {
    console.warn('[Preloader Legado] Template inválido para pré-carregamento');
    return;
  }
  
  try {
    console.warn('[Preloader Legado] Esta função está obsoleta, use o módulo preloadTemplateImages.ts');
    // Extrair URLs e pré-carregar usando a classe de cache atualizada
    const imageUrls = ImageCache.extractImageUrlsFromTemplate(templateData);
  
    if (imageUrls.length > 0) {
      console.log(`[Preloader Legado] Pré-carregando ${imageUrls.length} imagens...`);
      await imageCache.preloadImages(imageUrls);
    }
  } catch (error) {
    console.error('[Preloader Legado] Erro:', error);
  }
}