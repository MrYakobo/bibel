FROM node:20-bullseye AS builder

COPY .git .git
ARG VITE_COMMIT_DATE="$(git log -1 --date=iso --format=%ad)"
ENV VITE_COMMIT_DATE="$VITE_COMMIT_DATE"
ARG VITE_CHANNEL_KEY
ENV VITE_CHANNEL_KEY="$VITE_CHANNEL_KEY"
ARG VITE_CHANNEL_URL
ENV VITE_CHANNEL_URL="$VITE_CHANNEL_URL"
ARG VITE_API_URL
ENV VITE_API_URL="$VITE_API_URL"

WORKDIR /app
COPY display display
COPY fullscreen fullscreen
COPY public public
COPY src src
COPY index.html *.json *.js .
RUN npm ci

RUN npm run build

FROM caddy:2.7
# using caddy as a regular web server on port 80. Yay

WORKDIR /app
COPY --from=builder /app/dist /app/dist
ADD Caddyfile /etc/caddy/Caddyfile