FROM node:20-alpine3.18

WORKDIR /app

COPY ./server/package.json ./

RUN npm install

COPY ./server .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]