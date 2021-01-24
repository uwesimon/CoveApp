openssl req -x509 -nodes -days 365 -subj "/C=DE/ST=NRW/L=Cologne/O=YOURNAME/CN=YOURCN" -addext "subjectAltName=DNS:SERVERIP" -newkey rsa:2048 -keyout nginx/nginx.key -out nginx/nginx.crt
