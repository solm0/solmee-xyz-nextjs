# === Stage 1: Build ===
FROM node:20 AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your app
COPY . .

# Build the Next.js app
RUN npm run build

# === Stage 2: Run ===
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy only the output from the build stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose port Next.js will run on
EXPOSE 3000

# Start the Next.js production server
CMD ["npx", "next", "start", "-p", "3001"]