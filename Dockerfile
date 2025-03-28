# Stage de dépendances
FROM node:22-alpine AS deps
WORKDIR /app

# Installation de pnpm
RUN corepack enable && corepack prepare pnpm@10.6.5 --activate

# Copie des fichiers de dépendances
COPY package.json pnpm-lock.yaml* ./

# Installation des dépendances
RUN pnpm install --frozen-lockfile

# Stage de construction
FROM node:22-alpine AS builder
WORKDIR /app

# Installation de pnpm
RUN corepack enable && corepack prepare pnpm@10.6.5 --activate

# Copie des dépendances et du code source
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Construction de l'application
RUN pnpm run build

# Stage de production
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"] 