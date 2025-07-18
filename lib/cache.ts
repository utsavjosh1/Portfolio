import { CacheMonitor } from '@/lib/performance'

// Generic cache entry interface
interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

// Cache options interface
export interface CacheOptions {
  defaultTtlSeconds?: number;
  maxSize?: number;
  cleanupInterval?: number;
}

// Generic reusable cache class
export class GenericCache<T = any> {
  private cache: Map<string, CacheEntry<T>> = new Map();
  private defaultTtl: number;
  private maxSize: number;
  private cleanupTimer?: NodeJS.Timeout;

  constructor(options: CacheOptions = {}) {
    this.defaultTtl = (options.defaultTtlSeconds ?? 300) * 1000; // Default 5 minutes
    this.maxSize = options.maxSize ?? 1000; // Default max 1000 entries
    
    // Set up periodic cleanup if interval is specified
    if (options.cleanupInterval) {
      this.cleanupTimer = setInterval(
        () => this.cleanup(),
        options.cleanupInterval * 1000
      );
    }
  }

  /**
   * Set a value in the cache
   */
  set(key: string, data: T, ttlSeconds?: number): void {
    // Remove oldest entries if we're at capacity
    if (this.cache.size >= this.maxSize) {
      this.evictOldest();
    }

    const ttl = ttlSeconds ? ttlSeconds * 1000 : this.defaultTtl;
    
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  /**
   * Get a value from the cache
   */
  get(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) {
      CacheMonitor.recordMiss();
      return null;
    }

    const now = Date.now();
    if (now - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      CacheMonitor.recordMiss();
      return null;
    }

    CacheMonitor.recordHit();
    return entry.data;
  }

  /**
   * Get or set a value using a factory function
   */
  async getOrSet(
    key: string,
    factory: () => Promise<T> | T,
    ttlSeconds?: number
  ): Promise<T> {
    const cached = this.get(key);
    if (cached !== null) {
      return cached;
    }

    const data = await factory();
    this.set(key, data, ttlSeconds);
    return data;
  }

  /**
   * Check if a key exists and is not expired
   */
  has(key: string): boolean {
    return this.get(key) !== null;
  }

  /**
   * Delete a specific key
   */
  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  /**
   * Clear all cache entries
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Get cache statistics
   */
  getStats(): {
    size: number;
    maxSize: number;
    keys: string[];
  } {
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      keys: Array.from(this.cache.keys()),
    };
  }

  /**
   * Remove expired entries
   */
  cleanup(): number {
    const now = Date.now();
    let removedCount = 0;

    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > entry.ttl) {
        this.cache.delete(key);
        removedCount++;
      }
    }

    return removedCount;
  }

  /**
   * Remove oldest entries when cache is full
   */
  private evictOldest(): void {
    let oldestKey = '';
    let oldestTime = Infinity;

    for (const [key, entry] of this.cache.entries()) {
      if (entry.timestamp < oldestTime) {
        oldestTime = entry.timestamp;
        oldestKey = key;
      }
    }

    if (oldestKey) {
      this.cache.delete(oldestKey);
    }
  }

  /**
   * Clean up timers when cache is destroyed
   */
  destroy(): void {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
    }
    this.clear();
  }
}

// Factory function for creating typed caches
export function createCache<T>(options: CacheOptions = {}): GenericCache<T> {
  return new GenericCache<T>(options);
}

// Predefined cache instances for common use cases
export const pageCache = createCache<any>({ defaultTtlSeconds: 300 }); // 5 minutes for page data
export const apiCache = createCache<any>({ defaultTtlSeconds: 180 }); // 3 minutes for API responses
export const staticCache = createCache<any>({ defaultTtlSeconds: 3600 }); // 1 hour for static content
export const userCache = createCache<any>({ defaultTtlSeconds: 900 }); // 15 minutes for user data

// Usage examples:

// Example 1: Cache page data
// pageCache.set('page:about', pageData, 300);
// const aboutPage = pageCache.get('page:about');

// Example 2: Cache API responses with lazy loading
// const posts = await apiCache.getOrSet('api:posts', async () => {
//   return await fetchPosts();
// }, 180);

// Example 3: Cache user-specific data
// userCache.set(`user:${userId}:profile`, userProfile, 600);
// const profile = userCache.get(`user:${userId}:profile`);

// Example 4: Create a specialized cache for a specific data type
// interface BlogPost {
//   id: string;
//   title: string;
//   content: string;
// }
// const blogCache = createCache<BlogPost>({ defaultTtlSeconds: 600 });
// blogCache.set('post:123', blogPost);

// Example 5: Cache static content with longer TTL
// staticCache.set('config:site', siteConfig, 3600);
// const config = staticCache.get('config:site');