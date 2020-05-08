Library API

Your task is to build a simple API to manage a library's book inventory. There are two main components of this API: management endpoints (to be used by the Librarians) and user facing endpoints for end-user actions.

Books are referenced by their ISBN. The library can have more than 1 copy of any given book (multiple copies of the same ISBN).

API Endpoints to be built:

Librarian Endpoints:
* An endpoint to add a book (by ISBN) to the library.
* An endpoint to remove a book (by its internal Id) from the library
* An endpoint that generates a list of all overdue books.

User Endpoints:
* An endpoint to check out a book (assume a 2 week checkout period from time of call). A User can check out any book except when:
- They currently have 3 checked out books.
- They are overdue on returning any book.
* An endpoint to return a checked out book.
* An endpoint that returns all currently checked out books for that user.

For the purposes of this exercise, we can assume there is a Librarian user (userId 1) and three regular users (userids, 2, 3, 4). You can hardcode this table. Also, no need to worry about authentication, etc.


- role of librarian or NULL - or, just a column for marking 'librarian' true

- endpoints interact with book and user models

- a book does not know when it is overdue; it only stores the ID of the user that checked it out, and when it was checked out
- can have multiple copies - keep count/list

- queries:
  - find all by userid
  - (count) those results - wrapper function (note the inefficiency in data but the simplicity)

/book
PUT (return ID)
GET ?overdue=true ?uid=
/book/id
DELETE
GET
PATCH (return)


/librarian/

yeah, management endpoints. gah

what if, it were just the book, but certain actions only worked behind a management endpoint? boom

/librarian/book

/book

could just do the above as books too. essentially the  same thing

unless if

/librarian PUT GET ETC.. but then the .. the resource doesn't add up
/librarian/book would make more sense. because if we have to manage librarians at some point, we'd be stuck with no namespacing

use the route to determine what operations are available. that is all

the openapi is the api as described, but the logic can be simpler

/librarian/book
PUT (return id)
GET (all overdue)
/librarian/book/id
DELETE

/book
PATCH checked_out=true
PATCH checked_out=true

/book/checkout



// books can have duplicate rows - e.g. add the same one multiple times, and check them out
book is checked out by isbn
returned by id - user received entire object






internal api (using books) vs external one (using this stuff) - it's just http
the model will just be users and books

internal one would simply use patch to update things - the client is returned a book object, and can patch it as checked out or not
// but then that is putting burden on the client to understand the model. if we separate that out..

/user/book.checkout ?isbn=
/user/book.return ?all=true ?id=

the client isn't manipulating a resource in this case- not directly. it is unaware of its structure

using dot structure to exemplify this is basically rpc

- explain TODO usage in my IDE
