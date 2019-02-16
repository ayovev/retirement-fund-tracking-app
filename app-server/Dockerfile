FROM node:10.11-alpine

RUN apk add --no-cache curl

RUN mkdir -p /app-server

WORKDIR /app-server

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3001 9229

HEALTHCHECK --interval=30s \
            --timeout=10s \
            --retries=3 \
            CMD curl --fail --silent http://localhost:3001/api/status || exit 1

ENTRYPOINT ["npm","run","start:dev"]
