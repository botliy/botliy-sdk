<div align="center">
  <br />
  <p>
    <a href="https://botliy.online"><img src="https://botliy.online/img/logo.svg" width="546" alt="botliy" /></a>
  </p>
</div>

# Botliy Node.js SDK

The official API SDK for **[botliy.online](https://botliy.online)**. Easily communicate with our platform using JavaScript or TypeScript to post your bot stats, check user votes, and authenticate webhooks seamlessly!

<div align="center">
  <a href="https://docs.botliy.online">📚 Read the Full Documentation</a> •
  <a href="https://discord.gg/botliy">💬 Join our Discord</a>
</div>

## Installation

Install the package directly from NPM:

```bash
npm install botliysdk
# or using yarn / pnpm
yarn add botliysdk
pnpm add botliysdk
```
*(Requires Node.js 16+)*

---

## 🚀 Quick Start Example

Here is a simple example covering how to initialize the bot and use the SDK:

```typescript
import { Botliy } from 'botliysdk'; // Or const { Botliy } = require('botliysdk');

// 1. Initialize the client
const botliy = new Botliy({
  apiToken: "your_api_token_here", 
  botId: "your_bot_id_here",
  webhookSecret: "your_optional_webhook_secret_here"
});

// 2. Post Bot Stats
// (It's recommended to do this on a loop every 30 minutes in your bot code)
await botliy.postStats({
  server_count: 1500,
  shard_count: 1
});

// 3. Check if a user voted for your bot!
const response = await botliy.checkVote("some_user_discord_id");
if (response.voted === 1) {
    console.log("This user cast a vote!");
} else {
    console.log("This user has not voted.");
}
```

---

## 📖 API Methods

### `botliy.postStats(options: PostStatsOptions)`
Posts your bot's current server and shard numbers. `options` requires `server_count` and optionally `shard_count`. Returns a promise resolving to the API's response.

### `botliy.getStats()`
Returns a promise resolving to an object of your bot's stats currently registered on Botliy's servers.

### `botliy.getVotes()`
Returns a promise resolving to an object containing the last 1,000 votes for your bot.

### `botliy.checkVote(userId: string)`
Checks whether a specific user ID has voted for your bot in the last 12 hours. The returned object will contain `voted: 1` if they have, or `0` if they have not.

### `botliy.verifyWebhook(authorizationHeader: string | undefined)`
Utility method to seamlessly verify Discord webhook requests you receive on your HTTP server (Express, Fastify, etc.). Compare the `Authorization` header request sent to you against your configured Webhook secret. Returns `true` if it successfully matches!

---

> For detailed usage examples integrating `discord.js` and `Express`, view our [Full API Reference Documentation](https://docs.botliy.online).
