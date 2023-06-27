import { Allow, IsDateString, IsNumber, IsString } from 'class-validator';

export class TaskCreateDto {
  @IsString()
  name: string;

  @Allow()
  description: string;
}

export class TaskUpdateDto extends TaskCreateDto {}

export class TaskItemDto {
  @IsNumber()
  public id: number;

  @IsString()
  public name: string;

  @Allow()
  public description: string;

  @Allow()
  public isComplete: boolean;

  @IsDateString()
  public createdAt: Date;

  @IsDateString()
  public updatedAt: Date;
}
