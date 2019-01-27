FROM node:10.11-alpine

RUN mkdir -p /app-client

WORKDIR /app-client

COPY package*.json /app-client/

RUN npm install

EXPOSE 3000 9228

ENTRYPOINT ["npm","start"]
