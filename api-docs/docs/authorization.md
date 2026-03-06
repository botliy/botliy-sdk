---
sidebar_position: 3
---

# Authorization

All protected API requests require your bot's **API Token** sent as a Bearer token in the `Authorization` HTTP header. You can generate or view your token from your bot's edit page under **API Integrations** (available after bot approval).

```http
Authorization: your_api_token_here
```

:::warning IP Whitelisting (Optional)

For enhanced security, whitelist up to **5 IPv4/IPv6 addresses** on the bot edit page. Requests with a valid token from an unrecognised IP will receive `403 Forbidden`. Whitelisting is disabled by default using `0.0.0.0`.

:::
