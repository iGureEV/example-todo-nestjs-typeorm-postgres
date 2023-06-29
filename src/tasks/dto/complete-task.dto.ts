import { Allow } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class TaskCompleteDto {
  @ApiPropertyOptional({ type: Boolean, default: true })
  @Allow()
  public isComplete = true;
}
