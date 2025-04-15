# syntax=docker/dockerfile:1

FROM node:20-alpine
WORKDIR /app
COPY ./package*.json .
# RUN yarn install --production
RUN npm ci
COPY . .
EXPOSE 3000
CMD ["node", "src/index.js"]
