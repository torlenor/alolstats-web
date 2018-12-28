# build environment
FROM node:11.5.0 as builder
RUN mkdir /usr/src/alolstats-web
WORKDIR /usr/src/alolstats-web
ENV PATH /usr/src/alolstats-web/node_modules/.bin:$PATH
COPY package.json /usr/src/alolstats-web/package.json
RUN npm install --silent
RUN npm install react-scripts@1.1.1 -g --silent
COPY . /usr/src/alolstats-web
RUN npm run build

# production environment
FROM nginx:1.15.8-alpine
COPY --from=builder /usr/src/alolstats-web/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
