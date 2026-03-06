# Botliy Python SDK

The official API SDK for botliy.online to easily communicate with our platform using Python.

## Installation

```bash
pip install botliy
```

## Basic Usage

```python
from botliy import Botliy

# Initialize the client
client = Botliy(
    api_token="your_api_token", 
    bot_id="your_bot_id",
    webhook_secret="your_optional_webhook_secret"
)

# Post Bot Stats
client.post_stats(server_count=1500, shard_count=1)

# Check user vote
response = client.check_vote("user_discord_id")
if response.get("voted") == 1:
    print("User cast a vote!")
```
