

# Passos para o prisma
 
# Aqui você começa instalando o prisma no projeto 
1. npm install prisma --save-dev
2. npm install @prisma/client

# Apos instalacao e necessario iniciar o prisma no projeto
3. npx prisma init

# Com o prisma instalado e iniciado, crie um arquivo ".env" no diretorio raiz do projeto
4. DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"

# Va na pasta Prisma > Migrations e acesse o arquivo "schema.prisma"
5. Defina o esquema do seu banco (tabelas e ligacoes)

# Com tudo pronto, basta aplicar o comando abaixo para que o prisma aplique todas a modificacoes ou criacoes desejadas
6. npx prisma migrate dev --name init

7. npx prisma generate

# Para acompanhar o esquema use o comando abaixo
npx prisma studio   --Abre o terminal do prisma