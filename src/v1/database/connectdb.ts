import * as mongoose from 'mongoose';
import config from '../configs/db.config';
const host = config.db.host || 'localhost';
const port = config.db.port || 27017;
const name = config.db.name || 'sleeprDEV';
const connectString = `mongodb://${host}:${port}/${name}`;

//using design pattern singletons
class Database {
   private static instance: Database | null = null;
   constructor() {
      this._connect();
   }
   private _connect(type = 'mongodb'): Promise<void> {
      mongoose.set('debug', true);
      mongoose.set('debug', { color: true });
      mongoose.set('strictQuery', false);
      return mongoose
         .connect(connectString, { maxPoolSize: 100 })
         .then(() => console.log('Connected to MongoDB', name))
         .catch(() => console.log(' connection failed'));
   }
   public static getInstance(): Database {
      if (!Database.instance) {
         Database.instance = new Database();
      }
      return Database.instance;
   }
}
const instanceMongoDB = Database.getInstance();

export default instanceMongoDB;
