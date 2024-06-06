import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  healthCheck(): string {
    return 'Great! Everything is working fine.';
  }
}
