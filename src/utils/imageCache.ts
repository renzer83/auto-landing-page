export class ImageCache {
  private static instance: ImageCache;
  private cache: Map<string, string>;
  private storageKey = 'landing_image_cache';
  private storageExpireKey = 'landing_image_cache_expire';
  private cacheExpiration = 24 * 60 * 60 * 1000; // 24 horas em milissegundos
  
  private constructor() {
    this.cache = new Map<string, string>();
    this.loadFromStorage();
  }
  
  public static getInstance(): ImageCache {
    if (!ImageCache.instance) {
      ImageCache.instance = new ImageCache();
    }
    return ImageCache.instance;
  }
  
  // Carrega o cache do localStorage
  private loadFromStorage(): void {
    try {
      // Verificar se o cache expirou
      const expireTime = localStorage.getItem(this.storageExpireKey);
      const now = Date.now();
      
      if (expireTime && parseInt(expireTime) < now) {
        // Cache expirou, limpar
        localStorage.removeItem(this.storageKey);
        localStorage.removeItem(this.storageExpireKey);
        return;
      }
      
      const cachedData = localStorage.getItem(this.storageKey);
      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        Object.keys(parsedData).forEach(key => {
          this.cache.set(key, parsedData[key]);
        });
      }
    } catch (error) {
      console.error('Erro ao carregar cache de imagens:', error);
      // Em caso de erro, limpa o cache para evitar problemas
      localStorage.removeItem(this.storageKey);
      localStorage.removeItem(this.storageExpireKey);
    }
  }
  
  // Salva o cache no localStorage
  private saveToStorage(): void {
    try {
      // Limita o tamanho do cache para evitar estouro do localStorage
      const maxEntries = 20; // Número máximo de imagens para cache
      
      // Se ultrapassar o limite, remove as entradas mais antigas
      if (this.cache.size > maxEntries) {
        console.log(`[ImageCache] Limitando cache de ${this.cache.size} para ${maxEntries} entradas`);
        const entries = Array.from(this.cache.entries());
        const entriesToKeep = entries.slice(-maxEntries); // Mantém apenas as últimas entradas (mais recentes)
        
        // Reinicia o cache com as entradas selecionadas
        this.cache.clear();
        entriesToKeep.forEach(([key, value]) => {
          this.cache.set(key, value);
        });
      }
      
      const cacheObject: Record<string, string> = {};
      this.cache.forEach((value, key) => {
        cacheObject[key] = value;
      });
      
      const jsonString = JSON.stringify(cacheObject);
      
      // Verifica se o tamanho do JSON excede o limite do localStorage (geralmente 5-10MB)
      if (jsonString.length > 4 * 1024 * 1024) { // Limita a 4MB para segurança
        console.warn(`[ImageCache] Cache muito grande (${Math.round(jsonString.length / 1024 / 1024)}MB), salvando apenas metade das entradas`);
        
        // Salva apenas metade das entradas para evitar estourar o localStorage
        const entries = Array.from(this.cache.entries());
        const halfEntries = entries.slice(Math.floor(entries.length / 2));
        
        const reducedCache: Record<string, string> = {};
        halfEntries.forEach(([key, value]) => {
          reducedCache[key] = value;
        });
        
        localStorage.setItem(this.storageKey, JSON.stringify(reducedCache));
      } else {
        localStorage.setItem(this.storageKey, jsonString);
      }
      
      localStorage.setItem(this.storageExpireKey, (Date.now() + this.cacheExpiration).toString());
    } catch (error) {
      console.error('Erro ao salvar cache de imagens:', error);
      // Tenta limpar o cache para resolver
      this.clearCache();
    }
  }
  
  // Retorna uma URL de imagem do cache ou carrega se não existir
  public async getImage(url: string): Promise<string> {
    // Se a URL estiver vazia ou inválida, retorna um placeholder
    if (!url || typeof url !== 'string') {
      console.warn('URL de imagem inválida:', url);
      return 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'; // Imagem transparente de 1x1 pixel
    }
    
    // Se já estiver no cache de memória, retorna imediatamente
    if (this.cache.has(url)) {
      console.log(`[ImageCache] Usando imagem em cache: ${url.substring(0, 50)}...`);
      return this.cache.get(url)!;
    }
    
    // Se a URL não for do endpoint do backend, retorna a URL original
    if (!url.includes('api.finditbuy.com/api/images/pub')) {
      return url;
    }
    
    try {
      console.log(`[ImageCache] Carregando imagem do servidor: ${url.substring(0, 50)}...`);
      // Carrega a imagem com timeout de 5 segundos
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }
      
      const blob = await response.blob();
      
      // Converte para Data URL
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          try {
            const dataUrl = reader.result as string;
            this.cache.set(url, dataUrl);
            this.saveToStorage();
            resolve(dataUrl);
          } catch (e) {
            console.error('Erro ao processar imagem carregada:', e);
            reject(e);
          }
        };
        reader.onerror = (e) => {
          console.error('Erro ao ler blob de imagem:', e);
          reject(e);
        };
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error(`Erro ao carregar imagem: ${url}`, error);
      return url; // Em caso de erro, retorna a URL original
    }
  }
  
  // Pré-carrega um array de imagens
  public async preloadImages(urls: string[]): Promise<void> {
    // Filtra URLs válidas e que não estão no cache
    const filteredUrls = urls.filter(url => 
      url && 
      typeof url === 'string' && 
      url.includes('api.finditbuy.com/api/images/pub') && 
      !this.cache.has(url)
    );
    
    if (filteredUrls.length === 0) {
      console.log('[ImageCache] Nenhuma imagem nova para pré-carregar');
      return;
    }
    
    console.log(`[ImageCache] Pré-carregando ${filteredUrls.length} imagens em lote`);
    
    // Limitamos o número máximo de imagens para pré-carregar para evitar sobrecarga
    const maxImages = 15;
    const imagesToLoad = filteredUrls.slice(0, maxImages);
    if (filteredUrls.length > maxImages) {
      console.log(`[ImageCache] Limitando pré-carregamento a ${maxImages} imagens de ${filteredUrls.length}`);
    }
    
    // Carrega em paralelo, mas limitado a 3 imagens simultâneas para não sobrecarregar
    const batchSize = 3;
    
    try {
      for (let i = 0; i < imagesToLoad.length; i += batchSize) {
        const batch = imagesToLoad.slice(i, i + batchSize);
        await Promise.all(
          batch.map(url => this.getImage(url).catch(err => {
            console.warn(`[ImageCache] Falha ao pré-carregar ${url}:`, err);
            return url; // Continua com outras imagens mesmo se uma falhar
          }))
        );
      }
      console.log('[ImageCache] Pré-carregamento concluído');
    } catch (error) {
      console.error('[ImageCache] Erro no processo de pré-carregamento:', error);
    }
  }
  
  // Extrai todas as URLs de imagens do template
  public static extractImageUrlsFromTemplate(template: any): string[] {
    if (!template || typeof template !== 'object') {
      console.warn('[ImageCache] Template inválido para extração de URLs');
      return [];
    }
    
    const urls: string[] = [];
    
    // Função recursiva para extrair URLs de objetos
    const extractFromObject = (obj: any) => {
      if (!obj || typeof obj !== 'object') return;
      
      try {
        Object.entries(obj).forEach(([key, value]) => {
          // Se for uma string e contiver URLs de imagem reconhecidas
          if (typeof value === 'string' && 
              (value.includes('api.finditbuy.com/api/images/pub') || 
               value.includes('images.unsplash.com'))) {
            urls.push(value);
          } else if (Array.isArray(value)) {
            // Se for um array, percorra cada item
            value.forEach(item => extractFromObject(item));
          } else if (typeof value === 'object' && value !== null) {
            // Se for um objeto, processa recursivamente
            extractFromObject(value);
          }
        });
      } catch (error) {
        console.error('[ImageCache] Erro ao extrair URLs de imagem:', error);
      }
    };
    
    try {
      extractFromObject(template);
      
      // Remove duplicatas e URLs inválidas
      const uniqueUrls = [...new Set(urls)].filter(url => 
        url && typeof url === 'string' && url.length > 10
      );
      
      console.log(`[ImageCache] Extraiu ${uniqueUrls.length} URLs de imagens do template`);
      return uniqueUrls;
    } catch (error) {
      console.error('[ImageCache] Erro fatal ao extrair URLs de imagem:', error);
      return [];
    }
  }
  
  // Limpa o cache
  public clearCache(): void {
    this.cache.clear();
    localStorage.removeItem(this.storageKey);
    localStorage.removeItem(this.storageExpireKey);
  }
}

// Exportar a instância singleton para uso em toda a aplicação
export const imageCache = ImageCache.getInstance();