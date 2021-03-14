// 最后需要把TestModule 加入到app.module.ts 的配置里
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import appConfig from './config/index';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    // 配置模块
    ConfigModule.forRoot({
      load: appConfig,
      isGlobal: true,
    }),
    // 数据库
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    UserModule,
  ],
})
export class ApplicationModule {}
