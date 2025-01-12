# Backend Dockerfile
FROM node:23.3.0-alpine as backend

# Set working directory
WORKDIR /app

# Copy only backend code
COPY package.json /app

# Install backend dependencies
RUN npm install

COPY . /app

# Command to run the backend
CMD ["npm", "run", "start"]
