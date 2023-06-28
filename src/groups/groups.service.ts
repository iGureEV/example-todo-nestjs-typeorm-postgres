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

  async findAll(isExtends = false): Promise<GroupEntity[]> {
    if (isExtends) {
      return this.groupsRepository.find({
        relations: ['tasks'],
        loadRelationIds: false,
      });
    } else {
      return this.groupsRepository.find();
    }
  }

  async findById(id: number): Promise<GroupEntity | null> {
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
    let item: GroupEntity = await this.groupsRepository.findOneBy({ id });
    if (item) {
      item = await this.groupsRepository.merge(item, data);
      await this.groupsRepository.update(id, item);
    }
    return item;
  }

  async delete(id: number): Promise<void> {
    await this.groupsRepository.delete(id);
  }
}
