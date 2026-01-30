# syntax=docker/dockerfile:1

# Using Node.js 22 as the base for the latest features and performance
ARG NODE_VERSION=22.15.1

################################################################################
# Stage 1: Base - Setup common environment
FROM node:${NODE_VERSION}-alpine AS base

# Install necessary build tools for some node-modules
RUN apk add --no-cache libc6-compat

WORKDIR /src

################################################################################
# Stage 2: Dependencies - Install all dependencies (including dev)
FROM base AS dependencies

# Copy package files
COPY package.json package-lock.json ./

# Install all dependencies using npm ci for deterministic builds
RUN npm ci

################################################################################
# Stage 3: Build - Build the Nuxt application
FROM dependencies AS build

# Copy the rest of the application source code
COPY . .

# Build the application
# Nuxt 4 uses .output as the production-ready directory
RUN npm run build

################################################################################
# Stage 4: Final - Optimized runtime image
FROM base AS final

# Set node environment to production
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

# Use a non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nuxtjs

# Set correct permissions
WORKDIR /app

# Copy the self-contained production build from the build stage
# Nuxt/Nitro bundles most dependencies into .output/server
COPY --from=build --chown=nuxtjs:nodejs /src/.output ./.output

# Switch to the non-root user
USER nuxtjs

# Expose the application port
EXPOSE 3000

# Healthcheck to ensure the container is running correctly
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

# Start the application using the standalone Nitropack server
# This is more efficient than running 'npm run start'
CMD ["node", ".output/server/index.mjs"]
