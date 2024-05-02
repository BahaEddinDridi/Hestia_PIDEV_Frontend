# First stage: build stage
FROM node:20-alpine as build

# Set working directory
WORKDIR /usr/local/app

# Copy package.json and package-lock.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install --save --legacy-peer-deps
RUN npm i i18next

# Copy the rest of the application code
COPY . .

# Build the application (ensure the build script is configured correctly in package.json)
RUN npm run build

# Second stage: production stage
FROM nginx:latest as prod

# Copy built artifacts from the build stage to Nginx web server directory
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 (default for nginx)
EXPOSE 80/tcp

# Command to run Nginx (no need to start npm here, as Nginx will serve static files)
CMD ["/usr/sbin/nginx", "-g", "daemon off;"]