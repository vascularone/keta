import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  print(): { message: string } {
    return { message: 'Hello API' };
  }
}
