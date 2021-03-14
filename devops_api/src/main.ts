import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
const port = process.env.PORT || 8080;
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { AllExceptionsFilter } from './common/exception/any-exceptions.filter';
import { HttpExceptionsFilter } from './common/exception/http-exceptions.filer';
async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);

  app.setGlobalPrefix('api'); // 配置路由前缀 http://xxx:3000/api/*

  // 接口文档 swagger 参数
  const options = new DocumentBuilder()
    .setTitle('Devops API')
    .setDescription('Devops API 文档')
    .setVersion('0.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  // 设置 swagger 网址
  SwaggerModule.setup('docs', app, document);
  app.useGlobalPipes(new ValidationPipe()); //开启一个全局验证管道

  // 使用全局拦截器打印出参
  app.useGlobalInterceptors(new TransformInterceptor());
  // 所有异常
  app.useGlobalFilters(new AllExceptionsFilter());
  // http 异常
  app.useGlobalFilters(new HttpExceptionsFilter());
  await app.listen(port);
  Logger.log(`http://localhost:${port}`, '服务启动成功');
}
bootstrap();
