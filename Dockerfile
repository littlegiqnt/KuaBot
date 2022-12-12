FROM node:lts-alpine AS base

WORKDIR /bot
ARG TOKEN
ENV TOKEN=${TOKEN}

COPY . .
RUN printf "\nTOKEN=${TOKEN}" >> .env

ENTRYPOINT [ "npm", "start" ]
