/**
 * Utilitários para trabalhar com templates parametrizados
 */

/**
 * Aplica valores a um template, substituindo as marcações {{campo}} pelos valores fornecidos
 * @param template Objeto template com marcações {{campo}}
 * @param values Objeto com os valores a serem aplicados
 * @returns Novo objeto com os valores substituídos
 */
export function applyTemplate<T>(template: T, values: Record<string, any>): T {
  const result = JSON.parse(JSON.stringify(template)) as T;
  
  // Converter o template para string para fazer substituições
  const templateStr = JSON.stringify(result);
  
  // Substituir cada valor no template
  const replacedStr = Object.entries(values).reduce((str, [key, value]) => {
    // Criar um regex para encontrar {{key}} no template
    const regex = new RegExp(`{{${key}}}`, 'g');
    return str.replace(regex, String(value));
  }, templateStr);
  
  // Converter de volta para objeto
  return JSON.parse(replacedStr);
}

/**
 * Exemplo de uso:
 * 
 * import { checkoutTemplate } from '../components/sections/CheckoutSection';
 * import { applyTemplate } from './templateUtils';
 * 
 * // Aplicar valores ao template
 * const customCheckout = applyTemplate(checkoutTemplate, {
 *   productName: "Curso Completo de Marketing Digital",
 *   price: 197.00,
 *   buttonText: "GARANTIR MINHA VAGA AGORA",
 *   buttonLink: "/checkout",
 *   installments: "ou até 10x de R$19,70 sem juros"
 * });
 * 
 * // Usar o template customizado no componente
 * <CheckoutSection
 *   productName={customCheckout.productName}
 *   price={customCheckout.price}
 *   buttonText={customCheckout.buttonText}
 *   buttonLink={customCheckout.buttonLink}
 *   installments={customCheckout.installments}
 * />
 */
