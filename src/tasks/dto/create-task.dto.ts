import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TaskCreateDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  name: string;

  @ApiProperty()
  @IsString()
  @MaxLength(256)
  @IsOptional()
  description: string;

  /*
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  group?: number | null;
  */
}
