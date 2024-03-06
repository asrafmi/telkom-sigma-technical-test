import { Sequelize } from 'sequelize';

import dotenv from 'dotenv';

dotenv.config();

const dbName = process.env.MYSQL_DATABASE as string;
const dbHost = process.env.MYSQL_HOST;
const dbUsername = process.env.MYSQL_USER as string;
const dbPassword = process.env.MYSQL_PASSWORD as string;
const dbDialect = 'mysql';

const sequelizeConnection = new Sequelize(dbName, dbUsername, dbPassword, {
  host: dbHost,
  dialect: dbDialect,
});

export default sequelizeConnection;
