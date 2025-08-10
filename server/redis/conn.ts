import Redis from 'ioredis';

const REDIS_URL = 'redis://redis:6379/0';

const redis = new Redis(REDIS_URL, {
    retryStrategy(times) {
        const delay = Math.min(times * 50, 2000);
        console.log(`🔄 Redis reconnect in ${delay}ms`);
        return delay;
    },
});

redis.on('connect', () => console.log('✅ Redis connected'));
redis.on('error', (err) => console.error('❌ Redis error', err));

export default redis;
