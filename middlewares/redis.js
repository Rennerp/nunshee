import cache from "express-redis-cache";

export const redisCache = cache({
  expire: 60,
});
