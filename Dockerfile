FROM node:14.19.0

WORKDIR /dist

COPY package*.json ./

ARG API_URL

ENV API_URL ${API_URL}

RUN npm ci

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]