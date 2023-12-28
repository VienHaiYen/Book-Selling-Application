SELECT *
FROM authors
JOIN book_author ON authors.id = book_author.author_id
WHERE book_author.book_id = $1
