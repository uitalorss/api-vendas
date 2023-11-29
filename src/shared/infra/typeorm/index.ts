import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5431,
  username: 'postgres',
  password: 'postgres',
  database: 'dbvendas',
  entities: [`./src/modules/**/infra/typeorm/entities/*.ts`],
  migrations: [`./src/shared/infra/typeorm/migrations/*.ts`],
});
