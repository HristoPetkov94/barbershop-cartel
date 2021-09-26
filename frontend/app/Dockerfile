FROM node:12.7-alpine AS build
WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .
RUN npm run build && find . -type f -exec gzip -k {} \;

FROM nginx:1.17.1-alpine
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/dist/app /usr/share/nginx/html

RUN touch /usr/share/nginx/html/13242d883a42cf726ba43523cfa060b7.html

EXPOSE 80
