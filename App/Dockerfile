FROM node

ARG app_env
ENV APP_ENV $app_env

RUN mkdir -p /app
RUN mkdir -p /app/src
WORKDIR /app

ADD package.json  /app/
ADD webpack.prod.js webpack.dev.js webpack.common.js .babelrc /app/

RUN npm install -g webpack
RUN npm install
RUN npm i -D extract-text-webpack-plugin@next 

EXPOSE 8080

CMD npm run ${APP_ENV}