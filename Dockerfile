FROM node:latest
MAINTAINER Quentin Jaccarino <jaccarino.quentin@gmail.com>

ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /src && cp -a /tmp/node_modules /src/

WORKDIR /src
ADD . /src

EXPOSE 8000

CMD npm run build && npm run start
