import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
const port = process.env.PORT || 8080;

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);

  app.setGlobalPrefix('api'); // 配置路由前缀 http://xxx:3000/api/*

  // 接口文档 swagger 参数
  const options = new DocumentBuilder()
    .setTitle('R & D management system')
    .setDescription('R & D management system API 文档')
    .setVersion('0.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  // 设置 swagger 网址
  SwaggerModule.setup('docs', app, document);
  app.useGlobalPipes(new ValidationPipe()); //开启一个全局验证管道
  await app.listen(port);
  Logger.log(`http://localhost:${port}`, '服务启动成功');
}
bootstrap();
