FROM node:10.11-alpine

RUN mkdir -p /app-server

WORKDIR /app-server

COPY package*.json /app-server/

RUN npm install

EXPOSE 3001 9229

ENTRYPOINT ["npm","start"]
