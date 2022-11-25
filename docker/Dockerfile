FROM haregistry.azurecr.io/debian-nodejs-14:ha-bullseye-nodejs-14 as builder

WORKDIR /app

ARG FIGMA_TOKEN
ARG DATABASE_URL

ENV FIGMA_TOKEN ${FIGMA_TOKEN}
ENV DATABASE_URL ${DATABASE_URL}

COPY app/ ./
RUN apt-get update \
&& apt-get upgrade
RUN yarn install
RUN npx prisma generate
RUN yarn build

FROM haregistry.azurecr.io/debian-node-14:ha-bullseye-node-14

COPY nginx-app.conf /etc/nginx/conf.d/
COPY nuxt-server.sh /usr/local/bin/
COPY run.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/run.sh
COPY nginx.conf /etc/nginx/
COPY supervisor-nginx.conf supervisor-nuxt.conf /etc/supervisor.d/
RUN apt-get update \
&& apt-get upgrade \
&& chmod +x /usr/local/bin/nuxt-server.sh
WORKDIR /var/www/app
ADD app/package.json ./
ADD app/nuxt.config.ts ./
COPY --from=builder ./app/node_modules ./node_modules/
COPY --from=builder ./app/.nuxt ./.nuxt/
COPY --from=builder ./app/.output ./.output/
RUN npx playwright install
RUN npx playwright install-deps
ENTRYPOINT ["/usr/local/bin/run.sh"]
EXPOSE 2222 80