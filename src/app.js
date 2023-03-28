const query = require('source-server-query');
const { EmbedBuilder, WebhookClient } = require('discord.js');

const webhookClient = new WebhookClient({ url: process.env.DISCORD_WEBHOOK });

let PLAYERS_ONLINE = 0;
let LAST_MESSAGE_HANDLE = "";
let LAST_MESSAGE_HANDLE_TIME;

function watcher() {
    query.info(process.env.ETS2_HOST, process.env.ETS2_PORT, 1000).then(async (info) => {
        console.log(info.players)

        if (info.players != PLAYERS_ONLINE) {
            const embed = new EmbedBuilder()
                .setTitle('Player change detected!')
                .setDescription(`Players online on \`ör\` ETS2 server: ${PLAYERS_ONLINE} -> ${info.players}`)
                .setColor(11342935);

            if (LAST_MESSAGE_HANDLE == "" || ((Math.floor(Date.now() / 1000) - LAST_MESSAGE_HANDLE_TIME) > 60*5)) { // do not use old embed if it is older than 5 minutes
                LAST_MESSAGE_HANDLE = await webhookClient.send({
                    content: '',
                    username: 'ETS2 notifier',
                    avatarURL: 'https://eurotrucksimulator2.com/images/fb_image.jpg',
                    embeds: [embed],
                });
                LAST_MESSAGE_HANDLE_TIME = Math.floor(Date.now() / 1000)
            } else {
                await webhookClient.editMessage(LAST_MESSAGE_HANDLE.id, {embeds:[embed]});
            }
            PLAYERS_ONLINE = info.players
        }
    });
}
  
setInterval(watcher, 1000);
