import NodeCache from 'node-cache';

// Initialize NodeCache instance with stdTTL of 300s (5 minutes) and checkperiod of 120s
const nodeCache = new NodeCache({ stdTTL: 300, checkperiod: 120 });

// Map to store pending promises for ongoing DB queries to prevent Cache Stampede (Thundering Herd)
const pendingPromises = new Map();

// Helper to get cached data or fetch from DB with Singleflight deduplication
export const getOrSetCache = async (key, fetchFn, ttl = 300) => {
    // Check if key exists in cache
    const cachedData = nodeCache.get(key);
    if (cachedData !== undefined) {
        return cachedData;
    }

    // If another request is currently fetching data for this key, await its promise
    if (pendingPromises.has(key)) {
        return await pendingPromises.get(key);
    }

    // Create a new fetch promise and store it in pendingPromises map
    const fetchPromise = (async () => {
        try {
            const freshData = await fetchFn();
            if (freshData !== null && freshData !== undefined) {
                nodeCache.set(key, freshData, ttl);
            }
            return freshData;
        } finally {
            // Remove pending promise after execution completes
            pendingPromises.delete(key);
        }
    })();

    pendingPromises.set(key, fetchPromise);
    return await fetchPromise;
};

// Delete a specific cache key
export const delCache = (key) => {
    if (key) {
        nodeCache.del(key);
    }
};

// Delete cache keys matching a prefix
// export const delCacheByPrefix = (prefix) => {
//     const keys = nodeCache.keys();
//     const matchingKeys = keys.filter(key => key.startsWith(prefix));
//     if (matchingKeys.length > 0) {
//         nodeCache.del(matchingKeys);
//     }
// };

// Flush all cache keys
export const flushCache = () => {
    nodeCache.flushAll();
};

export default nodeCache;
