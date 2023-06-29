import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskEntity } from './task.entity';
import { GroupEntity, GroupsService } from '../groups';
import { TaskCompleteDto, TaskCreateDto, TaskUpdateDto } from './dto';

@Injectable()
export class TasksService {
  constructor(
    private groupsService: GroupsService,
    @InjectRepository(TaskEntity)
    private tasksRepository: Repository<TaskEntity>,
  ) {}

  async findAll(): Promise<TaskEntity[]> {
    return this.tasksRepository.find({
      relations: ['group'],
      loadRelationIds: false,
    });
  }

  async findById(id: number): Promise<TaskEntity> {
    return this.tasksRepository.findOne({ where: { id } });
  }

  async create({ groupId, ...data }: TaskCreateDto): Promise<TaskEntity> {
    let group: GroupEntity;
    if (typeof groupId === 'number') {
      group = await this.groupsService.findById(groupId);
    }
    return await this.tasksRepository.create({ ...data, group }).save();
  }

  async update(id: number, { groupId, ...data }: TaskUpdateDto): Promise<TaskEntity> {
    let group: GroupEntity;
    let item: TaskEntity = await this.findById(id);
    if (item) {
      if (typeof groupId === 'number') {
        group = await this.groupsService.findById(groupId);
      }
      item = await this.tasksRepository.merge(item, { ...data, group }).save();
    }
    return item;
  }

  async complete(id: number, { isComplete }: TaskCompleteDto): Promise<TaskEntity> {
    let item: TaskEntity = await this.findById(id);
    if (item) {
      item = await this.tasksRepository.merge(item, { isComplete }).save();
    }
    return item;
  }

  async delete(id: number): Promise<void> {
    await this.tasksRepository.delete(id);
  }
}
