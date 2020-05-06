import openDb from './data/data.js'; // todo explain the import thing here, not in data/db

console.log('index', openDb);

// todo explain top-level await and link to future-state
(async () => {
  await openDb();
})();
