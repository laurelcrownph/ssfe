FROM node:14.15.4-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:stable-alpine as production-stage

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]