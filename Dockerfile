FROM node:18.10-alpine3.15

ARG TOKEN
ENV DISCORD_TOKEN=${TOKEN}

WORKDIR /bot

COPY . .

RUN rm Dockerfile compose.yaml
RUN echo "TOKEN=${DISCORD_TOKEN}" > .env
RUN npm install .

ENTRYPOINT [ "npm", "start" ]