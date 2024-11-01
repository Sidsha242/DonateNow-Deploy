FROM node:18-bookworm-slim

#RUN npm install -g serve

WORKDIR /app

COPY package*.json ./

#install node modules (clean)
RUN npm ci    

#copying everything except nodemodules in image
COPY . .

#COPY build /app/build

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

CMD ["npm", "start"]