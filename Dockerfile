FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app/build ./build
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/drizzle ./drizzle
COPY --from=builder /app/migrate.mjs ./migrate.mjs
RUN npm ci --omit=dev
RUN mkdir -p uploads
EXPOSE 3000
ENV NODE_ENV=production
CMD ["sh", "-c", "node migrate.mjs && node build"]
