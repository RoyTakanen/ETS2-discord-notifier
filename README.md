# ETS2 Discord notifier

This Docker container notifies whenever ETS2 dedicated server player count changes. 

## Environment variables

| Name            | Description                                                   |
|-----------------|---------------------------------------------------------------|
| ETS2_HOST       | ETS2 server IP address (I tried hostname but it did not work) |
| ETS2_PORT       | ETS2 server port (typically 27016)                            |
| DISCORD_WEBHOOK | Discord Webhook URL                                           |

## Example docker-compose.yml

```yml
version: '3.3'

services:
  notifier:
    image: ghcr.io/roytakanen/ets2-discord-notifier:master 
    restart: always
    container_name: ets2_discord_notifier
  
  watchtower:
    image: containrrr/watchtower
    restart: always
    container_name: ets2_watchtower
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - /etc/timezone:/etc/timezone:ro
    command: --interval 10 ets2_discord_notifier 
```