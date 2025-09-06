# Use a node.js image as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (for better caching)
COPY server/package*.json ./

# Install dependencies
RUN npm ci

# Copy the entire server folder
COPY server/ ./server/

# Expose the port your app will run on
EXPOSE 5000

# Start the application
CMD ["node", "server/index.js"]
