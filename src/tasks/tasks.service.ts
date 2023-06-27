import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskEntity } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private tasksRepository: Repository<TaskEntity>,
  ) {}

  findAll(): Promise<TaskEntity[]> {
    return this.tasksRepository.find();
  }

  findById(id: number): Promise<TaskEntity | null> {
    return this.tasksRepository.findOneBy({ id });
  }

  async create(data: Partial<TaskEntity>): Promise<TaskEntity> {
    return this.tasksRepository.save(data);
  }

  async update(id: number, data: Partial<TaskEntity>): Promise<void> {
    await this.tasksRepository.update(id, data);
  }

  async delete(id: number): Promise<void> {
    await this.tasksRepository.delete(id);
  }
}
