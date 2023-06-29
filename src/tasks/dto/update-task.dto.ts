import { IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TaskCreateDto } from './create-task.dto';

export class TaskUpdateDto extends TaskCreateDto {
  /*@ApiProperty()
  @IsNumber()
  @IsOptional()
  public group: number | null;*/
}
