const BORROW_LIMIT = 3;
const BORROW_PERIOD = 14; // days

/**
 *
 *
 * @param {*} book
 * @returns
 */
function isOverdue(book) {
  return (Date.now() - book.dateOut) > BORROW_PERIOD;

}

/**
 *
 *
 * @param {*} books
 * @returns
 */
function hasOverdue(books) {
  const res = books.filter(book => isOverdue(book));

  return res > 0;
}

/**
 *
 * rules: has < 3 checked out, none overdue, book available
 *
 * @param {*} isbn
 * @param {*} uid
 */
function canCheckout(userBooks, title) { // title? bookCollection? titleList?
  // TODO schema validation -- add to notes. plus caching -- assign uuid/track ID
  // or assertions ^
  result = true;
  reason = [];

  if(!books.length) {
    result = false;
    reason.push('book unavailable')
  }

  if( userBooks.length > BORROW_LIMIT ) {
    result = false;
    reason.push('borrow limit exceeded');
  }

  if( hasOverdue(userBooks) ) {
    result = false;
    reason.push('books overdue');
  }

  return { result, reason };
}

// run queries:
  // all checked out books for user
  // all books of that isbn

// do logic
  // is count > config count
  // is time > config days
  // if book is available

// these logic functions could be called by the db, or the router
// router could also call something else that handles the calls to logic

// isAvailable
// userIsOverdue
// checkoutCount
