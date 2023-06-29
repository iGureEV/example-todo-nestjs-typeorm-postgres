import { IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TaskItemDto {
  @ApiProperty()
  public id: number;

  @ApiProperty()
  public name: string;

  @ApiProperty()
  @IsOptional()
  public description: string;

  @ApiPropertyOptional({ type: Boolean, default: null })
  @IsOptional()
  public isComplete: boolean | null;

  @ApiProperty()
  public createdAt: Date;

  @ApiProperty()
  public updatedAt: Date;
}
