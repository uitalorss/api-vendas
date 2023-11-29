import 'reflect-metadata';
import 'dotenv/config';
import { dataSource } from '../typeorm';
import { app } from './app';

let port = process.env.PORT || 3333;

dataSource.initialize().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
