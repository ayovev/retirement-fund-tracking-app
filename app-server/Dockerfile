# Use an official Node runtime as a parent image
FROM node:latest

RUN mkdir -p /app-server

WORKDIR /app-server

COPY package*.json /app-server/

RUN npm install

EXPOSE 3001

CMD ["npm","start"]
