import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'dbvendas',
  entities: [`./src/modules/**/infra/typeorm/entities/*.ts`],
  migrations: [`./src/shared/infra/typeorm/migrations/*.ts`],
});
