import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestRouter } from './test.router';
import { TrpcModule } from '@server/trpc/trpc.module';

@Module({
  imports: [TrpcModule],
  exports: [TestRouter],
  controllers: [],
  providers: [TestService, TestRouter],
})
export class TestModule {}
