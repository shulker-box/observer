import { Client, Message } from 'discord.js';
import * as config from './config.json';
import MineStat from 'minestat';

const client = new Client();

client.on('ready', () => {
  console.log(`Bot is ready as ${client.user?.tag ?? 'unknown'}`);
});

client.on('message', async (message: Message) => {
  if (message.content.startsWith('!serverstatus')) {
    const [command, serverIp, serverPort] = message.content.split(' ');

    if (!serverIp) {
      message.reply('Please provide a Minecraft server IP.');
      return;
    }

    const port = serverPort || '25565';

    const ms = new MineStat(serverIp, parseInt(port));
    await ms.ping();

    if (ms.online) {
      message.reply(`The server is online with ${ms.current_players}/${ms.max_players} players.`);
    } else {
      message.reply('The server is offline.');
    }
  }
});

client.login(config.BOT_TOKEN);