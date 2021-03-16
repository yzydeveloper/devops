import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { CryptoUtil } from '../../common/utils/crypto.util';
import { ResponseData } from '../../common/interfaces/result.interface';

import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly cryptoUtil: CryptoUtil,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}
  // 根据用户名查询用户信息
  async findOneByphoneNum(phoneNum: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ phoneNum });
  }

  async create(dto: CreateUserDto): Promise<any> {
    // 检查用户是否存在
    const isHave = await this.findOneByphoneNum(dto.phoneNum);
    if (isHave) return { code: 1, message: '此用户已存在', data: null };
    // 判断密码是否相等
    if (dto.password !== dto.confirmPassword)
      return { code: 1, message: '两次输入密码不一致，请重试', data: null };
    // 通过验证， 插入数据
    const result = await this.userRepository.save(dto);
    return { code: 0, message: '注册成功', data: result };
  }
  // 登录逻辑
  async login(dto: LoginUserDto): Promise<ResponseData> {
    // 查询用户
    const user = await this.findOneByphoneNum(dto.phoneNum);
    console.log(user);
    if (!user || !this.cryptoUtil.checkPassword(dto.password, user.password))
      return { code: 1, message: '账号或密码错误', data: null };
    if (user.isDisable)
      return { code: 1, message: '该账号已被禁用，请切换账号登录', data: null };
    const tokens = await this.createToken({ userId: user.userId });
    // 返回生成的 token
    return { code: 200, message: '登录成功', data: tokens };
  }
  /**
   * 生成 token
   * @param payload { userId: string }
   */
  async createToken(payload: {
    userId: string;
  }): Promise<Record<string, unknown>> {
    const accessToken = `Bearer ${this.jwtService.sign(payload)}`;
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.config.get('JWT.expiresIn'),
    });
    return { accessToken, refreshToken };
  }

  async refreshToken(userId: string): Promise<Record<string, unknown>> {
    return this.createToken({ userId });
  }

  async verifyToken(token: string): Promise<number> {
    try {
      const { id } = this.jwtService.verify(token);
      return id;
    } catch (error) {
      return 0;
    }
  }
}
