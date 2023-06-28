# Утановка

1. Установка npm пакетов:   `npm install`
1. Установка и инициализация Docker контейнеров:   `npm run docker:up`



# Запуск

1. Убедиться что Docker контейнеры группы *todolist* запущены.
1. Запустить проект:   `npm run start`

# Доступные порты

- http://localhost:3000 - точка доступа API
- http://localhost:8080 - pgAdmin

# Подключение к PostgreSQL

- Из контейнера pgAdmin: host = `postgres`, port = `5432`
- Для сервера API или cтороннего pgAdmin: host = `host.docker.internal`, port = `5435`

# Доступные методы

|   | Endpoint                    |Параметры| Описание|
|---|-----------------------------|---------|----------|
|Описание|||
|| GET / ||Приветствие сервиса|
|| GET /api ||Swagger|
|Группы|||
|| GET /groups||Получение только списка групп без задач|
|| GET /groups?extends=true|query-параметр `extends`|Если `true` - Получение списка групп с задачами|
|| GET /groups/{id}||Получение группы с задачами|
|| POST /groups|`Имя`, `Описание`|Создание группы||
|| PATCH /groups/{id}|`Имя`, `Описание`|Изменение группы|
|| DELETE /groups/{id}||Удаление группы и всех задач в ней|
|Задачи|||
|| GET /tasks||Получение всех задач (с группами в которые они входят (если есть))|
|| GET /tasks/{id}||Получение задачи|
|| POST /tasks|`Имя`, `Описание`|Создание задачи|
|| PATCH /tasks/{id}|`Имя`, `Описание`|Изменение задачи|
|| PATCH /tasks/{id}/done|`Флаг завершенности`|Проставить флаг завершенности для задачи|
|| DELETE /tasks/{id}||Удаление задачи|
