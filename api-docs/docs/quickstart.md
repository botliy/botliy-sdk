---
sidebar_position: 2
---

# Quick Start

Get up and running in three steps.

### 1. Submit & get approved
Add your bot at [Botliy.online/bots/new](https://Botliy.online/bots/new). Once approved, your API token is available in the bot's edit page under **API Integrations**.

### 2. Add the Authorization header
Include your token on every protected request as `Authorization: your_token`.

### 3. Post stats & set up a webhook
Use a 30-minute interval to `POST /api/bots/:id/stats` and configure a webhook URL on your bot's edit page to receive live vote events.
