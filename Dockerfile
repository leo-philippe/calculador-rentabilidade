# Etapa 1: build
FROM node:20

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

ENV PORT=8080

EXPOSE 8080

CMD ["npm", "start"]
