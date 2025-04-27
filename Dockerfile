FROM node as stage-1
WORKDIR /app
COPY . .

RUN npm install

RUN npm run build

FROM nginx as production-stage

COPY --from=stage-1 /app/dist /usr/share/nginx/html

EXPOSE 80