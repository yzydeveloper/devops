import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('students_list')
export class StudentEntity {
  @PrimaryGeneratedColumn({ name: 'stu_id' })
  public stuId: number;

  @Column({ type: 'varchar', length: 5, comment: '姓名' })
  public name: string;

  @Column({ type: 'int', comment: '年龄' })
  public age: number;
}
