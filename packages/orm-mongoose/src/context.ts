import { Connection } from 'mongoose';

export interface MongooseORMContext {
  mongoose: {
    connection: Connection;
  };
}
