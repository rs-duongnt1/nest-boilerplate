import { Global, Module } from '@nestjs/common';
import { ApiConfigService } from './services/api-config.service';
import { RedisService } from './services/redis.service';

const providers = [ApiConfigService, RedisService];

@Global()
@Module({
  providers,
  exports: [...providers],
})
export class SharedModule {}
