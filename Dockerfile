FROM node:latest as builder

WORKDIR /app 

COPY package.json package-lock.json ./

RUN npm install

COPY . .

FROM node:latest

ENV PORT=3000 \
  MYSQL_PASSWORD="password123" \
  MYSQL_USER="root" \
  MYSQL_DATABASE="ransa" \
  SECRET_KEY="MAXIMUM_SECRET_ALLOWED_BY_USER" \
  MYSQL_HOST="localhost" \
  MYSQL_PORT=23306

WORKDIR /app 

COPY --from=builder /app . 

EXPOSE $PORT

CMD ["npm", "start"]