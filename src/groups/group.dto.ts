import {
  Allow,
  IsDateString,
  IsNumber,
  IsNumberString,
  IsString,
} from 'class-validator';

export class GroupIdParamDto {
  @IsNumberString()
  id: number;
}

export class GroupCreateUpdateDto {
  @IsString()
  public name: string;

  @Allow()
  public description: string;
}

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
