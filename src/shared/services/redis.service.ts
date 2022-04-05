import { Inject, Injectable, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  get(key: string) {
    return this.cacheManager.get(key);
  }

  set(key: string, value: any) {
    return this.cacheManager.set<string>(key, value);
  }

  delete(key: string) {
    this.cacheManager.del(key);
  }
}
