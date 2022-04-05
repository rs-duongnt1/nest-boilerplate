import { Inject, Injectable, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  get<T>(key: string) {
    return this.cacheManager.get<T>(key);
  }

  set(key: string, value: any) {
    return this.cacheManager.set<string>(key, value);
  }

  delete(key: string) {
    this.cacheManager.del(key);
  }
}
