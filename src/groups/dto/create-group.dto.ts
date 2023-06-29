import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GroupCreateDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  public name: string;

  @ApiProperty()
  @IsString()
  @MaxLength(256)
  @IsOptional()
  public description: string;
}
