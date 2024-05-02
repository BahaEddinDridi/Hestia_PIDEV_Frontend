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

# Copy the build output from the build stage to the production stage
COPY --from=build /app/dist /app/dist

# Expose port 5173 (optional)
EXPOSE 5173

# Command to serve the built application using http-server on port 5173
CMD ["npx", "http-server", "-p", "5173", "./dist"]
