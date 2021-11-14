FROM node:14.17.0-alpine3.13 AS build
WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm run build && find . -type f -exec gzip -k {} \;

FROM nginx:1.17.1-alpine
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/dist/app /usr/share/nginx/html
EXPOSE 80
