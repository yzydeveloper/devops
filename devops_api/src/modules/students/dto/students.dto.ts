import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateStudentDto {
  @ApiProperty({ description: '菜单名称' })
  @IsNotEmpty({ message: '菜单名称不能为空' })
  readonly name: string;

  @ApiProperty({ description: '年龄' })
  @IsNotEmpty({ message: '年龄不能为空' })
  readonly age: number

}
