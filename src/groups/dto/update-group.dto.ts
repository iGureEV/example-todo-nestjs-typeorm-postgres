import { PartialType } from '@nestjs/mapped-types';
import { GroupCreateDto } from './create-group.dto';

export class GroupUpdateDto extends PartialType(GroupCreateDto) {}
