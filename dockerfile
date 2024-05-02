FROM node:18-alpine
WORKDIR /app

# Copy package.json and package-lock.json separately and install dependencies
COPY package.json package-lock.json ./
RUN npm install --save --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on
EXPOSE 5173

# Command to run your application
CMD ["npm", "start"]
