import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Task } from '../tasks/task.entity';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 64 })
  name!: string;

  @Column({ type: 'varchar', length: 256 })
  description?: string;

  @Column({ name: 'created_at', type: 'timestamp', default: 'now()' })
  createdAt?: Date;

  @Column({ name: 'update_at', type: 'timestamp', default: 'now()' })
  updatedAt?: Date;

  @OneToMany(() => Task, (task) => task.group)
  tasks: Task[];
}
