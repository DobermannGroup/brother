# Step 1: Build the React application
FROM node:16 AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Step 2: Serve the React application from Nginx
FROM nginx:alpine

# Copy the build output from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Overwrite the default Nginx configuration
COPY nginx/default.conf /etc/nginx/conf.d/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
