import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: '手机号码' })
  @IsString({ message: '手机号码不是有效的数据' })
  @IsNotEmpty({ message: '手机号码不能为空' })
  readonly phoneNum: string;

  @ApiProperty({ description: '昵称' })
  @IsString({ message: '昵称不是有效的数据' })
  @IsNotEmpty({ message: '昵称不能为空' })
  @MinLength(2, { message: '昵称至少需要两位' })
  readonly nickName: string;

  @ApiProperty({ description: '密码' })
  @IsString({ message: '密码不是有效的数据' })
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;

  @ApiProperty()
  @IsString({ message: '确认密码不是有效数据' })
  confirmPassword: string;
}
