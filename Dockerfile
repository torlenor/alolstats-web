# build environment
FROM node:11.13.0 as builder
RUN mkdir /usr/src/alolstats-web
WORKDIR /usr/src/alolstats-web
ENV PATH /usr/src/alolstats-web/node_modules/.bin:$PATH
ARG app_ga_tracking_id
ENV REACT_APP_GA_TRACKING_ID=$app_ga_tracking_id
COPY . /usr/src/alolstats-web
RUN echo $REACT_APP_GA_TRACKING_ID
RUN yarn install --silent
RUN yarn build

# production environment
FROM nginx:1.15.12-alpine
COPY ./dockerfiles/nginx_image/etc/nginx/conf.d/* /etc/nginx/conf.d/
COPY --from=builder /usr/src/alolstats-web/build /usr/share/nginx/html
RUN echo "842cfa02-ad2a-4ec2-a5d5-4787e12775a5" > /usr/share/nginx/html/riot.txt
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
