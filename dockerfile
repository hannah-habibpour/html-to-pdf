# Dockerfile
FROM node:18

# Set the working directory to /app
WORKDIR /app

# Install necessary dependencies for Puppeteer
RUN apt-get update && apt-get install -y gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
RUN apt-get update && apt-get install -y chromium

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies
RUN npm ci

# Copy the application code
COPY . .

# Set environment variables for Puppeteer
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

# Expose port 8000
EXPOSE 8000

# Start the server
CMD [ "node", "dist/index.js" ]