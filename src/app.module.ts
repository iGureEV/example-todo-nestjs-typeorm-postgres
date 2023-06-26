import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middleware';
import { GroupsModule } from './groups';
import { TasksModule } from './tasks';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'host.docker.internal',
      port: 5435,
      username: 'pguser',
      password: 'pgpass',
      database: 'tasks1db',
      entities: [],
      synchronize: true,
    }),
    GroupsModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
/*
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware);
  }
}
*/
