# Use the official Node.js image
FROM node:18-alpine

# Set the working directory
WORKDIR /application

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build the NestJS app
RUN npm run build

# Expose the port the app runs on
EXPOSE 8000

# Start the application
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start:prod"]