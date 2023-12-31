import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { TaskEntity } from '../tasks/task.entity';

@Entity('group')
export class GroupEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', length: 64 })
  public name: string;

  @Column({ type: 'varchar', length: 256, nullable: true })
  public description: string | null;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone', nullable: true })
  public updatedAt: Date | null;

  @OneToMany(() => TaskEntity, (task) => task.group)
  public tasks: TaskEntity[];
}
