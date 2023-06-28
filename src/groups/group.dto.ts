import { Allow, IsNumber, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TaskItemDto } from '../tasks/task.dto';

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

export class GroupUpdateDto extends GroupCreateDto {}

export class GroupItemDto {
  @ApiProperty()
  @IsNumber()
  public id: number;

  @ApiProperty()
  public name: string;

  @ApiProperty()
  @Allow()
  public description: string;

  @ApiProperty({ type: Date })
  public createdAt: Date;

  @ApiProperty({ type: Date })
  public updatedAt: Date;
}

export class GroupItemListDto extends GroupItemDto {
  @ApiProperty({ type: [TaskItemDto] })
  @Allow()
  public tasks: TaskItemDto[];
}
