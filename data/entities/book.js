import { open } from '../db.js';

const BOOK_TABLE = 'book';

// QUERY

async function add(book) {
  // TODO validate schema
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
export async function getAll(filters) {
  const cols = 'isbn, title, author, date_out, user_id';
  // TODO ^ replace with model
  const db = await open();

  const sql = `SELECT ${cols} from ${BOOK_TABLE}`;
  const res = await db.all(sql);

  console.log(res);

  return res;

  // filters supported: overdue, uid, isbn
  // just call logic.isOverdue
  // no. it's a filter done by sql. there is a cross here 
  // while I can use .each to run the logic, to make it a 
  // quick sql filter would just need centralized config
}

// TODO - checkout vs get? both retrieve, mixing paradigms of traditional crud vs interface
// signal that this should be broken up

// isbn would have been mapped to id earlier
async function checkOut(id) {

}

async function giveBack(id) {

}

// MODEL?
