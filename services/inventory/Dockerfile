# Stage 1: Build the application
FROM node:20-alpine AS builder

#Set working directory
WORKDIR /app

#Install Dependencies
COPY package.json package-lock.json ./
RUN npm install

#Copy source code
COPY tsconfig.json ./
COPY src ./src

#Build the application
RUN npm run build

#Stage 2: Run the application
FROM node:20-alpine

#Set working directory
WORKDIR /app

# Copy built files from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./

#Install product dependencies
RUN npm Install --only=production

#Expose port
EXPOSE 3000

#Start the application
CMD ["node", "dist/server.js"]