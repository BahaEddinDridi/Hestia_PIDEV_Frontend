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
FROM nginx:alpine

# Copy built artifacts from the build stage to Nginx web server directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 (default for nginx)
EXPOSE 80

# Command to run Nginx
CMD ["nginx", "-g", "daemon off;"]
