# First stage: build stage
FROM node:20-alpine as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install --save --legacy-peer-deps
RUN npm i i18next

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Second stage: production stage
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy the build output from the previous stage
COPY --from=build /app/build /app/build

# Install http-server globally
RUN npm install -g http-server

# Expose port 80
EXPOSE 80

# Command to serve the static files using http-server
CMD ["http-server", "-p", "80", "./build"]
