import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  public userId: string;

  @Column({ nullable: true, length: 20, comment: '用户手机号码' })
  public phoneNum: string;

  @Column({ nullable: true, length: 32, comment: '用户显示昵称' })
  public nickName: string;

  @Column({ default: '88888' })
  public password: string;

  public avatar: string;

  public role: string;

  @Column({ default: false, comment: '是否禁用' })
  public isDisable: boolean;

  @Column({ type: 'double', default: new Date().valueOf() })
  createTime: number;
}
