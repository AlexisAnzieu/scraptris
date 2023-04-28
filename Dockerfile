FROM node:16-slim
RUN apt-get update && apt-get -y install wget make gnupg gcc g++ python bash --no-install-recommends && rm -rf /var/lib/apt/lists/*

COPY . .

RUN npm install --silent 
RUN npm run vercel-build

EXPOSE 3001
CMD [ "npm", "run", "start" ]