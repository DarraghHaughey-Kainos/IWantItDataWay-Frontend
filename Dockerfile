FROM node:14

WORKDIR /app

COPY package*.json ./

ARG API_BASE_URL

ENV API_BASE_URL ${API_BASE_URL}

RUN npm ci

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]