import { LandingPageData } from '../types/landing';

// Um objeto para armazenar os templates importados
const templates: Record<string, LandingPageData> = {};

// Adicione cada template aqui
import protein from '../templates/protein.json';
import digitalMarketing from '../templates/digital-marketing.json';
import powerPet from '../templates/powerpet.json';
import pascoaLucrativa from '../templates/pascoa-lucrativa.json';

// Registrar os templates
templates['protein'] = protein as LandingPageData;
templates['digital-marketing'] = digitalMarketing as LandingPageData;
templates['powerpet'] = powerPet as LandingPageData;
templates['pascoa-lucrativa'] = pascoaLucrativa as LandingPageData;

/**
 * Carrega um template específico pelo ID
 * @param id Identificador do template
 * @returns O template LandingPageData ou null se não existir
 */
export const loadTemplate = (id: string): LandingPageData | null => {
  // Verificar se o template existe
  if (templates[id]) {
    return templates[id];
  }
  
  // Retornar um template padrão se o ID não for encontrado
  return templates['digital-marketing'] || null;
};

/**
 * Obtém todos os IDs de templates disponíveis
 * @returns Array com os IDs de todos os templates registrados
 */
export const getAvailableTemplates = (): string[] => {
  return Object.keys(templates);
};
