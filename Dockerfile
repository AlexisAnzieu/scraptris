FROM node:16-slim

COPY . .

RUN npm install --silent 
RUN npm run vercel-build

EXPOSE 3001
CMD [ "npm", "run", "start" ]