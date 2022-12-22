FROM node:lts-alpine AS base

WORKDIR /bot

COPY ./dist/ ./

ENTRYPOINT [ "node", "main.js" ]
