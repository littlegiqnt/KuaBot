FROM node:lts-alpine AS base

WORKDIR /bot
ARG TOKEN
ARG USER_TOKEN
ENV TOKEN=${TOKEN}
ENV USER_TOKEN=${USER_TOKEN}

RUN printf "\nTOKEN=${TOKEN}\nUSER_TOKEN=${USER_TOKEN}" >> .env
COPY ./dist/ ./

ENTRYPOINT [ "node", "main.js" ]
