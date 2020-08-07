# base image
FROM node:11.15.0-alpine as build-step

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
# ENV PATH ./node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json package-lock.json ./
RUN npm install
COPY . .

# add app
RUN npm run build


FROM nginx:1.16.0-alpine as prod-stage


COPY --from=build-step /app/dist/testJavascriptSendValue /usr/share/nginx/html
EXPOSE 80
# start app
# CMD ng serve --host 0.0.0.0
CMD ["nginx", "-g", "daemon off;"]