import { Allow, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GroupCreateDto {
  @ApiProperty()
  @IsString()
  @MaxLength(64)
  public name: string;

  @ApiProperty()
  @Allow()
  @MaxLength(256)
  public description: string;
}
