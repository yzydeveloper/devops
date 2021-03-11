import { Get, Controller } from '@nestjs/common';
import { TestService } from './test.service';  // 引用service文件

@Controller('test')  //  /test/ 路径
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get('/alert')             //   /test/ 路径  firstTest 函数名可以随意起
  firstTest(): string {
    return this.testService.test();
  }

  @Get(':id')     //   /test/1  等等路径
  findOneTest(): string {
    return this.testService.findOneTest();
  }
}
// controller 只是做个简单的路由转发，具体的逻辑是由service文件处理的。