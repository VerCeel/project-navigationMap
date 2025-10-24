# --- Étape 1 : "Base" ---
# Installe les dépendances
FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci

# --- Étape 2 : "Builder" ---
# Construit l'application
FROM base AS builder
WORKDIR /app
COPY . .

# Argument pour le jeton Mapbox (passé par docker-compose)
ARG NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
ENV NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=${NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}

RUN npm run build

# --- Étape 3 : "Runner" ---
# L'image finale, optimisée pour la production
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Créer un utilisateur et un groupe non-root
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001 -G nodejs
USER nextjs

# Copier les fichiers "standalone" construits
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# Copier les assets statiques
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# Copier les assets publics
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

EXPOSE 3000
ENV PORT 3000

# Commande pour démarrer le serveur
CMD ["node", "server.js"]