# Dockerfile
FROM node:18

# Set the working directory to /app
WORKDIR /app

# Install necessary dependencies for Puppeteer
RUN apt-get update && apt-get install -y chromium

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies
RUN npm ci

# Copy the application code
COPY . .

# Set environment variables for Puppeteer
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

# Expose port 8000
EXPOSE 8000

# Start the server
CMD [ "node", "dist/index.js" ]