import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  print(): { message: string } {
    return { message: 'Hello API' };
  }
}
