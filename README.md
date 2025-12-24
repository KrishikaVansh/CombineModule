# Combined API Security Module  
**Rate Limiting + API Key Authentication (Redis-backed)**

This module provides a production-ready API security layer by combining **API key authentication** with **Redis-backed rate limiting** for Express applications.

---

## Features

- 🔐 **API Key Authentication**
  - Validates API keys using Redis
  - Caches valid and invalid keys to reduce lookup overhead
  - Supports key states (active / disabled)

- 🚦 **Rate Limiting (Redis-backed)**
  - Per–API key rate limiting
  - IP-based rate limiting fallback when no API key is provided
  - Shared counters across instances (horizontal scalability)
  - Automatic reset using Redis TTLs

- ⚡ **High Performance**
  - Constant-time Redis lookups
  - Minimal latency overhead
  - Designed for concurrent traffic

---

## Rate Limit Policy

| Scenario | Limit | Window |
|--------|------|--------|
| Valid API Key | 100 requests | 15 minutes |
| No API Key (IP-based) | 10 requests | 15 minutes |

---

## Middleware Flow

1. **Rate Limiting Middleware**
   - Blocks excessive requests early (`429`)
2. **API Key Authentication Middleware**
   - Validates API keys (`401` for invalid/missing keys)
3. **Route Handler**

This ordering matches real-world API gateway behavior.

---

## Redis Usage

- Stores rate-limit counters
- Caches valid API key payloads
- Caches invalid API keys temporarily
- Uses TTL-based expiration for automatic cleanup

---

## Testing Summary

Load testing was performed using **k6** under three scenarios:

1. **No API Key**
   - Requests were rate limited based on client IP
   - Excess requests returned `429 Too Many Requests`

2. **Invalid API Key**
   - Requests returned `401 Unauthorized`
   - Invalid keys were cached to prevent repeated lookups

3. **Valid API Key**
   - First 100 requests returned `200 OK`
   - Subsequent requests returned `429 Too Many Requests`
   - Rate limits reset automatically after TTL expiry

All tests confirmed predictable behavior under concurrent load.

---

## Tech Stack

- Node.js + Express (TypeScript)
- Redis (Docker)
- express-rate-limit
- rate-limit-redis
- k6 (load testing)

---

## Status

✅ **Production-ready**  
Designed for secure, scalable APIs with consistent behavior under load.

---
