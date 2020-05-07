import path from 'path';
import { fileURLToPath } from 'url';
import sqlite3 from 'sqlite3';
import sqlite from 'sqlite';

sqlite3.verbose();

export async function open() {
  // todo singleton for DB; avoid doing migration multiple times with short circuit
  const db = await sqlite.open({
    filename: 'database.db',
    driver: sqlite3.Database
  });

  // db.on('trace', (data) => {
  //   console.log('DATA', data);
  // })

  await migrate(db);
  return db;
}

async function migrate(db) {
  // explanation: es modules in node don't support __dirname
  const cwd = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    'migrations'
  );

  await db.migrate({
    migrationsPath: cwd
  });
}

// TODO open in-memory db for NODE_ENV=test
