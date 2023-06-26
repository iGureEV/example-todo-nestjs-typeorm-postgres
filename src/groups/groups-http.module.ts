import { Module } from '@nestjs/common';
import { GroupsModule } from './groups.module';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';

@Module({
  imports: [GroupsModule],
  providers: [GroupsService],
  controllers: [GroupsController],
})
export class UserHttpModule {}
