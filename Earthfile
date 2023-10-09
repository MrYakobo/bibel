VERSION 0.7

build:
    FROM node:20-bullseye

    # Set environment variables from args
    ARG VITE_API_URL
    ARG VITE_CHANNEL_URL
    ENV VITE_API_URL="$VITE_API_URL"
    ENV VITE_CHANNEL_URL="$VITE_CHANNEL_URL"

    COPY . .
    RUN rm -f .env
    RUN npm ci

    RUN apt-get update && apt-get install -y openssh-client

    RUN --secret VITE_CHANNEL_KEY npm run build

    SAVE ARTIFACT dist


deploy:
    FROM +build
    # skitdumt :)
    # we use b64 to encode the private key file into a credential
    # decode that. then, decrypt the key using the secret passphrase
    # then, scp the output

    ARG REMOTE_HOST_COLON_PATH

    RUN --mount=type=secret,id=SSH_PRIVATE_KEY_B64,target=id_mount base64 -d < id_mount > id && chmod 0600 id
    RUN --secret SSH_PRIVATE_KEY_PASSPHRASE ssh-keygen -P "$SSH_PRIVATE_KEY_PASSPHRASE" -p -f id -N ""

    COPY +build/dist dist

    # Copy the output to the remote server using scp
    RUN --push scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -i id -r dist/* $REMOTE_HOST_COLON_PATH

main:
    BUILD +build
    BUILD +deploy