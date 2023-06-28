import { Allow, IsDateString, IsNumber, IsString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { GroupItemDto } from '../groups/group.dto';

export class TaskCreateDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @Allow()
  description: string;
}

export class TaskUpdateDto extends TaskCreateDto {}

export class TaskCompleteDto {
  @ApiPropertyOptional({ type: Boolean, default: true })
  @Allow()
  public isComplete = true;
}

export class TaskItemDto {
  @ApiProperty()
  @IsNumber()
  public id: number;

  @ApiProperty()
  @IsString()
  @MaxLength(64)
  public name: string;

  @ApiProperty()
  @Allow()
  @MaxLength(256)
  public description: string;

  @ApiPropertyOptional({ type: Boolean, default: null })
  @Allow()
  public isComplete: boolean;

  @ApiProperty()
  @IsDateString()
  public createdAt: Date;

  @ApiProperty()
  @IsDateString()
  public updatedAt: Date;
}

export class TaskItemListDto extends TaskItemDto {
  @ApiProperty()
  @Allow()
  group: GroupItemDto;
}
