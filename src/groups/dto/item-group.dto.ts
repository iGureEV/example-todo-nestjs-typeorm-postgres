import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GroupItemDto {
  @ApiProperty()
  public id: number;

  @ApiProperty()
  public name: string;

  @ApiPropertyOptional()
  public description?: string;

  @ApiProperty({ type: Date })
  public createdAt: Date;

  @ApiPropertyOptional({ type: Date })
  public updatedAt?: Date;
}
