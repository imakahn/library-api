import { open } from '../db.js';

const BOOK_TABLE = 'books';
const BORROW_PERIOD = 14; // TODO duplicate config w/logic layer; centralize

// QUERY

async function add(isbn, title, author) {
  const db = await open();

  const sql = `INSERT INTO ${BOOK_TABLE} (isbn, title, author), VALUES (?, ?, ?)`;
  const res = await db.run(sql, book.isbn, book.title, book.author);

  // handle error/rethrow - return true/false

  // what is res? may want to return something else
  return res;
}

function remove(id) {

}

// TODO this belongs elsewhere - is plural
export async function getAll(filters = {}) {
  const cols = 'isbn, title, author, date_out, user_id';
  // TODO ^ replace with model
  const db = await open();
  const prepared = {};

  let sql = `SELECT ${cols} from ${BOOK_TABLE}`;

  // TODO as soon as this goes over 3, make dyanmic function
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

  return res;
}

// TODO - checkout vs get? both retrieve, mixing paradigms of traditional crud vs interface
// signal that this should be broken up

// isbn would have been mapped to id earlier
async function checkOut(id) {

}

async function giveBack(id) {

}

// MODEL?
