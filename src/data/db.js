import path from 'path';
import { fileURLToPath } from 'url';
import sqlite3 from 'sqlite3';
import sqlite from 'sqlite';

// set the database to in-memory when we are running tests
const DB_FILE =
  process.env.NODE_ENV == 'test'
    ? ':memory:'
    : path.join(process.cwd(), 'database.db'); 

let db;

export async function open() {
  if( db ) return db;

  db = await sqlite.open({
    filename: DB_FILE,
    driver: sqlite3.Database
  });

  // TODO catch - depending on error, may be best to exit
  await migrate(db);
  
  return db;
}

async function migrate(db) {
  // explanation: es modules in node don't support __dirname 
  const cwd = path.dirname(fileURLToPath(import.meta.url));

  await db.migrate({
    migrationsPath: path.join(cwd, 'migrations')
  });
}
