import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/students.dto';
import { ResponseData } from '../../common/interfaces/result.interface';
import { StudentEntity } from './students.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(StudentEntity)
    private readonly StudentRepository: Repository<StudentEntity>,
  ) {}
  // 创建学生
  async create(dto: CreateStudentDto): Promise<ResponseData> {
    const result = await this.StudentRepository.save(dto);
    return { Code: 200, Message: '添加成功', Data: result };
  }
}
