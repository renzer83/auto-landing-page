# Rastreamento de Conversões do Google Ads

Este diretório contém utilidades para implementar o rastreamento de conversões do Google Ads no projeto.

## Implementações Realizadas

1. **Tag Global do Google Ads**
   - Implementada no arquivo `index.html` principal do projeto
   - ID de Conversão: `AW-16945389449`

2. **Eventos de Conversão**
   - Implementados no componente `CheckoutSection.tsx`
   - Utilizam as funções definidas em `conversionTracking.ts`
   - Disparam quando o botão de compra é clicado

3. **Página de Agradecimento**
   - Novo componente `ThankYouSection.tsx` criado
   - Implementa o código de conversão para páginas de confirmação
   - Dispara o evento de conversão automaticamente quando a página é carregada

## Como Usar

### Rastreamento de Cliques

Para rastrear cliques em botões ou links antes da conversão:

```typescript
import { trackClickEvent } from '../../utils/tracking/conversionTracking';

// No manipulador de eventos do botão/link
const handleClick = () => {
  trackClickEvent('botao-id', 'Texto do Botão');
};
```

### Rastreamento de Compras

Para rastrear uma conversão de compra com valor:

```typescript
import { trackPurchaseConversion } from '../../utils/tracking/conversionTracking';

// Após confirmação da compra
trackPurchaseConversion(99.90, 'EUR', 'ID-TRANSACAO-123');
```

### Página de Agradecimento

Para implementar uma página de agradecimento:

```typescript
import { ThankYouSection } from './components/sections/ThankYouSection';

// No seu componente ou rota
<ThankYouSection 
  orderNumber="123456"
  productName="Produto XYZ"
  customerName="Nome do Cliente"
/>
```

## Observações

- O rastreamento requer que a tag global do Google Ads esteja corretamente implementada no `index.html`
- Os eventos de conversão serão contabilizados no Google Ads com o ID `AW-16945389449`
- O snippet de evento para a página de compra utiliza o label `VxRYCK2lj64aEIm_mJA_`
