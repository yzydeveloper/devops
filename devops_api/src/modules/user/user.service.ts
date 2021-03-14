import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
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
    // 检查用户名是否存在
    const existing = await this.findOneByAccount(dto.phoneNum);
    if (existing) throw new HttpException('账号已存在', HttpStatus.BAD_REQUEST);
    // 判断密码是否相等
    if (dto.password !== dto.confirmPassword)
      throw new HttpException(
        '两次输入密码不一致，请重试',
        HttpStatus.BAD_REQUEST,
      );
    // 通过验证， 插入数据
    const result = await this.userRepository.save(dto);
    return { statusCode: 0, message: '注册成功', data: result };
  }
}
