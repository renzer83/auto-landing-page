# Templates para Landing Pages

Esta pasta contém os templates JSON que definem a estrutura e o conteúdo das landing pages disponíveis na aplicação.

## Estrutura do Template

Cada arquivo JSON deve seguir a estrutura definida na interface `LandingPageData` localizada em `../types/landing.ts`:

```typescript
export interface LandingPageData {
  title: string;
  subtitle?: string;
  hero?: HeroSection;
  stats?: Stat[];
  features?: FeatureCard[];
  pricing?: PricingPlan[];
  team?: TeamMember[];
  testimonials?: Testimonial[];
  colors: {
    primary: string;
    secondary: string;
    accent?: string;
    background?: string;
  };
  sections: Section[];
}
```

O campo `sections` determina quais componentes serão exibidos na landing page e em qual ordem.

## Como Adicionar um Novo Template

1. Crie um novo arquivo JSON nesta pasta seguindo a estrutura definida acima
2. Abra o arquivo `../utils/templateLoader.ts` e:
   - Importe o novo template
   - Registre-o no objeto `templates` com um ID único

Exemplo:

```typescript
// No arquivo templateLoader.ts

// Importar o novo template
import meuTemplate from '../templates/meu-template.json';

// Registrar o template com um ID único
templates['meu-template-id'] = meuTemplate as LandingPageData;
```

3. O template estará disponível na URL: `/landing/meu-template-id`

## Templates Disponíveis

- `protein.json`: Landing page para produto de proteína vegetal
- `digital-marketing.json`: Landing page para curso de marketing digital

## Dicas

- Para cores, utilize valores hexadecimais (#RRGGBB)
- Para imagens, você pode usar URLs públicas ou o serviço Unsplash (como nos exemplos)
- Para ícones, recomendamos utilizar o Iconify API (https://api.iconify.design/)
- Para imagens de avatares, você pode usar o serviço Unsplash
