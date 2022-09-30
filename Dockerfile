FROM node:18.10-alpine3.15

WORKDIR /bot

COPY . .
RUN rm Dockerfile compose.yml

RUN npm install .

ENTRYPOINT [ "npm", "start" ]