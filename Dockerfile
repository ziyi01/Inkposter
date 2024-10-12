###################################################
# Stage 1: Base
FROM node:20 AS base
WORKDIR /usr/local/app
COPY . .
RUN npm run dev-build

###################################################
# FROM server-base AS test
# RUN npm test

###################################################
# Stage 2: final
# FROM base AS final
ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm","start"]