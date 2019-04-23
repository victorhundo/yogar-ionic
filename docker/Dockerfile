FROM node:latest

WORKDIR /app

RUN npm i npm@latest -g
RUN npm install -g cordova ionic

EXPOSE 8100
COPY ./entrypoint.sh /
CMD [ "bash", "/entrypoint.sh"]
