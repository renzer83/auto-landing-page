/**
 * Este utilitário tem como objetivo facilitar o registro de novos templates
 * quando forem adicionados à pasta templates.
 * 
 * Como usar:
 * 1. Adicione seu arquivo JSON à pasta 'templates'
 * 2. Importe-o no arquivo templateLoader.ts
 * 3. Registre-o no objeto templates com um ID único
 */

// Exemplo de como registrar um novo template:
/*
// No arquivo templateLoader.ts

// 1. Importe o novo template
import seuTemplate from '../templates/seu-template.json';

// 2. Registre-o com um ID único
templates['seu-template-id'] = seuTemplate as LandingPageData;
*/

export const registerTemplateInstructions = `
INSTRUÇÕES PARA ADICIONAR NOVOS TEMPLATES DE LANDING PAGE

1. Crie um novo arquivo JSON na pasta src/templates/ seguindo o modelo de estrutura dos templates existentes
   (veja protein.json ou digital-marketing.json como referência)

2. Abra o arquivo src/utils/templateLoader.ts e adicione as seguintes linhas:

   // Importar o novo template
   import seuTemplate from '../templates/seu-template.json';
   
   // Registrar o template com um ID único
   templates['seu-template-id'] = seuTemplate as LandingPageData;

3. Seu template estará disponível em http://localhost:5173/landing/seu-template-id

OBSERVAÇÕES IMPORTANTES:
- Certifique-se de que a estrutura do seu JSON siga exatamente o formato do tipo LandingPageData
- O ID usado para registrar o template deve ser único
- As seções definidas no campo "sections" determinam a ordem e quais componentes serão exibidos
`;
