# Use a node.js image as the base image
FROM node:20

# Set the working directory inside the container to app
WORKDIR /app

# Copy package.json and package-lock.json from the server only
COPY server/package*.json ./

# Install dependencies
RUN npm ci

# Copy the backend code
COPY server/ .

# Expose the port your app will run on
EXPOSE 5000

# Start the application
CMD ["node", "index.js"]