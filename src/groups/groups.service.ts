import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GroupEntity } from './group.entity';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(GroupEntity)
    private groupsRepository: Repository<GroupEntity>,
  ) {}

  findAll(): Promise<GroupEntity[]> {
    return this.groupsRepository.find();
  }

  findById(id: number): Promise<GroupEntity | null> {
    return this.groupsRepository.findOneBy({ id });
  }

  async create(data: Partial<GroupEntity>): Promise<GroupEntity> {
    return await this.groupsRepository.save(data);
  }

  async update(id: number, data: Partial<GroupEntity>): Promise<void> {
    await this.groupsRepository.update(id, data);
  }

  async delete(id: number): Promise<void> {
    await this.groupsRepository.delete(id);
  }
}
