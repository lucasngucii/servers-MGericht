// Define environment variables using a dedicated interface for clarity and maintainability
interface EnvironmentVariables {
   DEV_APP_PORT: number;
   DEV_DB_HOST: string;
   DEV_DB_PORT: number;
   DEV_DB_NAME: string;
   PRO_APP_PORT: number;
   PRO_DB_HOST: string;
   PRO_DB_PORT: number;
   PRO_DB_NAME: string;
}

interface DbConfig {
   host: string;
   port: number;
   name: string;
}
// Create separate development and production configurations using destructuring
const dev: { app: { port: number }; db: DbConfig } = {
   app: { port: parseInt(process.env.DEV_APP_PORT as string) || 3000 },
   db: {
      host: process.env.DEV_DB_HOST || 'localhost',
      port: parseInt(process.env.DEV_DB_PORT as string) || 27017,
      name: process.env.DEV_DB_NAME || 'sleeprDEV',
   },
};

const pro: { app: { port: number }; db: DbConfig } = {
   app: { port: parseInt(process.env.PRO_APP_PORT as string) || 3000 },
   db: {
      host: process.env.PRO_DB_HOST || 'localhost',
      port: parseInt(process.env.PRO_DB_PORT as string) || 27017,
      name: process.env.PRO_DB_NAME || 'sleeprPRO',
   },
};
// Combine configurations in a generic type for flexibility
type Config = {
   app: { port: number };
   db: DbConfig;
};
// Create a generic function that returns the appropriate configuration based on the NODE_ENV environment variable
const getConfig = (): Config => {
   switch (process.env.NODE_ENV) {
      case 'development':
         return dev;
      case 'production':
         return pro;
      default:
         return dev;
   }
};
// Create a generic function that returns the appropriate configuration based on the NODE_ENV environment variable
const config: Config = getConfig();

export default config;