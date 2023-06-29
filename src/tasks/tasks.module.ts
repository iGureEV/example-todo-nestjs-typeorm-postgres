import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TaskEntity } from './task.entity';
import { GroupsModule } from '../groups';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity]), GroupsModule],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
