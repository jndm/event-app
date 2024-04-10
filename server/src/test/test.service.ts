import { Injectable } from '@nestjs/common';

@Injectable()
export class TestService {
  getGreeting(input: string) {
    return `Hello ${input ?? 'World!!'}`;
  }
}
