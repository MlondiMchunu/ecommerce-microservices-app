# Stage 1: Build the application
FROM node:20

#Set working directory
WORKDIR /app

#Install Dependencies
COPY package.json package-lock.json ./
RUN npm Install

#Copy source code
COPY tsconfig.json ./
COPY src/ ./src

#Build the application
RUN npm run build

#Stage 2: Run the application
FROM node:20

#Set working directory
WORKDIR /app

#Copy built files from builder
COPY --from=builder /app/dist ./dist
COPY package.json ./

#Install product dependencies
RUN npm Install --only=production

#Expose port
EXPOSE 3002

#Start the application
CMD ["node","dist/server.js"]