import { Allow } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TaskItemDto {
  @ApiProperty()
  public id: number;

  @ApiProperty()
  public name: string;

  @ApiProperty()
  @Allow()
  public description: string;

  @ApiPropertyOptional({ type: Boolean, default: null })
  @Allow()
  public isComplete: boolean;

  @ApiProperty()
  public createdAt: Date;

  @ApiProperty()
  public updatedAt: Date;
}
