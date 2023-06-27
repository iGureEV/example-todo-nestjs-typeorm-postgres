import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Group, GroupsModule } from './groups';
import { Task, TasksModule } from './tasks';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'host.docker.internal',
      port: 5435,
      username: 'pguser',
      password: 'pgpass',
      database: 'tasks1db',
      entities: [Group, Task],
      synchronize: true,
    }),
    GroupsModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
