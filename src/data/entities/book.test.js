import t from 'tap';
import { add, checkOut, get, getAll, giveBack, remove } from './book.js';

// TODO - clear and migrate database on each test. sanity check running NODE_ENV=test (memory db)

t.test('getAll', async t => {
  let res = await getAll();
  t.true(Array.isArray(res) && res.length > 0, 'should return list of all books');

  t.end();
});

t.test('add', async t => {
  const isbn = 1123456789;
  let res = await add(isbn, 'a new book', 'myself, me');
  t.true(res.changes, 'should add book to db');
  res = await getAll({isbn});
  t.equals(Number(res[0].isbn), isbn, 'should exist under isbn')
  // TODO ^ we're being coerced to string - why?

  t.end();
});

t.test('remove', async t => {
  const isbn = 1123456789;
  
  // add book, extract its ID from db result
  let { lastID } = await add(isbn, 'a new book', 'myself, me');
  let res = await remove(lastID);

  t.equal(res.lastID, lastID, 'should remove book of ID specified');

  t.end();
});

t.test('checkout', async t => {
  const bookID = 2;
  const userID = 4;
  const res = await checkOut(bookID, userID);
  // truth check for modified table

  let book = await get(bookID);
  t.equal(book.user_id, userID, 'should check out book to specified user');

  // TODO move to subtest - reliant on previous state
  const returned = await giveBack(bookID);
  book = await get(bookID);
  t.similar(book.user_id, null, 'should clear out user when book returned');

  t.end();
});
