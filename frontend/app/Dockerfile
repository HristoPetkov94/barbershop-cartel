FROM node:12.7-alpine AS build
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build --prod --aot --vendor-chunk --common-chunk --delete-output-path --buildOptimizer

FROM nginx:1.17.1-alpine
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/dist/app /usr/share/nginx/html
EXPOSE 80
