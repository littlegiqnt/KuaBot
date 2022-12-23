FROM node:lts-alpine AS base

WORKDIR /bot
ARG TOKEN
ARG USER_TOKEN
ENV TOKEN=${TOKEN}
ENV USER_TOKEN=${USER_TOKEN}

COPY ./dist/ ./
# RUN echo "\nTOKEN=${TOKEN}\nUSER_TOKEN=${USER_TOKEN}" >> .env

ENTRYPOINT [ "node", "main.js" ]
