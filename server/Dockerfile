###################################################
# server-base
FROM node AS base
WORKDIR /usr/local/app

COPY package*.json .

FROM base AS server-base
RUN npm install
COPY . .
CMD ["npm","start"]