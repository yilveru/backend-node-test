import { RickAndMortyCharacter, CharacterFilter } from '../types/character';

/**
 * Simple in-memory cache for character queries
 */
interface CacheEntry {
  timestamp: number;
  data: RickAndMortyCharacter[];
}

interface Cache {
  [key: string]: CacheEntry;
}

class CharacterCache {
  private cache: Cache = {};
  private readonly ttl: number;

  /**
   * Create a new cache with the specified TTL
   * @param ttl Time to live in milliseconds (default: 5 minutes)
   */
  constructor(ttl: number = 5 * 60 * 1000) {
    this.ttl = ttl;
  }

  /**
   * Generate a cache key from filter parameters
   * @param filter Character filter options
   * @returns Cache key string
   */
  private generateKey(filter: CharacterFilter): string {
    return `${filter.name}|${filter.species || ''}|${filter.gender || ''}`;
  }

  /**
   * Get data from cache if available and not expired
   * @param filter Character filter options
   * @returns Cached data or null if not found or expired
   */
  get(filter: CharacterFilter): RickAndMortyCharacter[] | null {
    const key = this.generateKey(filter);
    const entry = this.cache[key];
    
    if (!entry) {
      return null;
    }
    
    // Check if cache entry has expired
    const now = Date.now();
    if (now - entry.timestamp > this.ttl) {
      delete this.cache[key];
      return null;
    }
    
    return entry.data;
  }

  /**
   * Store data in cache
   * @param filter Character filter options
   * @param data Data to store
   */
  set(filter: CharacterFilter, data: RickAndMortyCharacter[]): void {
    const key = this.generateKey(filter);
    this.cache[key] = {
      timestamp: Date.now(),
      data
    };
  }

  /**
   * Clear all cache entries
   */
  clear(): void {
    this.cache = {};
  }
}

// Export a singleton instance
export const characterCache = new CharacterCache();
