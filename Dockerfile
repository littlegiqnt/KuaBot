FROM node:18.10-alpine3.15 AS base

ARG TOKEN
ENV TOKEN=${TOKEN}

WORKDIR /bot

COPY . .
RUN rm Dockerfile compose.yaml && printf "\nTOKEN=${TOKEN}" >> .env
RUN npm i && npm run build

ENTRYPOINT [ "npm", "start" ]
