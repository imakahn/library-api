import express from 'express';

import { getAll } from './data/entities/book.js'; // es modules don't (yet) support loading directories as packages
// TODO ^ (doc link)

const PORT = process.env.PORT || 3000;
const VERSION = 'v1';
const BASE_URL = `/api/${VERSION}`;

const app = express();

app.get('/healthz', (req, res) => {
  res.json({result: 'alive'});
})

// user ID 1 passes (placeholder for)
app.use(`${BASE_URL}/librarian`, (req, res, next) => {
  // TODO rather than id 1, lookup user and ensure 'librarian' property set
  if(req.headers.authorization !== '1') {
    console.log(req.headers);
    res.status(403).json({error: 'unauthorized'});
  }

  next();
});
app.get(`${BASE_URL}/librarian/books.overdue`, async (req, res) => {
  res.json(await getAll({overdue: true}));
  // todo error handle (top level would work)
  // res.json(res);
});
app.get(`${BASE_URL}/librarian/books.all`, async (req, res) => {
  res.json(await getAll());
});

app.listen(PORT, () => console.log(`library API listening on port ${PORT}`));
