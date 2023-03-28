# ETS2 Discord notifier

This Docker container notifies whenever ETS2 dedicated server player count changes. 

## Environment variables

| Name            | Description                                                   |
|-----------------|---------------------------------------------------------------|
| ETS2_HOST       | ETS2 server IP address (I tried hostname but it did not work) |
| ETS2_PORT       | ETS2 server port (typically 27016)                            |
| DISCORD_WEBHOOK | Discord Webhook URL                                           |