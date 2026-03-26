FROM node:20-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

# ---------- RUNTIME ----------
FROM nginx:alpine

# nginx templates support
ENV NGINX_ENVSUBST_TEMPLATE_SUFFIX=.template
ENV PORT=80

# copy build
COPY --from=build /app/dist /usr/share/nginx/html

# runtime templates
COPY config.js.template /etc/nginx/templates/config.js.template

# custom nginx config template
COPY nginx.conf.template /etc/nginx/templates/default.conf.template