--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

INSERT INTO books (isbn, title, author, date_out, user_id)
VALUES
  (
    0896214400,
    'Rita Hayworth and Shawshank Redemption',
    'King, Stephen',
    '2020-02-20',
    2
  );

INSERT INTO books (isbn, title, author)
VALUES
  (
    1101974494,
    'The Andromeda Strain',
    'Crichton, Michael'
  );

INSERT INTO books (isbn, title, author, date_out, user_id)
VALUES
  (
    1599866749,
    'A Study in Scarlet',
    'Doyle, Sir Arthur Conan',
    '2020-05-03',
    2
  );

INSERT INTO books (isbn, title, author, date_out, user_id)
VALUES
  (
    1599866749,
    'A Study in Scarlet',
    'Doyle, Sir Arthur Conan',
    '2020-04-15',
    3
  );

INSERT INTO books (isbn, title, author)
VALUES
  (
    0451163966,
    'One Flew Over the Cuckoo''s Nest',
    'Kesey, Ken'
  );

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

DROP books;
