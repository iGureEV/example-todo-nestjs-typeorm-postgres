import { Allow, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GroupItemDto {
  @ApiProperty()
  @IsNumber()
  public id: number;

  @ApiProperty()
  public name: string;

  @ApiProperty()
  @Allow()
  public description: string;

  @ApiProperty({ type: Date })
  public createdAt: Date;

  @ApiProperty({ type: Date })
  public updatedAt: Date;
}
