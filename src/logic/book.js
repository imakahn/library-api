const BORROW_LIMIT = 3;
const BORROW_PERIOD = 14; // days

/**
 * Return true if book is overdue
 *
 * @param {*} book
 * @returns bool
 */
export function isOverdue(book) {
  return book.date_out
    ? (Date.now() - new Date(book.date_out)) / 86400000 > BORROW_PERIOD
    : false;
}

/**
 * Return true if any book is overdue
 *
 * @param {*} books
 * @returns bool
 */
export function hasOverdue(books) {
  const res = books.filter(book => isOverdue(book));

  return res.length > 0;
}

/**
 * Determines if a user can check out a given ISBN.
 * Returns object with success or failure, plus list of reasons for failure.
 *
 * Rules: has < BORROW_LIMIT checked out, none overdue, book available
 *
 * @param {*} booksISBN
 * @param {*} booksBorrowed
 * @returns { result, reason }
 */
export function canCheckout(booksISBN, booksBorrowed) {
  // TODO support checkout by title
  let result = true;
  const reason = [];

  // if no unreserved books remain 
  if( !booksISBN.filter((book) => book.date_out == null).length ) {
    result = false;
    reason.push('book unavailable')
  }

  if( booksBorrowed.length >= BORROW_LIMIT ) {
    result = false;
    reason.push(`${booksBorrowed.length} books already checked out`);
  }

  if( hasOverdue(booksBorrowed) ) {
    result = false;
    reason.push('books overdue'); // TODO refactor to return list of overdue
  }

  return { result, reason };
}
