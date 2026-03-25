FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN chmod +x node_modules/.bin/tsc && node_modules/.bin/tsc
EXPOSE 3333
CMD ["node", "dist/server.js"]