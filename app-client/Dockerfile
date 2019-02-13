FROM node:10.11-alpine

RUN mkdir -p /app-client

WORKDIR /app-client

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3000 9228

ENTRYPOINT ["npm","run","start:dev"]
