FROM node:12.22.2-alpine3.11

WORKDIR /app

COPY . .

RUN yarn \
  && cd bundle \
  && yarn

EXPOSE 3000

CMD cd bundle && yarn start