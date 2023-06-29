import { IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TaskCreateDto {
  @ApiProperty()
  @IsString()
  @MaxLength(64)
  name: string;

  @ApiProperty()
  @IsString()
  @MaxLength(256)
  @IsOptional()
  description: string;
}
