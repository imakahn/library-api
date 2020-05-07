import { getAll } from './data/entities/book.js'; // todo explain the import thing here, not in data/db

console.log('index', getAll);

// todo explain top-level await and link to future-state
(async () => {
  await getAll();
})();
