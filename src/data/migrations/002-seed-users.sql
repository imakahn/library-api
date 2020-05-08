--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

INSERT INTO users (id, name, librarian) VALUES (1, 'Brooks Hatlen', 1);
INSERT INTO users (id, name) VALUES (2, 'Andy Dufresne');
INSERT INTO users (id, name) VALUES (3, 'Tommy Williams');
INSERT INTO users (id, name) VALUES (4, 'Ellis Redding');

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

DROP users;
