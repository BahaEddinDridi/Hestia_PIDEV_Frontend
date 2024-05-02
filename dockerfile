# First stage: build stage
FROM node:20-alpine as build
WORKDIR /usr/local/app

# Copy package.json and package-lock.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install --save --legacy-peer-deps
RUN npm i i18next
RUN npm run build
# Copy the rest of the application code
COPY . .

FROM nginx:alpine
COPY --from=build /usr/local/app/dist/summer-workshop-angular /usr/share/nginx/html

# Expose port 80 (default for nginx)
EXPOSE 80


# Command to run your application
CMD ["npm", "start"]
