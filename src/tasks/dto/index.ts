import { Allow, IsString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { GroupItemDto } from '../../groups/dto';

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

export class TaskUpdateDto extends TaskCreateDto {}

export class TaskCompleteDto {
  @ApiPropertyOptional({ type: Boolean, default: true })
  @Allow()
  public isComplete = true;
}

export class TaskItemDto {
  @ApiProperty()
  public id: number;

  @ApiProperty()
  public name: string;

  @ApiProperty()
  @Allow()
  public description: string;

  @ApiPropertyOptional({ type: Boolean, default: null })
  @Allow()
  public isComplete: boolean;

  @ApiProperty()
  public createdAt: Date;

  @ApiProperty()
  public updatedAt: Date;
}

export class TaskItemListDto extends TaskItemDto {
  @ApiProperty()
  @Allow()
  group: GroupItemDto;
}
