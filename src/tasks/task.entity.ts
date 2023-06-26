import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Group } from '../groups/group.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 64 })
  name!: string;

  @Column({ type: 'varchar', length: 256 })
  description?: string;

  @Column({ default: false })
  isComplete?: boolean;

  @ManyToOne(() => Group, (group) => group.id)
  group?: Group;

  @Column({ name: 'created_at', type: 'timestamp', default: 'now()' })
  createdAt?: Date;

  @Column({ name: 'update_at', type: 'timestamp', default: 'now()' })
  updatedAt?: Date;
}
