---
sidebar_position: 2
---

# TypeScript (discord.js + express)

Clean Webhook integration structured using TypeScript and the official SDK.

### Installation

```bash
npm install botliy discord.js express
```

### Example Usage

```typescript
import { Client, GatewayIntentBits, EmbedBuilder, TextChannel } from 'discord.js';
import express, { Request, Response } from 'express';
import { Botliy } from 'botliy';

const config = {
  DISCORD_TOKEN: "YOUR_BOT_TOKEN",
  VOTE_CHANNEL_ID: "123456789012345678"
};

const botliy = new Botliy({
  apiToken: "YOUR_Botliy_API_TOKEN",
  botId: "YOUR_BOT_ID",
  webhookSecret: "your_webhook_secret_here"
});

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const app = express();
app.use(express.json());

app.post('/Botliy/webhook', async (req: Request, res: Response) => {
  if (!botliy.verifyWebhook(req.headers.authorization)) {
    return res.status(401).send("Unauthorized");
  }

  const { bot, user, type } = req.body;
  const channel = client.channels.cache.get(config.VOTE_CHANNEL_ID) as TextChannel;

  if (channel) {
    const embed = new EmbedBuilder()
      .setTitle("🎉 New Vote Received!")
      .setDescription(`<@${user}> just voted for the bot!\n\nThank you!`)
      .setColor(0x5865F2);

    await channel.send({ embeds: [embed] });
  }

  res.status(200).send("OK");
});

client.once('ready', () => {
  app.listen(8999);
  
  setInterval(async () => {
    try {
      await botliy.postStats({
        server_count: client.guilds.cache.size,
        shard_count: 1
      });
      console.log('Successfully posted stats to Botliy!');
    } catch (e) {
      console.error(e);
    }
  }, 1800000); // 30 mins
});

client.login(config.DISCORD_TOKEN);
```
