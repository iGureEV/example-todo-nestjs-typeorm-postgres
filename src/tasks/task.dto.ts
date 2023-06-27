import { Allow, IsDateString, IsNumber, IsString } from 'class-validator';

export class TaskCreateUpdateDto {
  @IsString()
  name: string;

  @Allow()
  description: string;
}

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
