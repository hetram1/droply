import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

import * as schema from './schema';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' }); // optional, only if you needed here
if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined in .env.local');
}
const sql= neon(process.env.DATABASE_URL!);

export const db=drizzle(sql,{schema});

export {sql};

