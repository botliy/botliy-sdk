---
sidebar_position: 3
---

# Python — Flask + discord.py

A multi-threaded implementation integrating Flask and discord.py using the official **Python SDK** to run parallel on the same host.

### Installation

Install the official SDK and required modules via pip:

```bash
pip install botliy discord.py flask
```

### Example Usage

```python
import discord
import asyncio
from botliy import Botliy
from flask import Flask, request, jsonify
from threading import Thread

# ================= CONFIG =================
DISCORD_TOKEN = "YOUR_BOT_TOKEN"
VOTE_CHANNEL_ID = 123456789012345678

# Initialize Botliy SDK
botliy = Botliy(
    api_token="YOUR_Botliy_API_TOKEN",
    bot_id="YOUR_BOT_ID",
    webhook_secret="your_webhook_secret_here"
)
# ==========================================

intents = discord.Intents.default()
client = discord.Client(intents=intents)
app = Flask(__name__)

@app.route('/Botliy/webhook', methods=['POST'])
def Botliy_webhook():
    # Verify authorization seamlessly
    if not botliy.verify_webhook(request.headers.get('Authorization')):
        return jsonify({"error": "Unauthorized"}), 401

    user_id = request.json.get("user")
    asyncio.run_coroutine_threadsafe(
        send_vote_message(user_id),
        client.loop
    )
    return jsonify({"status": "success"}), 200

async def send_vote_message(user_id):
    channel = client.get_channel(VOTE_CHANNEL_ID)
    if channel:
        embed = discord.Embed(
            title="🎉 New Vote Received!", 
            description=f"<@{user_id}> just voted!", 
            color=discord.Color.blurple()
        )
        await channel.send(embed=embed)

async def post_stats():
    await client.wait_until_ready()
    while not client.is_closed():
        try:
            botliy.post_stats(
                server_count=len(client.guilds),
                shard_count=1
            )
            print("Successfully posted stats to Botliy!")
        except Exception as e:
            print(f"Error posting stats: {e}")
            
        await asyncio.sleep(1800) # 30 mins

@client.event
async def on_ready():
    client.loop.create_task(post_stats())

def run_webhook():
    app.run(host="0.0.0.0", port=8999)

if __name__ == "__main__":
    Thread(target=run_webhook).start()
    client.run(DISCORD_TOKEN)
```
