import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './group.entity';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private groupsRepository: Repository<Group>,
  ) {}

  findAll(): Promise<Group[]> {
    return this.groupsRepository.find();
  }

  findById(id: number): Promise<Group | null> {
    return this.groupsRepository.findOneBy({ id });
  }

  async create(data: Partial<Group>): Promise<Group> {
    return await this.groupsRepository.create(data);
  }

  async update(id: number, data: Partial<Group>): Promise<void> {
    await this.groupsRepository.update(id, data);
  }

  async delete(id: number): Promise<void> {
    await this.groupsRepository.delete(id);
  }
}
