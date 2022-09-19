FROM nginx:alpine

WORKDIR /var/www/html

COPY ./frontend/dist .

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8001