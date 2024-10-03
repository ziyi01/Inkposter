###################################################
# client-base
FROM node AS base
WORKDIR /usr/local/app/client

COPY package*.json .

FROM base AS client-base
RUN npm install
COPY . .
CMD ["npm","start"]