import { DataSource, DataSourceOptions } from 'typeorm';
require('dotenv').config();

export const dataSourceOptions: DataSourceOptions = {
    type: 'mongodb',
    url: process.env.MONGO_URL,
    database: process.env.DB_DATABASE,
    entities: ['dist/**/*.entity.js'],
}

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;