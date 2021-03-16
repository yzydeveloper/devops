import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  // 根据用户名查询用户信息
  async findOneByAccount(phoneNum: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ phoneNum });
  }

  async create(dto: CreateUserDto): Promise<any> {
    // 检查用户是否存在
    const isHave = await this.findOneByAccount(dto.phoneNum);
    if (isHave) return { code: 1, message: '此用户已存在', data: null };
    // 判断密码是否相等
    if (dto.password !== dto.confirmPassword)
      return { code: 1, message: '两次输入密码不一致，请重试', data: null };
    // 通过验证， 插入数据
    const result = await this.userRepository.save(dto);
    return { code: 0, message: '注册成功', data: result };
  }
}
