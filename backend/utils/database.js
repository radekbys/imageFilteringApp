import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const host = process.env.DATABASE_IP_ADDRESS;
const user = process.env.DATABASE_USERNAME;
const password = process.env.DATABASE_PASSWORD;
const database = process.env.DATABASE_NAME;

const pool = mysql.createPool({
  host,
  user,
  password,
  database,
}).promise();

export default pool;
