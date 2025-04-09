# Usar una imagen base de Node.js
FROM node:18-alpine AS builder

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos necesarios
COPY package.json package-lock.json ./
RUN npm install

# Copiar el resto del código
COPY . .

# Construir la aplicación Next.js
RUN npm run build

# Usar una imagen más ligera para producción
FROM node:18-alpine AS runner

WORKDIR /app

# Copiar los archivos necesarios desde la etapa de construcción
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Instalar solo las dependencias necesarias para producción
RUN npm install --production

# Copiar el archivo .env para las variables de entorno
COPY --from=builder /app/.env .env

# Exponer el puerto de la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]