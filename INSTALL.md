# Instalação e Execução do Projeto

Este documento fornece instruções para instalar, configurar e executar o projeto Auto Landing Page.

## Pré-requisitos

- Node.js 16+ 
- npm ou yarn

## Instalação

1. Clone o repositório (se ainda não o fez)
2. Instale as dependências:

```bash
npm install
# ou
yarn install
```

3. Instale as dependências do Tailwind CSS que foram adicionadas:

```bash
npm install @tailwindcss/typography @tailwindcss/aspect-ratio --save-dev
# ou
yarn add @tailwindcss/typography @tailwindcss/aspect-ratio --dev
```

## Executando o projeto

Para executar o projeto em modo de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

Isso iniciará o servidor de desenvolvimento do Vite. Abra seu navegador e acesse:

```
http://localhost:5173/landing/powerpet
```

## Construindo para produção

Para construir o projeto para produção:

```bash
npm run build
# ou
yarn build
```

Os arquivos de produção estarão disponíveis na pasta `dist`.

## Melhorias Implementadas

1. Design responsivo completo para todas as seções
2. Sistema de cores dinâmicas baseado em variáveis CSS
3. Animações e transições para melhorar a experiência do usuário
4. Suporte a diferentes tipos de conteúdo (vídeos, depoimentos, bônus, etc.)
5. Layout otimizado para conversão

## Estrutura do Projeto

- `src/templates/`: Contém os arquivos JSON que definem a estrutura das landing pages
- `src/components/sections/`: Componentes React para cada tipo de seção
- `src/types/`: Definições de tipos TypeScript
- `src/utils/`: Utilitários para carregamento de templates

## Acessando Diferentes Templates

O sistema suporta múltiplos templates. Acesse-os alterando o parâmetro na URL:

- http://localhost:5173/landing/powerpet
- http://localhost:5173/landing/protein
- http://localhost:5173/landing/digital-marketing
