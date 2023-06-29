import { IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GroupGetItemsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Boolean)
  public extends?: boolean = false;
}
