# Use an official Node.js runtime as a parent image
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application (will create dist/ folder)
RUN npm run build

# Debugging step: Check if the dist folder exists
RUN ls -l /app/dist || echo "Dist folder not found!"

# Use an official Nginx image to serve the build
FROM nginx:alpine

# Copy the dist output to the Nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
