FROM node:16-slim

RUN mkdir /code

WORKDIR /code

RUN vercel-build

EXPOSE 3001
CMD [ "npm", "run", "start" ]