FROM node:18.10-alpine3.15 AS base

WORKDIR /bot
RUN npm install -g pnpm
ARG TOKEN
ENV TOKEN=${TOKEN}

COPY . .
RUN rm Dockerfile compose.yaml && printf "\nTOKEN=${TOKEN}" >> .env
RUN pnpm install \
    && pnpm run build \
    && rm -rf src/

ENTRYPOINT [ "pnpm", "start" ]
