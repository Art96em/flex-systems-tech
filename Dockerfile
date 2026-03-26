FROM node:20-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

# ---------- RUNTIME ----------
FROM nginx:alpine

# copy build
COPY --from=build /app/dist /usr/share/nginx/html

# template для runtime config
COPY config.js.template /usr/share/nginx/html/config.js.template

# entrypoint
COPY docker-entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# nginx config
COPY nginx.conf.template /etc/nginx/conf.d/default.conf

ENTRYPOINT ["/entrypoint.sh"]

CMD ["nginx", "-g", "daemon off;"]