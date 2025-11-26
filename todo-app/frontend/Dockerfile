FROM node:20-alpine AS development

WORKDIR /app/frontend

# Copy package files
COPY frontend/package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY frontend ./

# Run development server
CMD ["npm", "run", "dev", "--", "-p", "3001"]
