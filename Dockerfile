###################################################
# Stage 1: Base
FROM node:20 AS base
WORKDIR /usr/local/app
COPY package*.json ./
RUN npm install

###################################################
# Stage 2: client-base
FROM base AS client-base
WORKDIR /usr/local/app/app
RUN npm run build

###################################################
# FROM server-base AS test
# RUN npm test

###################################################
FROM base AS final
WORKDIR /usr/local/app
ENV NODE_ENV=production
EXPOSE 3000
COPY . ./
CMD ["npm","start"]