---
sidebar_position: 4
---

# Check User Vote

Check whether a specific user has voted for your bot in the last 12 hours.

**GET** `/api/bots/:id/check`
*(Auth Required)*

### Parameters

| Query Param | Type | Description |
| ----------- | ---- | ----------- |
| `userId` **required** | string | The Discord snowflake ID of the user to check. |

### Example Request

```http
GET /api/bots/123456789012345678/check?userId=876543210987654321
```

### Response

```json
{
  "error": false,
  "voted": 1 // 1 = voted, 0 = not voted
}
```
