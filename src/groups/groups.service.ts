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

  findAll(isExtends = false): Promise<GroupEntity[]> {
    if (isExtends) {
      return this.groupsRepository.find({
        relations: ['tasks'],
        loadRelationIds: false,
      });
    } else {
      return this.groupsRepository.find();
    }
  }

  findById(id: number): Promise<GroupEntity> {
    return this.groupsRepository.findOne({
      relations: ['tasks'],
      loadRelationIds: false,
      where: { id },
    });
  }

  async create(data: Partial<GroupEntity>): Promise<GroupEntity> {
    return await this.groupsRepository.save(data);
  }

  async update(id: number, data: Partial<GroupEntity>): Promise<GroupEntity> {
    return await this.groupsRepository.save({ ...data, id });
  }

  async delete(id: number): Promise<void> {
    await this.groupsRepository.delete(id);
  }
}
