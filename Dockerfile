# Use the official Nginx Alpine image for a lightweight footprint
FROM nginx:alpine

# Install envsubst for dynamic port configuration (useful if Cloud Run uses a non-8080 port)
RUN apk add --no-cache gettext

# Copy our custom Nginx configuration template
COPY nginx.conf /etc/nginx/conf.d/config.template

# Copy all static assets to the Nginx html directory
COPY . /usr/share/nginx/html

# Expose the default Cloud Run port
EXPOSE 8080

# Use a shell command to replace the port in the template and start Nginx
# This ensures that if the $PORT env var is set, Nginx will listen on it.
CMD /bin/sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/config.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"
