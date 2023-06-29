import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GroupCreateDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  public name: string;

  @ApiPropertyOptional()
  @IsString()
  @MaxLength(256)
  @IsOptional()
  public description?: string;
}
