import { PartialType } from '@nestjs/mapped-types';
import { TaskCreateDto } from './create-task.dto';

export class TaskUpdateDto extends PartialType(TaskCreateDto) {}
