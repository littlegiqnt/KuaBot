FROM node:lts-alpine AS base

WORKDIR /bot
ARG TOKEN
ARG USER_TOKEN
ENV TOKEN=${TOKEN}
ENV USER_TOKEN=${USER_TOKEN}

COPY node_modules/ node_modules/
COPY dist/ dist/
COPY package.json ./
RUN echo "\nTOKEN=${TOKEN}\nUSER_TOKEN=${USER_TOKEN}" >> bot/.env

ENTRYPOINT npm start
