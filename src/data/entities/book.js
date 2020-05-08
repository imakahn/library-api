import assert from 'assert';
import { open } from '../db.js';

const BOOK_TABLE = 'books';
const BORROW_PERIOD = 14; // TODO duplicate config w/logic layer; centralize

// TODO interface varying - should this take a 'book'? could drop all assertions
export async function add(isbn, title, author) {
  assert(Number.isInteger(isbn) && isbn.toString().length === 10, 'isbn must be 10-digit integer');
  assert(title.length > 1); // placeholder
  assert(author.length > 1);

  const db = await open();

  const sql = `INSERT INTO ${BOOK_TABLE} (isbn, title, author) VALUES (?, ?, ?)`;
  // according to docs, this is a wrapper around `sqlite3#Statement` so == prepared statement
  const res = await db.run(sql, isbn, title, author);

  // example res: { stmt: Statement { stmt: undefined }, lastID: 6, changes: 1 }
  return res;
}

export async function remove(id) {
  assert(Number.isInteger(id), 'must provide valid id (integer)');

  const db = await open();
  const sql = `DELETE FROM ${BOOK_TABLE} WHERE id = ?`;

  const res = await db.run(sql, id);
  return res;
}

export async function getAll(filters = {}) {
  const cols = 'id, isbn, title, author, date_out, user_id';
  // TODO ^ replace with model - and filter by all!
  const db = await open();
  const prepared = {};

  let sql = `SELECT ${cols} from ${BOOK_TABLE}`;

  // TODO as soon as this goes over 3, make dynamic function
  if ( filters.user_id ) {
    sql += `${Object.keys(prepared).length ? ' AND' : ' WHERE'} user_id = @user_id`
    prepared['@user_id'] = filters.user_id;
  }
  if ( filters.overdue ) {
    sql += `${Object.keys(prepared).length ? ' AND' : ' WHERE'} date_out < date('now', '-${BORROW_PERIOD} day')`
  }
  if ( filters.isbn ) {
    sql += `${Object.keys(prepared).length ? ' AND' : ' WHERE'} isbn = @isbn`
    prepared['@isbn'] = filters.isbn;
  }

  const stmt = await db.prepare(sql);
  const res = await stmt.all(prepared);

  // todo return result + schema
  return res;
}

export async function get(bookID) {
  const cols = 'id, isbn, title, author, date_out, user_id';
  const db = await open();

  const res = await db.get(`SELECT ${cols} FROM ${BOOK_TABLE} WHERE id = ?`, bookID);
  return res;
}

// isbn would have been mapped to id earlier
export async function checkOut(bookID, userID) {
  const db = await open();

  // TODO although the logic layer already guards this transaction, DB should have redundant checks
  const sql = `UPDATE ${BOOK_TABLE} SET date_out = date(), user_id = ? WHERE id = ?`

  const res = db.run(sql, userID, bookID);
  return res;
}

// mind, 'return' is a reserved word..
export async function giveBack(bookID) {
  const db = await open();

  const sql = `UPDATE ${BOOK_TABLE} SET date_out = null, user_id = null WHERE id = ?`;

  const res = db.run(sql, bookID);
  return res;
}

export async function giveBackAll(userID) {
  const db = await open();

  const sql = `UPDATE ${BOOK_TABLE} SET date_out = null, user_id = null WHERE user_id = ?`;

  const res = db.run(sql, userID);
  return res;
}

// MODEL?
