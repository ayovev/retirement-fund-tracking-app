# Use an official Node runtime as a parent image
FROM node:latest

RUN mkdir -p /app-server

WORKDIR /app-server

COPY package.json /app-server/package.json

RUN npm install

EXPOSE 5000

CMD ["npm","start"]
