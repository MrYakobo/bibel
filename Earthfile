VERSION 0.7

build:
    FROM node:20-bullseye

    # Set environment variables from args
    ARG VITE_API_URL
    ARG VITE_CHANNEL_URL
    ENV VITE_API_URL="$VITE_API_URL"
    ENV VITE_CHANNEL_URL="$VITE_CHANNEL_URL"
    COPY .git .git
    ARG VITE_COMMIT_DATE="$(git log -1 --date=iso --format=%ad)"
    ENV VITE_COMMIT_DATE="$VITE_COMMIT_DATE"

    WORKDIR /app
    COPY display display
    COPY fullscreen fullscreen
    COPY public public
    COPY src src
    COPY index.html *.json *.js .
    RUN npm ci

    RUN --secret VITE_CHANNEL_KEY npm run build

    SAVE ARTIFACT dist


deploy:
    FROM +build
    ARG REMOTE_HOST_COLON_PATH
    COPY +build/dist dist
    # Copy the output to the remote server using scp
    # assumes that you have the remote in your ssh config and have ran this beforehand:
    # eval $(ssh-agent -c)
    # ssh-add ~/.ssh/id_rsa

    RUN --ssh --push scp -o StrictHostKeyChecking=no -r dist/* $REMOTE_HOST_COLON_PATH

main:
    BUILD +build
    BUILD +deploy