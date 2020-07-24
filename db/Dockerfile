FROM node:11-alpine

ENV MONGO_VERSION=4.0.5-r0

RUN apk --update add --no-cache mongodb=${MONGO_VERSION} wget && \
    apk add grep ruby-dev mongodb-tools && \
    mkdir -p /data/db && \
    mkdir -p /data/logs && \
    mkdir -p /data/config && \
    addgroup mongodb mongodb && \
    wget --no-check-certificate -O /usr/local/bin/gosu https://github.com/tianon/gosu/releases/download/1.11/gosu-amd64 && \
    chmod +x /usr/local/bin/gosu && \
    gosu nobody true && \
    rm -rf /var/cache/apk/*

RUN mkdir -p /data/db

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

COPY --chown=node:node . .

RUN chown -R node:node /home/node

USER node

VOLUME /data/db

EXPOSE 8088 27017 28017

CMD ["npm", "run", "start"]
