FROM node

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . /app

CMD ["npm", "run", "start"]

