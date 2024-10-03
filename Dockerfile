###################################################
# Stage 1: Base
FROM node:20 AS base

###################################################
# Stage 2: client-base
FROM base AS client-base
WORKDIR /usr/local/app/app
RUN npm install && npm run build

###################################################
# Stage 3: server-base
FROM base AS server-base
WORKDIR /usr/local/app/server
RUN npm install

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