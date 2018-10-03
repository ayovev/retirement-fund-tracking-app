FROM node:10.11

RUN mkdir -p /app-server

WORKDIR /app-server

COPY package*.json /app-server/

RUN npm install

EXPOSE 3001

CMD ["npm","start"]
