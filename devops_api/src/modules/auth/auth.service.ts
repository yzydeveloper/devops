import { UserService } from '../user/user.service';
import { Injectable, Inject } from '@nestjs/common';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  async validateUser(payload: { userId: string }): Promise<UserEntity> {
    return await this.userService.findOneById(payload.userId);
  }
}
