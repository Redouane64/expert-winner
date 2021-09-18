FROM node:14.17-slim

WORKDIR /app

COPY package*.json ./

RUN npm install --prod

COPY . .

EXPOSE ${PORT}
