import path from 'path';
import { fileURLToPath } from 'url';
import sqlite3 from 'sqlite3';
import sqlite from 'sqlite';

export async function open() {
  // todo singleton for DB; avoid doing migration multiple times with short circuit

  const db = await sqlite.open({
    filename: 'database.db',
    driver: sqlite3.Database
  });

  // explanation: es modules in node don't support __dirname
  const cwd = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    'migrations'
  );

  await db.migrate({
    migrationsPath: cwd
  });

  await console.log('first', db);
  return db;
  // TODO ^ open.then(migrate) and after that return open -- or have index.js call migrate
}

// TODO open in-memory db for NODE_ENV=test
