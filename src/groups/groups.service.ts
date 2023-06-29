import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GroupEntity } from './group.entity';
import { GroupCreateDto, GroupUpdateDto } from './dto';

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

  async create(data: GroupCreateDto): Promise<GroupEntity> {
    return await this.groupsRepository.create(data).save();
  }

  async update(id: number, data: GroupUpdateDto): Promise<GroupEntity> {
    let item: GroupEntity = await this.findById(id);
    if (item) {
      item = await this.groupsRepository.merge(item, data).save();
    }
    return item;
  }

  async delete(id: number): Promise<void> {
    await this.groupsRepository.delete(id);
  }
}
