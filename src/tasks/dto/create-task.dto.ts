import { Allow, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TaskCreateDto {
  @ApiProperty()
  @IsString()
  @MaxLength(64)
  name: string;

  @ApiProperty()
  @Allow()
  @MaxLength(256)
  description: string;
}
