FROM node:20-alpine AS angular_app

WORKDIR /app

COPY . /app

WORKDIR /app/frontend

RUN npm install -g @angular/cli \
    && npm install

EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0"]

FROM node:20-alpine AS node_app

WORKDIR /app

COPY . /app

WORKDIR /app/backend

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]