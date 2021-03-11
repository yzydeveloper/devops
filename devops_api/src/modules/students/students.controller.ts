import { Controller, Body, Post } from '@nestjs/common';
import { ResponseData } from '../../common/interfaces/result.interface';
import { Permissions } from '../../common/decorators/permissions.decorator';
import { ApiOperation,ApiTags } from '@nestjs/swagger';
import { StudentsService } from './students.service'; // 引用service文件
import { CreateStudentDto } from './dto/students.dto';

@ApiTags('用户管理')
@Controller('Students')
export class StudentsController {
  constructor(private readonly StudentsService: StudentsService) {}

  @Post('/CreateStudent')
  @ApiOperation({ summary: '创建学生' })
  @Permissions('students_list:create')
  async create(@Body() StudentData: CreateStudentDto): Promise<ResponseData> {
    return this.StudentsService.create(StudentData);
  }
}
