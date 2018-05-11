export const DOMAIN = process.env.URL || 'localhost';
export const APP_PORT = process.env.APP_PORT || 3000;

const ormconfig = {
  dev: {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: '',
    password: '',
    database: 'logistic',
    entities: [__dirname + '/../**/**.entity{.ts,.js}'],
    subscribers: [__dirname + '/../**.subscriber{.ts,.js}'],
    synchronize: true,
  },
};

export const DB_CONFIG = ormconfig.dev;
