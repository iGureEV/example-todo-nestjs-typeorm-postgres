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
    return this.tasksRepository.find({
      relations: ['group'],
      loadRelationIds: false,
    });
  }

  findById(id: number): Promise<TaskEntity> {
    return this.tasksRepository.findOne({ where: { id } });
  }

  async create(data: Partial<TaskEntity>): Promise<TaskEntity> {
    return this.tasksRepository.save(data);
  }

  async update(id: number, data: Partial<TaskEntity>): Promise<TaskEntity> {
    let item: TaskEntity = await this.tasksRepository.findOneBy({ id });
    if (item) {
      item = await this.tasksRepository.merge(item, data);
      await this.tasksRepository.update(id, item);
    }
    return item;
  }

  async delete(id: number): Promise<void> {
    await this.tasksRepository.delete(id);
  }
}
