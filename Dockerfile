# Use an official lightweight web server image
FROM nginx:alpine

# Copy the contents of your project to the default nginx HTML directory
COPY . /usr/share/nginx/html

# Expose port 80 to be able to access it from the browser
EXPOSE 80
