import * as mongoose from 'mongoose';

const connectString = `mongodb://localhost:27017/sleeprDEV`;

//using design pattern singletons
class Database {
   private static instance: Database | null = null;
   constructor() {
      this._connect();
   }
   private _connect(type = 'mongodb'): Promise<void> {
      mongoose.set('debug', true);
      mongoose.set('debug', { color: true });

      return mongoose
         .connect(connectString, { maxPoolSize: 100 })
         .then(() => console.log('Connected to MongoDB'))
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
