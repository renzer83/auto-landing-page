#!/bin/bash

echo "Instalando plugins do Tailwind CSS..."
npm install @tailwindcss/typography @tailwindcss/aspect-ratio --save-dev

echo "Limpando cache do Vite..."
rm -rf node_modules/.vite

echo "Reiniciando o servidor de desenvolvimento..."
npm run dev
