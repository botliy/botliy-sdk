---
sidebar_position: 4
---

# Rate Limits

To maintain system stability, Botliy applies global IP-based rate limiting across all API endpoints.

- **Global limit**: 20 request per second, per IP address.
- For stat-posting endpoints, send requests on a fixed schedule — every **15–30 minutes** is recommended. Do not trigger on every guild join event.

:::danger Exceeding Rate Limits

Requests that exceed the rate limit will receive a `429 Too Many Requests` response. Repeated violations may result in a temporary IP block.

:::
