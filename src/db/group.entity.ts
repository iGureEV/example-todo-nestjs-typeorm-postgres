import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 64 })
  name!: string;

  @Column({ type: 'varchar', length: 256 })
  description?: string;

  @Column({ name: 'created_at', type: 'timestamp', default: 'now()' })
  createdAt!: Date;

  @Column({ name: 'update_at', type: 'timestamp', default: 'now()' })
  updatesAt?: Date;
}
