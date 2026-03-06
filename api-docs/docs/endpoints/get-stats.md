---
sidebar_position: 2
---

# Get Stats

Retrieve a bot's registered server count and shard count from Botliy.

**GET** `/api/bots/:id/stats`
*(No Auth Required)*

### Response

```json
{
  "error": false,
  "server_count": 1450,
  "shard_count": 2
}
```
