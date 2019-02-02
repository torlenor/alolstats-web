# build environment
FROM node:11.9.0 as builder
RUN mkdir /usr/src/alolstats-web
WORKDIR /usr/src/alolstats-web
ENV PATH /usr/src/alolstats-web/node_modules/.bin:$PATH
COPY package.json /usr/src/alolstats-web/package.json
RUN yarn install
COPY . /usr/src/alolstats-web
RUN yarn build

# production environment
FROM nginx:1.15.8-alpine
COPY ./dockerfiles/nginx_image/etc/nginx/conf.d/* /etc/nginx/conf.d/
COPY --from=builder /usr/src/alolstats-web/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
