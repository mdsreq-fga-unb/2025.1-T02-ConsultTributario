import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient } from 'mongodb';

let mongod: MongoMemoryServer;

export const startMemoryServer = async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  process.env.MONGO_URL = uri;
  return uri;
};

export const stopMemoryServer = async () => {
  if (mongod) {
    await mongod.stop();
  }
};

export const clearDatabase = async () => {
  if (mongod) {
    const uri = mongod.getUri();
    const client = await MongoClient.connect(uri);
    const db = client.db();
    await db.dropDatabase();
    await client.close();
  }
};
