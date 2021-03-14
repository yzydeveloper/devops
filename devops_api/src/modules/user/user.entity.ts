import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column({ nullable: true, length: 20, comment: '用户手机号码' })
  phoneNum: string;

  @Column({ nullable: true, length: 32, comment: '用户显示昵称' })
  nickName: string;

  @Column({ default: '88888' })
  password: string;

  avatar: string;

  role: string;

  @Column({ type: 'double', default: new Date().valueOf() })
  createTime: number;
}
