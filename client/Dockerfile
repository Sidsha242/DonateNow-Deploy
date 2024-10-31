FROM node:18-bookworm-slim

WORKDIR /app

COPY package*.json ./

#install node modules (clean)
RUN npm ci    

#copying everything except nodemodules in image
COPY . .

CMD ["npm", "start"]