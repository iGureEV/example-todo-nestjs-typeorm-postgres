import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GroupItemDto {
  @ApiProperty()
  public id: number;

  @ApiProperty()
  public name: string;

  @ApiProperty()
  @IsOptional()
  public description: string;

  @ApiProperty({ type: Date })
  @IsOptional()
  public createdAt: Date;

  @ApiProperty({ type: Date })
  @IsOptional()
  public updatedAt: Date;
}
