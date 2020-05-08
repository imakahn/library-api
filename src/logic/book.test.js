import t from 'tap';
import moment from 'moment';
import { canCheckout, hasOverdue, isOverdue } from './book.js';

const book = {
  isbn: 1101974494,
  title: 'The Andromeda Strain',
  author: 'Crichton, Michael',
  date_out: null,
  user_id: null
};
const datePastDue = moment().subtract(15, 'days').format('YYYY-MM-DD');
const bookOverdue = { ...book, date_out: datePastDue };

t.test('isOverdue', t => {
  t.true(isOverdue(bookOverdue), 'should return true when book is overdue');
  t.false(isOverdue(book), 'should return false when book is not overdue');

  t.end();
});

t.test('hasOverdue', t => {
  t.true(hasOverdue([book, bookOverdue]), 'should return true if any book is overdue');
  t.false(hasOverdue([book]), 'should return false if no book is overdue');
  
  t.end();
});

t.test('canCheckout', t => {
  let res = canCheckout([book], []);
  t.same(res, { result: true, reason: [] }, 'should allow checkout when all conditions pass');

  res = canCheckout([book], [book, book, book]);
  t.true(!res.result && res.reason.length > 0, 'should not allow checkout when too many books borrowed');
  
  res = canCheckout([book], [book, bookOverdue]);
  t.true(!res.result && res.reason.length > 0, 'should not allow checkout when a borrowed book is overdue');

  res = canCheckout([bookOverdue], [book]);
  t.true(!res.result && res.reason.length > 0, 'should not allow checkout when book unavailable');

  res = canCheckout([bookOverdue], [book, book, book]);
  t.true(!res.result && res.reason.length > 1, 'should not allow checkout when multiple conditions fail');

  t.end();
});
