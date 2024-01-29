FROM node:20.10.0-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD [ "node", "./src/app.js" ]