FROM node:16-alpine

WORKDIR /app

COPY . .

RUN yarn \
  && cd bundle \
  && yarn \
  && yarn build \
  && rm -rf node_modules \
  && yarn cache clean

EXPOSE 9099

CMD cd bundle && yarn start