FROM node:10.11

RUN mkdir -p /app-server

WORKDIR /app-server

COPY package*.json /app-server/

RUN npm install

EXPOSE 3002

CMD ["npm","start"]
