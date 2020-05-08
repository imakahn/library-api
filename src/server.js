import express from 'express';

import * as bookEntity from './data/entities/book.js'; // es modules don't (yet) support loading directories as packages
import * as bookLogic from './logic/book.js';

const PORT = process.env.PORT || 3000;
const VERSION = 'v1';
const BASE_URL = `/api/${VERSION}`;

const app = express();

app.get('/healthz', (req, res) => {
  res.json({result: 'alive'});
})

// ----------------------------------------------------------------------------
// -- Librarian Endpoints
// ----------------------------------------------------------------------------

// user ID 1 passes (placeholder middleware for auth)
app.use(`${BASE_URL}/librarian`, (req, res, next) => {
  // TODO rather than id 1, lookup user and ensure 'librarian' property set
  if(req.headers.authorization !== '1') {
    console.log(req.headers);
    res.status(401).json({error: 'unauthorized'});
  }

  next();
});

app.get(`${BASE_URL}/librarian/books.overdue`, async (req, res) => {
  res.json(await bookEntity.getAll({overdue: true}));
  // todo error handle (top level would work)
  // res.json(res);
});

app.get(`${BASE_URL}/librarian/books.all`, async (req, res) => {
  res.json(await bookEntity.getAll());
});

app.get(`${BASE_URL}/librarian/books.remove`, async (req, res) => {
  if(!req.query['id']) {
    res.status(400).json({error: 'missing/invalid book id'});
  }

  res.json(await bookEntity.remove(Number(req.query['id'])));
});

// ----------------------------------------------------------------------------
// -- User Endpoints
// ----------------------------------------------------------------------------

app.get(`${BASE_URL}/books.checkout`, async (req, res) => {
  if(!req.headers.authorization) {
    res.status(400).json({error: 'missing user ID (authorization header)'});
  }
  if(!req.query['isbn']) {
    res.status(400).json({error: 'missing/invalid book isbn'});
  }

  const isbn = Number(req.query['isbn']);
  let booksISBN = await bookEntity.getAll({isbn});
  const user_id = Number(req.headers.authorization);
  const booksBorrowed = await bookEntity.getAll({user_id});
  
  const allowed = bookLogic.canCheckout(booksISBN, booksBorrowed);
  const bookID = bookLogic.availableFilter(booksISBN)[0].id;

  if(allowed.result) {
    res.json(await bookEntity.checkOut(bookID, user_id));
  } else {
    res
      .status(405)
      .json({
        error: `cannot checkout book. reasons: ${allowed.reasons.join(',')}`
      });
  }
});

app.get(`${BASE_URL}/books.return`, async (req, res) => {
  if(!req.headers.authorization) {
    res.status(400).json({error: 'missing user ID (authorization header)'});
  }
  if(!req.query['id']) {
    res.status(400).json({error: 'missing/invalid book id'});
  }

  const bookID = Number(req.query['id']);
  res.json(await bookEntity.giveBack(bookID));
});
app.get(`${BASE_URL}/books.returnall`, async (req, res) => {
  if(!req.headers.authorization) {
    res.status(400).json({error: 'missing user ID (authorization header)'});
  }
  const userID = Number(req.headers.authorization);

  res.json(await bookEntity.giveBackAll(userID));
});

app.listen(PORT, () => console.log(`library API listening on port ${PORT}`));
