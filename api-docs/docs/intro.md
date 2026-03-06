---
sidebar_position: 1
title: Introduction
description: Get started with the Botliy REST API — post server stats, retrieve votes, and handle real-time webhook events.
---

# Introduction

**REST API — v1 · botliy.online**

The Botliy API lets you deeply integrate your Discord bot with the platform. Post live server stats, retrieve full vote histories, check individual vote status, and receive real-time webhook events the moment a user votes. All requests and responses use JSON.

## Quick Reference

| Property    | Value                        |
|-------------|------------------------------|
| Base URL    | `https://botliy.online`      |
| Version     | `v1`                         |
| Format      | `application/json`           |
| Auth        | Bearer Token (Authorization header) |
| Rate Limit  | 20 requests / second per IP  |

## authorization

All authenticated endpoints require a Bearer token in the `Authorization` header. You can find your API token on your bot's dashboard page.

```http
Authorization: Bearer YOUR_API_TOKEN
```

Requests made without a valid token will receive a `401 Unauthorized` response.

## Response Format

All responses return a JSON body. Successful responses include the requested data at the top level. Error responses follow a consistent structure:

```json
{
  "error": "Unauthorized",
  "message": "Invalid or missing API token.",
  "status": 401
}
```

## Rate Limiting

The API enforces a limit of **20 requests per second** per IP address. Exceeding this limit returns a `429 Too Many Requests` response. We recommend implementing exponential backoff for retry logic.

:::info Need help?

If you run into issues or discover a problem with the API, reach out in our Discord server's `#api-support` channel. We typically respond within a few hours.

[Join our Discord →](https://discord.gg/NB4TgjvyTk)

:::