FROM node:20-alpine AS development

WORKDIR /app/backend

# Copy package files
COPY backend/package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY backend ./

# Run development server
CMD ["npm", "run", "dev"]
