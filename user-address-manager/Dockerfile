# Step 1: Build the application
FROM node:16 AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run build

# Step 2: Serve the application
FROM node:16

# Set working directory
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app ./

# Install production dependencies
RUN npm install --production

# Expose the port Next.js is running on
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "start"]
