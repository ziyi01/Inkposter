###################################################
# server-base
# Stage 1: Build environment
FROM node AS base
WORKDIR /usr/local/app
COPY package*.json ./
RUN npm install

# Stage 2 Runtime environment
FROM base AS server-base
COPY . .
CMD ["npm","start"]