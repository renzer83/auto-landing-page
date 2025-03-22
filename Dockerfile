FROM node:18-alpine AS builder

# Definir diretório de trabalho
WORKDIR /app

# Atualizar npm para silenciar avisos
RUN npm config set update-notifier false

# Copiar apenas os arquivos necessários para instalar dependências
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar configurações
COPY tsconfig*.json ./
COPY vite.config.ts ./
COPY postcss.config.js ./
COPY tailwind.config.js ./
COPY eslint.config.js ./

# Copiar código fonte e outros arquivos
COPY public/ ./public/
COPY src/ ./src/
COPY index.html ./

# Verificar estrutura de diretórios
# RUN ls -la && echo "Verificando index.html:" && cat index.html

# Definir variáveis de ambiente
ENV NODE_ENV=production

# Construir a aplicação para produção
RUN npm run build && echo "Build concluído com sucesso!"

# Verificar arquivos gerados
RUN ls -la dist/

# Usar nginx para servir a aplicação
FROM nginx:alpine

# Copiar os arquivos de build para o diretório do nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configurações personalizadas do nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Verificar arquivos copiados
RUN ls -la /usr/share/nginx/html

# Expor porta 80
EXPOSE 80

# Iniciar nginx
CMD ["nginx", "-g", "daemon off;"]
