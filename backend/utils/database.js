import mysql from 'mysql2';
import { readFileSync } from 'fs';

const infoJson = readFileSync('./databaseInfo.json', { encoding: 'utf8' });
const {
  databaseName, ipAddress, username, password,
} = JSON.parse(infoJson);

const pool = mysql.createPool({
  host: ipAddress,
  user: username,
  password,
  database: databaseName,
}).promise();

export default pool;
