FROM node:alpine as build-stage
WORKDIR /usr/src/app
ENV PATH /usr/src/node_modules/.bin:$PATH

ARG VITE_MEETBY_BACKEND_BASE_URL
ENV VITE_MEETBY_BACKEND_BASE_URL=$VITE_MEETBY_BACKEND_BASE_URL

COPY package*.json ./
RUN npm install

COPY . ./
RUN npm run build

FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]