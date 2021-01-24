FROM nginx:stable

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY nginx/nginx.key /etc/ssl/private
COPY nginx/nginx.crt /etc/ssl/certs

COPY ./dist/CoveApp /usr/share/nginx/html

