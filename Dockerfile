FROM node:lts-alpine AS base

WORKDIR /bot
ARG TOKEN
ARG USER_TOKEN
ENV TOKEN=${TOKEN} \
    USER_TOKEN=${USER_TOKEN}

COPY node_modules/ node_modules/
COPY dist/ dist/
COPY fonts/ fonts/
COPY images/ images/
COPY locales/ locales/
COPY package.json ./
RUN echo "\nTOKEN=${TOKEN}\nUSER_TOKEN=${USER_TOKEN}" > .env

ENTRYPOINT npm start
