import path from 'path';
import { fileURLToPath } from 'url';
import sqlite3 from 'sqlite3';
import sqlite from 'sqlite';

export async function open() {
  // todo singleton for DB; avoid doing migration multiple times with short circuit
  const db = await sqlite.open({
    filename: path.join(process.cwd(), 'database.db'),
    driver: sqlite3.Database
  });

  await migrate(db);
  return db;
}

async function migrate(db) {
  // explanation: es modules in node don't support __dirname 
  // TODO ^ doc link
  const cwd = path.dirname(fileURLToPath(import.meta.url));

  await db.migrate({
    migrationsPath: path.join(cwd, 'migrations')
  });
}

// TODO open in-memory db for NODE_ENV=test
