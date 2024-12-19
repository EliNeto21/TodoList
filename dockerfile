# Usar a imagem base do Node.js
FROM node:16

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Copiar apenas os arquivos essenciais
COPY package.json package-lock.json tsconfig.json ./

# Instalar as dependências do projeto
RUN npm install

# Copiar o código do projeto
COPY . .

# Compilar o TypeScript para JavaScript
RUN npm run build

# Expor a porta em que a aplicação irá rodar
EXPOSE 3000

# Comando para rodar a aplicação (usando os arquivos compilados)
CMD ["node", "src/app.ts"]
