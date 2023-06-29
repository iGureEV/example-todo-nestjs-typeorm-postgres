import { IsBoolean, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class TaskCompleteDto {
  @ApiPropertyOptional({ type: Boolean, default: true })
  @IsBoolean()
  @IsOptional()
  public isComplete = true;
}
