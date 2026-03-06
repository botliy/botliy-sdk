---
sidebar_position: 3
---

# Get Votes

Returns a list of the 1,000 most recent votes for your bot.

**GET** `/api/bots/:id/votes`
*(Auth Required)*

### Response

```json
{
  "error": false,
  "votes": [
    {
      "username": "Snowy",
      "id": "123456789012345678",
      "date": "2026-02-26T12:00:00.000Z"
    }
  ]
}
```

### Response Codes

- **200** Returns the vote list array.
- **401** Missing or invalid Authorization token.
