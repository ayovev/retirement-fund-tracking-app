FROM node:10.11

RUN mkdir -p /app-client

WORKDIR /app-client

COPY package*.json /app-client/

RUN npm install

EXPOSE 3000

CMD ["npm","start"]
