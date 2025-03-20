# Executando a Aplicação com Docker

Este documento fornece instruções para executar a aplicação Auto Landing Page em um ambiente Docker.

## Pré-requisitos

- Docker instalado ([Guia de instalação do Docker](https://docs.docker.com/get-docker/))
- Docker Compose instalado ([Guia de instalação do Docker Compose](https://docs.docker.com/compose/install/))

## Construindo e Executando com Docker Compose

O método mais simples para executar a aplicação é usando o Docker Compose:

```bash
# Construir e iniciar os contêineres
docker-compose up -d

# Visualizar logs
docker-compose logs -f

# Parar os contêineres
docker-compose down
```

A aplicação estará disponível em: http://localhost:8080

## Construindo e Executando com Docker (sem Docker Compose)

Alternativamente, você pode construir e executar a aplicação usando comandos Docker diretamente:

```bash
# Construir a imagem
docker build -t auto-landing-page .

# Executar o contêiner
docker run -d -p 8080:80 --name auto-landing-page auto-landing-page

# Parar o contêiner
docker stop auto-landing-page

# Remover o contêiner
docker rm auto-landing-page
```

## Desenvolvimento com Docker

Para desenvolvimento, você pode modificar o Dockerfile para um ambiente de desenvolvimento:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
```

E então atualizar o docker-compose.yml:

```yaml
version: '3.8'

services:
  auto-landing-page:
    build:
      context: .
      dockerfile: Dockerfile.dev  # Utilizando um Dockerfile separado para desenvolvimento
    ports:
      - "3000:3000"
    volumes:
      - ./src:/app/src
      - ./public:/app/public
    environment:
      - NODE_ENV=development
```

## Personalizando a Configuração do Nginx

Se você precisar personalizar a configuração do Nginx, crie um arquivo `nginx.conf` na raiz do projeto e descomente a linha correspondente no Dockerfile:

```
COPY nginx.conf /etc/nginx/conf.d/default.conf
```

Exemplo de arquivo nginx.conf básico:

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Configuração para SPA (Single Page Application)
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Configuração para cache de recursos estáticos
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }
}
```

## Troubleshooting

Se você encontrar problemas com a aplicação no Docker:

1. Verifique os logs: `docker logs auto-landing-page`
2. Entre no contêiner: `docker exec -it auto-landing-page sh`
3. Verifique se os arquivos estão corretos dentro do contêiner: `ls -la /usr/share/nginx/html`
