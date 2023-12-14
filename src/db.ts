import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Session } from './entity/session.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'AliceZ0317',
  database: 'test',
  entities: ['entity/*.entity.js'],
  synchronize: true,
  logging: true,
});
