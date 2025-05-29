FROM node:18 AS build

COPY frontend /app
WORKDIR /app

ARG BACKEND_URL
ENV VITE_BACKEND_URL=$BACKEND_URL

RUN npm install
RUN npm run build

# Serve com Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
RUN ls
# COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
