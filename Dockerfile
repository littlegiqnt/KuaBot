FROM node:18.10-alpine3.15

ARG DISCORD_TOKEN

WORKDIR /bot

COPY . .
RUN rm Dockerfile compose.yaml

RUN npm install .

ENTRYPOINT [ "TOKEN=${DISCORD_TOKEN}", "npm", "start" ]