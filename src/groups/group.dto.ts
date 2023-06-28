import { Allow, IsDateString, IsNumber, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TaskItemDto } from '../tasks/task.dto';

export class GroupCreateDto {
  @ApiProperty()
  @IsString()
  public name: string;

  @ApiProperty()
  @Allow()
  public description: string;
}

export class GroupUpdateDto extends GroupCreateDto {}

export class GroupItemDto {
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

  @ApiProperty({ type: Date })
  @IsDateString()
  public createdAt: Date;

  @ApiProperty({ type: Date })
  @IsDateString()
  public updatedAt: Date;
}

export class GroupItemListDto extends GroupItemDto {
  @ApiProperty({ type: [TaskItemDto] })
  @Allow()
  public tasks: TaskItemDto[];
}
