SELECT books.*
FROM books
JOIN book_author ON books.id = book_author.book_id
WHERE book_author.author_id = $1
