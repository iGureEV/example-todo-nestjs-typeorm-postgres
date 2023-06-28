import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { IMemoryDb } from 'pg-mem';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GroupEntity, GroupsModule, GroupsService } from './groups';
import { TaskEntity, TasksModule, TasksService } from './tasks';
import { setupDataSource } from '../test/setup';

describe('ToDo', () => {
  let dataBase: IMemoryDb;
  let dataSource: DataSource;
  let moduleRef: TestingModule;

  let appService: AppService;
  let groupsService: GroupsService;
  let tasksService: TasksService;

  beforeEach(async () => {
    if (dataBase) return;

    const setupDB = await setupDataSource([GroupEntity, TaskEntity]);
    dataSource = setupDB.ds;
    dataBase = setupDB.db;

    moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRootAsync({
          useFactory: () => ({
            type: 'postgres',
            migrationsRun: false,
            synchronize: true,
          }),
          dataSourceFactory: async () => {
            return dataSource;
          },
        }),
        GroupsModule,
        TasksModule,
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appService = moduleRef.get<AppService>(AppService);
    groupsService = moduleRef.get<GroupsService>(GroupsService);
    tasksService = moduleRef.get<TasksService>(TasksService);
  });

  describe('root', () => {
    it('должно вернуть "Hello World!"', async () => {
      expect(appService.getHello()).toBe('Hello World!');
    });
  });

  describe('groups', () => {
    const testGroups = [
      { name: 'Работа', description: 'Рабочие задачи' },
      { id: 1, name: 'Работа', description: 'Рабочие задачи' },
      { id: 1, name: 'Работа', description: 'Рабочие задачи', tasks: [] },
      { description: null },
      { id: 1, name: 'Работа', description: null },
    ];

    it('должно быть определено', () => {
      expect(groupsService).toBeDefined();
    });
    it('findAll()  => []', async () => {
      expect(await groupsService.findAll()).toMatchObject([]);
    });
    it('create({name:"Работа"})  => ok', async () => {
      expect(await groupsService.create(testGroups[0])).toMatchObject(testGroups[1]);
    });
    it('findAll()  => ok', async () => {
      expect(await groupsService.findAll()).toMatchObject([testGroups[1]]);
    });
    it('findAll(true)  => ok', async () => {
      expect(await groupsService.findAll(true)).toMatchObject([testGroups[2]]);
    });
    it('findById(1)  => ok', async () => {
      expect(await groupsService.findById(1)).toMatchObject(testGroups[1]);
    });
    it('update(1, {description: null})  => ok', async () => {
      expect(await groupsService.update(1, testGroups[3])).toMatchObject(testGroups[4]);
    });
    it('delete(1)  => ok', async () => {
      expect(await groupsService.delete(1)).toBeUndefined();
    });
  });

  describe('tasks', () => {
    const testTasks = [
      { name: 'Тестовое задание', description: 'Выполнить тестовое задание' },
      { id: 1, name: 'Тестовое задание', description: 'Выполнить тестовое задание', isComplete: null },
      { id: 1, name: 'Тестовое задание', description: 'Выполнить тестовое задание', isComplete: null, group: null },
      { description: null },
      { id: 1, name: 'Тестовое задание', description: null, isComplete: null },
    ];

    it('должно быть определено', () => {
      expect(tasksService).toBeDefined();
    });
    it('findAll()  => []', async () => {
      expect(await tasksService.findAll()).toMatchObject([]);
    });
    it('create({name:"Тестовое задание",description:"Выполнить тестовое задание"})  => equal', async () => {
      expect(await tasksService.create(testTasks[0])).toMatchObject(testTasks[1]);
    });
    it('findAll()  => ok', async () => {
      expect(await tasksService.findAll()).toMatchObject([testTasks[2]]);
    });
    it('update(1, {description: null})  => ok', async () => {
      expect(await tasksService.update(1, testTasks[3])).toMatchObject(testTasks[4]);
    });
    it('delete(1)  => ok', async () => {
      expect(await tasksService.delete(1)).toBeUndefined();
    });
  });
});
