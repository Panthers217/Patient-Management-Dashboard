FROM node:18-alpine
WORKDIR /usr/src/app

# install deps
COPY backend/package*.json ./
RUN npm install --production

# copy source
COPY backend/ ./

ENV PORT=4000
EXPOSE 4000

CMD ["npm", "run", "dev"]
