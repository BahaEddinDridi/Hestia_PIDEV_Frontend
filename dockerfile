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
FROM nginx:1.19-alpine

# Copy the build output to replace the default nginx contents
COPY --from=build /app/build /usr/share/nginx/html

# Remove default nginx index page
RUN rm /usr/share/nginx/html/index.html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
