# Use an official Node.js runtime as the base image
FROM node:21.6.1-alpine as prod

# Set the working directory in the container
WORKDIR /usr/src/frontend

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install --loglevel verbose

# Copy the entire project to the working directory
COPY . .

# Build the React app
RUN npm run build

# Use an official Nginx image as the base image
FROM nginx:alpine

# Set the working directory in the container
WORKDIR /usr/local/bin

# Copy the build directory from the previous stage to the new stage
COPY --from=prod /usr/src/frontend/build /usr/share/nginx/html

COPY generate-config.sh .

# Copy the custom Nginx configuration file to the container
COPY custom-nginx.template /etc/nginx/conf.d/

# Make the custom Nginx configuration file executable
RUN chmod +x generate-config.sh

# Expose port 80
EXPOSE 80

# Start Nginx and generate the custom Nginx configuration file
ENTRYPOINT [ "/bin/sh", "generate-config.sh"]
