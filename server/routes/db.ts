import dotenv from 'dotenv'
import path from 'path'
import { Pool } from 'pg';

dotenv.config({path: path.resolve(__dirname, '../../.env')})
console.log(process.env.DATABASE_USER);
// Login Database with infos
const pool = new Pool({

    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_DATABASE,
    password: process.env.DATABASE_PASSWORD,
    port: Number(process.env.DATABASE_PORT),
    ssl: {  //NEED TO BE UPDATED! NOT SECURED!!!!!
        rejectUnauthorized: false
      }

});

export default pool