--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS books (
  id        INTEGER PRIMARY KEY,
  title     TEXT    NOT NULL,
  author    TEXT    NOT NULL,
  isbn      TEXT    NOT NULL,
  date_out  TEXT, 
  user_id   INTEGER,
  CONSTRAINT fk_user_id 
    FOREIGN KEY (user_id) 
    REFERENCES user(id)
    ON UPDATE CASCADE
);

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

DROP TABLE IF EXISTS books;
