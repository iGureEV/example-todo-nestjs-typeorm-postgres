import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  findAll(): Promise<Task[]> {
    return this.tasksRepository.find();
  }

  findById(id: number): Promise<Task | null> {
    return this.tasksRepository.findOneBy({ id });
  }

  async create(data: Partial<Task>): Promise<Task> {
    return this.tasksRepository.create(data);
  }

  async update(id: number, data: Partial<Task>): Promise<void> {
    await this.tasksRepository.update(id, data);
  }

  async delete(id: number): Promise<void> {
    await this.tasksRepository.delete(id);
  }
}
