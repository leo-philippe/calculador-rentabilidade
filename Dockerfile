# Use a imagem oficial do Node.js
FROM node:18-alpine

# Crie diretório de trabalho
WORKDIR /app

# Copie arquivos
COPY . .

# Instale dependências
RUN npm install

# Build da aplicação Next.js
RUN npm run build

# Exporte para produção (apenas para `output: standalone`)
RUN npm install -g serve

# Exponha a porta esperada pelo Cloud Run
EXPOSE 8080

# Inicie o app
CMD ["npx", "serve", "out", "-l", "8080"]
