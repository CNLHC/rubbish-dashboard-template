FROM node:16.14

RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm
RUN npm config set registry http://mirrors.cloud.tencent.com/npm/
COPY pnpm-lock.yaml ./
RUN pnpm fetch --prod

ADD . ./
RUN pnpm install

RUN export $(cat .env | xargs) \
    && pnpm prisma:generate \
    && pnpm next build

ARG VERSION
ENV DEPLOY_ENV=prod
ENV VERSION=${VERSION}


EXPOSE 8080


ENTRYPOINT [ "sh","scripts/entrypoint.sh" ]





