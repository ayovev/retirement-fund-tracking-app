# Use an official Node runtime as a parent image
FROM node:latest

RUN mkdir -p /app-client

WORKDIR /app-client

COPY package.json /app-client/package.json

RUN npm install

EXPOSE 3000

CMD ["npm","start"]
