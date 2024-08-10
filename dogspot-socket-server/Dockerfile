# Use a base image
FROM node:22.3.0

# Create app directory
WORKDIR /var/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Modify schema.prisma to include the appropriate binary target
RUN sed -i '/generator client/a \ \ binaryTargets = ["native", "debian-openssl-3.0.x"]' prisma/schema.prisma

# Generate Prisma Client with updated binary targets
RUN npx prisma generate

# Build the application
RUN npm run build

# Expose ports
EXPOSE 3000

# Start the application
CMD ["node", "dist/main.js"]