import { Module } from '@nestjs/common';
import { TrpcService } from '@server/trpc/trpc.service';

@Module({
  imports: [],
  controllers: [],
  exports: [TrpcService],
  providers: [TrpcService],
})
export class TrpcModule {}
