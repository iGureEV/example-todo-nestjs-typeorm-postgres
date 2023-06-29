import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TaskItemDto {
  @ApiProperty()
  public id: number;

  @ApiProperty()
  public name: string;

  @ApiPropertyOptional()
  public description?: string;

  @ApiPropertyOptional({ type: Boolean })
  public isComplete?: boolean;

  @ApiProperty()
  public createdAt: Date;

  @ApiPropertyOptional()
  public updatedAt?: Date;
}
