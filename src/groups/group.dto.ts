import { Allow, IsDateString, IsNumber, IsString } from 'class-validator';

export class GroupCreateDto {
  @IsString()
  public name: string;

  @Allow()
  public description: string;
}

export class GroupUpdateDto extends GroupCreateDto {}

export class GroupItemDto {
  @IsNumber()
  public id: number;

  @IsString()
  public name: string;

  @Allow()
  public description: string;

  @IsDateString()
  public createdAt: Date;

  @IsDateString()
  public updatedAt: Date;
}
