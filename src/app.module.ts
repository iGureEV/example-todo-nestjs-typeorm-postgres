import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupEntity, GroupsModule } from './groups';
import { TaskEntity, TasksModule } from './tasks';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'host.docker.internal',
      port: 5435,
      username: 'pguser',
      password: 'pgpass',
      database: 'tasks1db',
      entities: [GroupEntity, TaskEntity],
      synchronize: true,
    }),
    GroupsModule,
    TasksModule,
  ],
})
export class AppModule {}
