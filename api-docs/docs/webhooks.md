---
sidebar_position: 6
---

# Webhook Integration

Instead of polling the API to detect new votes, configure a webhook URL on your bot's edit page. Botliy will send an HTTP `POST` request to your server the moment a vote is cast — in real time.

**INCOMING POST** `Your configured webhook URL`

Your endpoint must accept incoming JSON payloads. Verify authenticity by comparing the `Authorization` header against your **Webhook Secret** (found on your bot's edit page).

### Headers You Will Receive

```http
Authorization: your_webhook_secret_here
Content-Type: application/json
```

### Payload You Will Receive

```json
{
  "bot": "123456789012345678",
  // Your bot's Discord ID
  "user": "876543210987654321",
  // Voter's Discord ID
  "type": "upvote" // Event type
}
```
