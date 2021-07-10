FROM node:12.22.2-alpine3.11

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