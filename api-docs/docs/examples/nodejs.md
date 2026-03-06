---
sidebar_position: 1
---

# Node.js (discord.js + express)

A full working bot example posting stats and receiving webhook events using the official **Node.js SDK**.

### Installation

Install the official SDK and required modules via npm:

```bash
npm install botliy discord.js express
```

### Example Usage

```javascript
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const { Botliy } = require('botliy');
const express = require('express');

// ================= CONFIG =================
const DISCORD_TOKEN = "YOUR_BOT_TOKEN";
const VOTE_CHANNEL_ID = "123456789012345678";

// Initialize Botliy SDK
const botliy = new Botliy({
  apiToken: "YOUR_Botliy_API_TOKEN",
  botId: "YOUR_BOT_ID",
  webhookSecret: "your_webhook_secret_here"
});
// ==========================================

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const app = express();
app.use(express.json());

// ============ WEBHOOK SERVER ============
app.post('/Botliy/webhook', async (req, res) => {
  // Check authorization via SDK
  if (!botliy.verifyWebhook(req.headers.authorization)) {
    return res.status(401).send("Unauthorized");
  }

  const { bot, user, type } = req.body;
  const channel = client.channels.cache.get(VOTE_CHANNEL_ID);

  if (channel) {
    const embed = new EmbedBuilder()
      .setTitle("🎉 New Vote Received!")
      .setDescription(`<@${user}> just voted for the bot!\n\nThank you for supporting us ❤️`)
      .setColor("Blurple")
      .addFields(
        { name: "👤 Voter", value: `<@${user}>`, inline: true },
        { name: "⏰ Time", value: `<t:${Math.floor(Date.now() / 1000)}:R>`, inline: true }
      )
      .setFooter({ text: "Thanks for helping us grow 🚀" })
      .setThumbnail(client.user.displayAvatarURL());

    await channel.send({ embeds: [embed] });
  }

  res.status(200).send("OK");
});

// ============ POST STATS INTERVAL ============
client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  app.listen(8999, () => console.log('Webhook server running'));

  setInterval(async () => {
    try {
      // Use the concise SDK method
      await botliy.postStats({
        server_count: client.guilds.cache.size,
        shard_count: 1
      });
      console.log('Successfully posted stats to Botliy!');
    } catch (e) {
      console.error(e.message);
    }
  }, 1800000); // 30 minutes
});

client.login(DISCORD_TOKEN);
```
