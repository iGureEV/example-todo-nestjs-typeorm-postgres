import { IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PickType } from '@nestjs/mapped-types';
import { TaskItemDto } from './item-task.dto';

export class TaskCompleteDto extends PickType(TaskItemDto, ['isComplete']) {
  @ApiProperty({ type: Boolean })
  @IsBoolean()
  public isComplete: boolean;
}
