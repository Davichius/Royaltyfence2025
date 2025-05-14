# API Rate Limits

To ensure fair usage and prevent abuse, our map API endpoints have rate limits in place. These limits help protect our Google Maps API quota and ensure the service remains available for all users.

## Rate Limit Details

| Endpoint | Rate Limit | Time Window |
|----------|------------|-------------|
| `/api/maps/config` | 20 requests | Per minute |
| `/api/maps/embed` | 10 requests | Per minute |
| `/api/maps/static` | 30 requests | Per minute |
| `/api/maps/script` | 5 requests | Per minute |

## Rate Limit Headers

When making requests to our API endpoints, you'll receive the following headers in the response:

- `X-RateLimit-Limit`: The maximum number of requests allowed in the current time window
- `X-RateLimit-Remaining`: The number of requests remaining in the current time window
- `X-RateLimit-Reset`: The time (in Unix seconds) when the rate limit window resets

## Rate Limit Exceeded

If you exceed the rate limit, you'll receive a `429 Too Many Requests` response with the following headers:

- `Retry-After`: The number of seconds to wait before making another request

## Best Practices

To avoid hitting rate limits:

1. Cache responses when possible
2. Implement exponential backoff when retrying requests
3. Batch requests when possible
4. Use client-side caching for static resources

## Monitoring

If you need to monitor your API usage, contact the site administrator for access to the usage statistics.
