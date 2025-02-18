# Use Node.js base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy application files
COPY . .

# Expose the Vite development server port
EXPOSE 5173

# Command to start the development server
CMD ["npm", "run", "dev"]
