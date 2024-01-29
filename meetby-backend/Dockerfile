FROM node:20.10.0-alpine
ARG PORT=3000
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm ci --only=production
COPY . .
EXPOSE ${PORT}
CMD [ "node", "./src/app.js" ]