---
sidebar_position: 1
---

# Post Stats

Post your bot's current server and shard count to Botliy.

**POST** `/api/bots/:id/stats`
*(Auth Required)*

### Parameters

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `server_count` **required** | integer | Total number of servers your bot is in. |
| `shard_count` | integer | Total number of shards your bot is using. |

### Request Body

```json
{
  "server_count": 1450,
  "shard_count": 2
}
```

### Response Codes

- **200** Stats updated successfully.
- **401** Missing or invalid Authorization token.
- **404** Bot ID not found or not approved.
- **429** Rate limit exceeded. Slow down requests.
