FROM node:18-alpine
WORKDIR /usr/src/app

# Install deps
COPY frontend/package*.json ./
RUN npm install

# Copy source
COPY frontend/ ./

EXPOSE 5173

CMD ["npm", "run", "dev"]
