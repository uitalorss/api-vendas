import 'reflect-metadata';
import 'dotenv/config';
import { dataSource } from '../typeorm';
import { app } from './app';

dataSource.initialize().then(() => {
  app.listen(3000);
});
