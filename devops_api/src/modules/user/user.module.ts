import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './user.service';
import { CryptoUtil } from 'src/common/utils/crypto.util';
import { BaseController } from './base.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        secret: config.get('JWT.secretKey'),
        signOptions: {
          expiresIn: config.get('JWT.expiresIn'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [UserService, CryptoUtil],
  controllers: [BaseController],
})
export class UserModule {}
