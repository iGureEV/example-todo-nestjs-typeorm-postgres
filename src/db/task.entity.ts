import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 64 })
  name!: string;

  @Column({ type: 'varchar', length: 256 })
  description?: string;

  @Column({ default: false })
  isComplete!: boolean;

  @Column()
  group?: number;

  @Column({ name: 'created_at', type: 'timestamp', default: 'now()' })
  createdAt!: Date;

  @Column({ name: 'update_at', type: 'timestamp', default: 'now()' })
  updatesAt?: Date;
}
