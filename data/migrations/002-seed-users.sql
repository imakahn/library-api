--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

INSERT INTO users (id, name, librarian) VALUES (1, 'Brooks Hatlen', 1);
INSERT INTO users (name) VALUES ('Andy Dufresne');
INSERT INTO users (name) VALUES ('Tommy Williams');
INSERT INTO users (name) VALUES ('Ellis Redding');

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

DROP users;
