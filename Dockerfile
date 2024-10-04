###################################################
# Stage 1: Base
FROM node:20 AS base
WORKDIR /usr/local/app

###################################################
# Stage 2: client-base
#  FROM base AS client-base
COPY ./app/package*.json ./
RUN npm install
COPY ./app ./app
WORKDIR /usr/local/app/app
RUN npm run build

###################################################
# Stage 3: server-base
# FROM base AS server-base
WORKDIR /usr/local/app
COPY ./server/package*.json ./
RUN npm install

###################################################
# FROM server-base AS test
# RUN npm test

###################################################
# Stage 4: final
# FROM base AS final
ENV NODE_ENV=production
EXPOSE 3000
COPY . ./
CMD ["npm","start"]