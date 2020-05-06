import path from 'path';
import { fileURLToPath } from 'url';
import sqlite3 from 'sqlite3';
import sqlite from 'sqlite';

export async function openDb () {
  const db = await sqlite.open({
    filename: 'database.db',
    driver: sqlite3.Database
  });

  const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'migrations');

  await db.migrate({
    migrationsPath: dir
  });

  await console.log('first', db);
  return db;
  // // TODO ^ open.then(migrate) and after that return open -- or have index.js call migrate

  // return 'thing';
}

// TODO open in-memory db for NODE_ENV=test
